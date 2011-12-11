/**
 * Выполняет инъекцию скрипа на сайт
 */
// путь к скрипту
var scriptPath = "chrome://vkpatch/content/";

// шаблоны страниц, на которых выполняется инъекция
var urlPatterns = [new RegExp(  '^http://vkontakte\\.ru'  ,'i'),
						 new RegExp(  '^http://[^#?]*\\.vkontakte\\.ru'  ,'i'),
						 new RegExp(  '^http://vk\\.com'  ,'i'),
						 new RegExp(  '^http://[^#?]*\\.vk\\.com'  ,'i')];

var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.vkpatch.");
var debugMode = pref.getBoolPref("DebugMode");
var log = debugMode ? debug : function(){};
log('loader.js executed');

/*
 * JSDeferred 0.4.0
 * http://github.com/cho45/jsdeferred
 */
function Deferred(){return(this instanceof Deferred)?this.init():new Deferred()}Deferred.ok=function(x){return x};Deferred.ng=function(x){throw x};Deferred.prototype={_id:0xe38286e381ae,init:function(){this._next=null;this.callback={ok:Deferred.ok,ng:Deferred.ng};return this},next:function(fun){return this._post("ok",fun)},error:function(fun){return this._post("ng",fun)},call:function(val){return this._fire("ok",val)},fail:function(err){return this._fire("ng",err)},cancel:function(){(this.canceller||function(){})();return this.init()},_post:function(okng,fun){this._next=new Deferred();this._next.callback[okng]=fun;return this._next},_fire:function(okng,value){var next="ok";try{value=this.callback[okng].call(this,value)}catch(e){next="ng";value=e;if(Deferred.onerror)Deferred.onerror(e)}if(Deferred.isDeferred(value)){value._next=this._next}else{if(this._next)this._next._fire(next,value)}return this}};Deferred.isDeferred=function(obj){return!!(obj&&obj._id==Deferred.prototype._id)};Deferred.next_default=function(fun){var d=new Deferred();var id=setTimeout(function(){d.call()},0);d.canceller=function(){clearTimeout(id)};if(fun)d.callback.ok=fun;return d};Deferred.next_faster_way_readystatechange=((typeof window==='object')&&(location.protocol=="http:")&&!window.opera&&/\bMSIE\b/.test(navigator.userAgent))&&function(fun){var d=new Deferred();var t=new Date().getTime();if(t-arguments.callee._prev_timeout_called<150){var cancel=false;var script=document.createElement("script");script.type="text/javascript";script.src="data:text/javascript,";script.onreadystatechange=function(){if(!cancel){d.canceller();d.call()}};d.canceller=function(){if(!cancel){cancel=true;script.onreadystatechange=null;document.body.removeChild(script)}};document.body.appendChild(script)}else{arguments.callee._prev_timeout_called=t;var id=setTimeout(function(){d.call()},0);d.canceller=function(){clearTimeout(id)}}if(fun)d.callback.ok=fun;return d};Deferred.next_faster_way_Image=((typeof window==='object')&&(typeof(Image)!="undefined")&&!window.opera&&document.addEventListener)&&function(fun){var d=new Deferred();var img=new Image();var handler=function(){d.canceller();d.call()};img.addEventListener("load",handler,false);img.addEventListener("error",handler,false);d.canceller=function(){img.removeEventListener("load",handler,false);img.removeEventListener("error",handler,false)};img.src="data:image/png,"+Math.random();if(fun)d.callback.ok=fun;return d};Deferred.next_tick=(typeof process==='object'&&typeof process.nextTick==='function')&&function(fun){var d=new Deferred();process.nextTick(function(){d.call()});if(fun)d.callback.ok=fun;return d};Deferred.next=Deferred.next_faster_way_readystatechange||Deferred.next_faster_way_Image||Deferred.next_tick||Deferred.next_default;Deferred.chain=function(){var chain=Deferred.next();for(var i=0,len=arguments.length;i<len;i++)(function(obj){switch(typeof obj){case"function":var name=null;try{name=obj.toString().match(/^\s*function\s+([^\s()]+)/)[1]}catch(e){}if(name!="error"){chain=chain.next(obj)}else{chain=chain.error(obj)}break;case"object":chain=chain.next(function(){return Deferred.parallel(obj)});break;default:throw"unknown type in process chains"}})(arguments[i]);return chain};Deferred.wait=function(n){var d=new Deferred(),t=new Date();var id=setTimeout(function(){d.call((new Date).getTime()-t.getTime())},n*1000);d.canceller=function(){clearTimeout(id)};return d};Deferred.call=function(fun){var args=Array.prototype.slice.call(arguments,1);return Deferred.next(function(){return fun.apply(this,args)})};Deferred.parallel=function(dl){if(arguments.length>1)dl=Array.prototype.slice.call(arguments);var ret=new Deferred(),values={},num=0;for(var i in dl)if(dl.hasOwnProperty(i))(function(d,i){if(typeof d=="function")d=Deferred.next(d);d.next(function(v){values[i]=v;if(--num<=0){if(dl instanceof Array){values.length=dl.length;values=Array.prototype.slice.call(values,0)}ret.call(values)}}).error(function(e){ret.fail(e)});num++})(dl[i],i);if(!num)Deferred.next(function(){ret.call()});ret.canceller=function(){for(var i in dl)if(dl.hasOwnProperty(i)){dl[i].cancel()}};return ret};Deferred.earlier=function(dl){if(arguments.length>1)dl=Array.prototype.slice.call(arguments);var ret=new Deferred(),values={},num=0;for(var i in dl)if(dl.hasOwnProperty(i))(function(d,i){d.next(function(v){values[i]=v;if(dl instanceof Array){values.length=dl.length;values=Array.prototype.slice.call(values,0)}ret.canceller();ret.call(values)}).error(function(e){ret.fail(e)});num++})(dl[i],i);if(!num)Deferred.next(function(){ret.call()});ret.canceller=function(){for(var i in dl)if(dl.hasOwnProperty(i)){dl[i].cancel()}};return ret};Deferred.loop=function(n,fun){var o={begin:n.begin||0,end:(typeof n.end=="number")?n.end:n-1,step:n.step||1,last:false,prev:null};var ret,step=o.step;return Deferred.next(function(){function _loop(i){if(i<=o.end){if((i+step)>o.end){o.last=true;o.step=o.end-i+1}o.prev=ret;ret=fun.call(this,i,o);if(Deferred.isDeferred(ret)){return ret.next(function(r){ret=r;return Deferred.call(_loop,i+step)})}else{return Deferred.call(_loop,i+step)}}else{return ret}}return(o.begin<=o.end)?Deferred.call(_loop,o.begin):null})};Deferred.repeat=function(n,fun){var i=0,end={},ret=null;return Deferred.next(function(){var t=(new Date()).getTime();do{if(i>=n)return null;ret=fun(i++)}while((new Date()).getTime()-t<20);return Deferred.call(arguments.callee)})};Deferred.register=function(name,fun){this.prototype[name]=function(){var a=arguments;return this.next(function(){return fun.apply(this,a)})}};Deferred.register("loop",Deferred.loop);Deferred.register("wait",Deferred.wait);Deferred.connect=function(funo,options){var target,func,obj;if(typeof arguments[1]=="string"){target=arguments[0];func=target[arguments[1]];obj=arguments[2]||{}}else{func=arguments[0];obj=arguments[1]||{};target=obj.target}var partialArgs=obj.args?Array.prototype.slice.call(obj.args,0):[];var callbackArgIndex=isFinite(obj.ok)?obj.ok:obj.args?obj.args.length:undefined;var errorbackArgIndex=obj.ng;return function(){var d=new Deferred().next(function(args){var next=this._next.callback.ok;this._next.callback.ok=function(){return next.apply(this,args.args)}});var args=partialArgs.concat(Array.prototype.slice.call(arguments,0));if(!(isFinite(callbackArgIndex)&&callbackArgIndex!==null)){callbackArgIndex=args.length}var callback=function(){d.call(new Deferred.Arguments(arguments))};args.splice(callbackArgIndex,0,callback);if(isFinite(errorbackArgIndex)&&errorbackArgIndex!==null){var errorback=function(){d.fail(arguments)};args.splice(errorbackArgIndex,0,errorback)}Deferred.next(function(){func.apply(target,args)});return d}};Deferred.Arguments=function(args){this.args=Array.prototype.slice.call(args,0)};Deferred.retry=function(retryCount,funcDeferred,options){if(!options)options={};var wait=options.wait||0;var d=new Deferred();var retry=function(){var m=funcDeferred(retryCount);m.next(function(mes){d.call(mes)}).error(function(e){if(--retryCount<=0){d.fail(['retry failed',e])}else{setTimeout(retry,wait*1000)}})};setTimeout(retry,0);return d};Deferred.methods=["parallel","wait","next","call","loop","repeat","chain"];Deferred.define=function(obj,list){if(!list)list=Deferred.methods;if(!obj)obj=(function getGlobal(){return this})();for(var i=0;i<list.length;i++){var n=list[i];obj[n]=Deferred[n]}return Deferred};this.Deferred=Deferred;

