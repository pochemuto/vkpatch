/**
 * Выполняет инъекцию скрипа на сайт
 */
// путь к скрипту
var scriptPath = "chrome://vkpatch/content/vkpatch.user.js";
// шаблоны страниц, на которых выполняется инъекция
var urlPatterns = [new RegExp(  '^http://vkontakte\\.ru'  ,'i'),
						 new RegExp(  '^http://.*\\.vkontakte\\.ru'  ,'i'),
						 new RegExp(  '^http://vk\\.com'  ,'i'),
						 new RegExp(  '^http://.*\\.vk\\.com'  ,'i')];

/*
 * Логирование в firebug
 * http://thefallenapples.blogspot.com/2009/10/debugging-firefox-extensions-consolelog.html
 */
function debug(aMessage) {
	try {
		    var objects = [];
		    objects.push.apply(objects, arguments);
		    Firebug.Console.logFormatted(objects,
				TabWatcher.getContextByWindow
					(content.document.defaultView.wrappedJSObject)
			);
	}
	catch (e) {
	}

	var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService
										(Components.interfaces.nsIConsoleService);
	if (aMessage === "") consoleService.logStringMessage("(empty string)");
	else if (aMessage != null) consoleService.logStringMessage(aMessage.toString());
	else consoleService.logStringMessage("null");
};

var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.vkpatch.");
var debugMode = pref.getBoolPref("DebugMode");
var log = debugMode ? debug : function(){};
log('vkpatch :: loader.js executed');


/*********
 * Колбек асинхронного чтения
 * @param {function} callback
 */
function StreamListener(callback) {
  this.mCallbackFunc = callback;
}

/*
 * https://developer.mozilla.org/en/Creating_Sandboxed_HTTP_Connections
 */

StreamListener.prototype = {
  mData: "",
 
  // nsIStreamListener
  onStartRequest: function (aRequest, aContext) {
    this.mData = "";
  },
 
  onDataAvailable: function (aRequest, aContext, aStream, aSourceOffset, aLength) {
    var scriptableInputStream =
      Components.classes["@mozilla.org/scriptableinputstream;1"]
        .createInstance(Components.interfaces.nsIScriptableInputStream);
    scriptableInputStream.init(aStream);
 
    this.mData += scriptableInputStream.read(aLength);
  },
 
  onStopRequest: function (aRequest, aContext, aStatus) {
    if (Components.isSuccessCode(aStatus)) {
      // request was successfull
      this.mCallbackFunc(this.mData);
    } else {
      // request failed
      this.mCallbackFunc(null);
    }
 
    gChannel = null;
  },
 
  // nsIChannelEventSink
  onChannelRedirect: function (aOldChannel, aNewChannel, aFlags) {
    // if redirecting, store the new channel
    gChannel = aNewChannel;
  },
 
  // nsIInterfaceRequestor
  getInterface: function (aIID) {
    try {
      return this.QueryInterface(aIID);
    } catch (e) {
      throw Components.results.NS_NOINTERFACE;
    }
  },
 
  // nsIProgressEventSink (not implementing will cause annoying exceptions)
  onProgress : function (aRequest, aContext, aProgress, aProgressMax) { },
  onStatus : function (aRequest, aContext, aStatus, aStatusArg) { },
 
  // nsIHttpEventSink (not implementing will cause annoying exceptions)
  onRedirect : function (aOldChannel, aNewChannel) { },
 
  // we are faking an XPCOM interface, so we need to implement QI
  QueryInterface : function(aIID) {
    if (aIID.equals(Components.interfaces.nsISupports) ||
        aIID.equals(Components.interfaces.nsIInterfaceRequestor) ||
        aIID.equals(Components.interfaces.nsIChannelEventSink) ||
        aIID.equals(Components.interfaces.nsIProgressEventSink) ||
        aIID.equals(Components.interfaces.nsIHttpEventSink) ||
        aIID.equals(Components.interfaces.nsIStreamListener))
      return this;
 
    throw Components.results.NS_NOINTERFACE;
  }
};

/*
 * http://forums.mozillazine.org/viewtopic.php?p=921150#921150
 * модифицирован для asyncOpen
 */
function getContents(aURL, callback, context)
{
	var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].getService(Components.interfaces.nsIScriptableInputStream);
	var listener = new StreamListener(callback);
	var channel = ioService.newChannel(aURL, 'utf-8', null);
	
	var input = channel.asyncOpen(listener, context);

};

/*
 * Имя переменной, которая устанавливается на странице как флаг выполнения скрипта
 * для предотвращения многократной инъекции
 */
var uniq = 'script'+ Math.floor(Math.random()*1000000);
log(uniq);
var stack = [];
var readed = false;
var scriptContent = null;


/**
 * Конвертировать строку в utf8
 * @param {string} string - строка
 */
function toUTF8(string) 
{
	var utf8Converter = Components.classes["@mozilla.org/intl/utf8converterservice;1"].
	    getService(Components.interfaces.nsIUTF8ConverterService);
	return utf8Converter.convertURISpecToUTF8(string, "UTF-8");
};

// инъекция скрипта
function inject(document, url) 
{
	
	log('vkpatch :: injection');
	if (readed)
	{
		createScript(document, url);
	}
	else
	{
		stack.push({
			document: document,
			url: url
		});
	};
};

function createScript(document, url)
{
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = scriptContent;
	script.id = 'vkpatch';
	
	document.getElementsByTagName('head')[0].appendChild(script);
	log('vkpatch :: injection done : ' + url);
};

window.addEventListener(
	'load',
	function() 	
	{
  		var currentWindow = window;
		gBrowser.addEventListener(
				'DOMContentLoaded',
				
				function (aEvent){
					var content = aEvent.originalTarget.defaultView;
					//var content = currentWindow.content;
					
					var url = content.location.href;
					
					log('vkpatch :: DOMContentLoaded raised : ' + url);
					
					var matched = false;
					// сравниваем url с шаблонами
					for (var i = 0; i < urlPatterns.length; i++) 
					{
						if (urlPatterns[i].test(url))
						{
							matched = true;
							log('vkpatch :: matched with ' + urlPatterns[i].toString());
							break;
						}
					};
					
					// подошёл шаблон и не было инъекции
					if (matched && !content[uniq])
					{
						content[uniq] = true; 
						inject(content.document, url);
					};
		
				},
				true
			);
			
		
	},
	false
);

					
function readComplete(data) 
{
	scriptContent = toUTF8(data);
	readed = true;
	log('vkpatch :: readed');
	
	for (var i=0; i<stack.length; i++)
	{
		var s = stack[i];
		createScript(s.document, s.url);
	};
};

// читаем из файла
getContents(scriptPath, readComplete);	