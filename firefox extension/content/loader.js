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

Application.console.log('vkpatch loader.js executed');


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
  
	var channel = ioService.newChannel(aURL, 'utf-8', null);
	
	var input = channel.asyncOpen(callback, context);
};

/*
 * Имя переменной, которая устанавливается на странице как флаг выполнения скрипта
 * для предотвращения многократной инъекции
 */
var uniq = 'script'+Math.random();

// инъекция скрипта
function inject(data) 
{
	/*
	* Конвертируем
	*/
	var utf8Converter = Components.classes["@mozilla.org/intl/utf8converterservice;1"].
		getService(Components.interfaces.nsIUTF8ConverterService);
	data = utf8Converter.convertURISpecToUTF8(data, "UTF-8");
	
	var script = top.window.content.document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = data;
	
	top.window.content.document.getElementsByTagName('head')[0].appendChild(script);
};
					
function readComplete(data) 
{
	/*
	 * Скрипт прочитан в память, теперь можем подождать окно
	 */
	window.addEventListener(
		'load',
		function() 	
		{
	  		// TODO: вешать событие на DOMContentLoaded и читать файл через getContents одновременно
			
			gBrowser.addEventListener(
				'DOMContentLoaded',
				function (){
					var url = window.content.location.href;
					var matched = false;
					// сравниваем url с шаблонами
					for (var i = 0; i < urlPatterns.length; i++) 
					{
						if (urlPatterns[i].test(url))
						{
							matched = true;
							break;
						}
					};
					// ни один из шаблонов url не подошёл
					if (!matched) return;
					// если скрипт этот код уже выполнялся - то выходим
					if (window.content[uniq]) return;
					window.content[uniq] = true;
					
					
					inject(data);
		
				},
				false
			);
		},
		false
	);
};

// читаем из файла
var listener = new StreamListener(readComplete);
getContents(scriptPath, listener, null);	