with (Deferred) 
{
	parallel([
		waitPage,
		read.bind(null, "vkpatch.user.js")
	])
	.next(inject);
}

function inject(values) 
{
	var pageInfo = values[0];
	var scriptsData = values.slice(1);
	for (var i=0; i<scriptsData.length; i++) 
	{
		var scriptData = scriptsData[i];
		createScript(scriptData.content, scriptData.url, pageInfo.document, pageInfo.url);
	}
}

function createScript(scriptContent, scriptUrl, pageDocument, pageUrl)
{
	
	var script = pageDocument.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = scriptContent;
	
	pageDocument.getElementsByTagName('head')[0].appendChild(script);
	log('injection ' + pageUrl + ' // ' + scriptUrl);
};

/**
 * Асинхронное чтение файла
 * @param {Object} url
 * @return Deferred
 */
function read(url) 
{
	var deferred = new Deferred();
	url = scriptPath + url;
	log('reading ' + url + '...');
	var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].getService(Components.interfaces.nsIScriptableInputStream);
	var listener = new StreamListener(function(data) 
	{
		log('reading ' + url + ' done');
		deferred.call({
			content: toUTF8(data),
			url: url
		});
	});
	var channel = ioService.newChannel(url, 'UTF-8', null);
	
	var input = channel.asyncOpen(listener, this);
	return deferred;
};

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
	
	if (aMessage === null) aMessage = 'null';
	consoleService.logStringMessage("vkpatch :: " + aMessage.toString());
};


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

function waitPage()
{
	var deferred = new Deferred();
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
						
						var matched = false;
						var matchedPattern = null;
						// сравниваем url с шаблонами
						for (var i = 0; i < urlPatterns.length; i++) 
						{
							if (urlPatterns[i].test(url))
							{
								matched = true;
								matchedPattern = urlPatterns[i].toString();
								break;
							}
						};
						
						// подошёл шаблон. Проверка на наличия тела страницы page_body, для исключения иньекции
						// в странички, получаемые в iframe
						var hasBody = !!content.document.getElementById('page_body');
						log('DOMContentLoaded raised : ' + url 
							+ (matched ? ' matched with ' + matchedPattern : ' not matched')
							+ (hasBody ? '' : ' / iframe'));
						if (matched && hasBody)
						{
							deferred.call({document: content.document, url: url});
						};
			
						
					},
					true
				);
				
			
		},
		false
	);
	return deferred;
}

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
