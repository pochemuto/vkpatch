/*
 * JSDeferred 0.4.0
 * http://github.com/cho45/jsdeferred
 */
function Deferred(){return(this instanceof Deferred)?this.init():new Deferred()}Deferred.ok=function(x){return x};Deferred.ng=function(x){throw x};Deferred.prototype={_id:0xe38286e381ae,init:function(){this._next=null;this.callback={ok:Deferred.ok,ng:Deferred.ng};return this},next:function(fun){return this._post("ok",fun)},error:function(fun){return this._post("ng",fun)},call:function(val){return this._fire("ok",val)},fail:function(err){return this._fire("ng",err)},cancel:function(){(this.canceller||function(){})();return this.init()},_post:function(okng,fun){this._next=new Deferred();this._next.callback[okng]=fun;return this._next},_fire:function(okng,value){var next="ok";try{value=this.callback[okng].call(this,value)}catch(e){next="ng";value=e;if(Deferred.onerror)Deferred.onerror(e)}if(Deferred.isDeferred(value)){value._next=this._next}else{if(this._next)this._next._fire(next,value)}return this}};Deferred.isDeferred=function(obj){return!!(obj&&obj._id==Deferred.prototype._id)};Deferred.next_default=function(fun){var d=new Deferred();var id=setTimeout(function(){d.call()},0);d.canceller=function(){clearTimeout(id)};if(fun)d.callback.ok=fun;return d};Deferred.next_faster_way_readystatechange=((typeof window==='object')&&(location.protocol=="http:")&&!window.opera&&/\bMSIE\b/.test(navigator.userAgent))&&function(fun){var d=new Deferred();var t=new Date().getTime();if(t-arguments.callee._prev_timeout_called<150){var cancel=false;var script=document.createElement("script");script.type="text/javascript";script.src="data:text/javascript,";script.onreadystatechange=function(){if(!cancel){d.canceller();d.call()}};d.canceller=function(){if(!cancel){cancel=true;script.onreadystatechange=null;document.body.removeChild(script)}};document.body.appendChild(script)}else{arguments.callee._prev_timeout_called=t;var id=setTimeout(function(){d.call()},0);d.canceller=function(){clearTimeout(id)}}if(fun)d.callback.ok=fun;return d};Deferred.next_faster_way_Image=((typeof window==='object')&&(typeof(Image)!="undefined")&&!window.opera&&document.addEventListener)&&function(fun){var d=new Deferred();var img=new Image();var handler=function(){d.canceller();d.call()};img.addEventListener("load",handler,false);img.addEventListener("error",handler,false);d.canceller=function(){img.removeEventListener("load",handler,false);img.removeEventListener("error",handler,false)};img.src="data:image/png,"+Math.random();if(fun)d.callback.ok=fun;return d};Deferred.next_tick=(typeof process==='object'&&typeof process.nextTick==='function')&&function(fun){var d=new Deferred();process.nextTick(function(){d.call()});if(fun)d.callback.ok=fun;return d};Deferred.next=Deferred.next_faster_way_readystatechange||Deferred.next_faster_way_Image||Deferred.next_tick||Deferred.next_default;Deferred.chain=function(){var chain=Deferred.next();for(var i=0,len=arguments.length;i<len;i++)(function(obj){switch(typeof obj){case"function":var name=null;try{name=obj.toString().match(/^\s*function\s+([^\s()]+)/)[1]}catch(e){}if(name!="error"){chain=chain.next(obj)}else{chain=chain.error(obj)}break;case"object":chain=chain.next(function(){return Deferred.parallel(obj)});break;default:throw"unknown type in process chains"}})(arguments[i]);return chain};Deferred.wait=function(n){var d=new Deferred(),t=new Date();var id=setTimeout(function(){d.call((new Date).getTime()-t.getTime())},n*1000);d.canceller=function(){clearTimeout(id)};return d};Deferred.call=function(fun){var args=Array.prototype.slice.call(arguments,1);return Deferred.next(function(){return fun.apply(this,args)})};Deferred.parallel=function(dl){if(arguments.length>1)dl=Array.prototype.slice.call(arguments);var ret=new Deferred(),values={},num=0;for(var i in dl)if(dl.hasOwnProperty(i))(function(d,i){if(typeof d=="function")d=Deferred.next(d);d.next(function(v){values[i]=v;if(--num<=0){if(dl instanceof Array){values.length=dl.length;values=Array.prototype.slice.call(values,0)}ret.call(values)}}).error(function(e){ret.fail(e)});num++})(dl[i],i);if(!num)Deferred.next(function(){ret.call()});ret.canceller=function(){for(var i in dl)if(dl.hasOwnProperty(i)){dl[i].cancel()}};return ret};Deferred.earlier=function(dl){if(arguments.length>1)dl=Array.prototype.slice.call(arguments);var ret=new Deferred(),values={},num=0;for(var i in dl)if(dl.hasOwnProperty(i))(function(d,i){d.next(function(v){values[i]=v;if(dl instanceof Array){values.length=dl.length;values=Array.prototype.slice.call(values,0)}ret.canceller();ret.call(values)}).error(function(e){ret.fail(e)});num++})(dl[i],i);if(!num)Deferred.next(function(){ret.call()});ret.canceller=function(){for(var i in dl)if(dl.hasOwnProperty(i)){dl[i].cancel()}};return ret};Deferred.loop=function(n,fun){var o={begin:n.begin||0,end:(typeof n.end=="number")?n.end:n-1,step:n.step||1,last:false,prev:null};var ret,step=o.step;return Deferred.next(function(){function _loop(i){if(i<=o.end){if((i+step)>o.end){o.last=true;o.step=o.end-i+1}o.prev=ret;ret=fun.call(this,i,o);if(Deferred.isDeferred(ret)){return ret.next(function(r){ret=r;return Deferred.call(_loop,i+step)})}else{return Deferred.call(_loop,i+step)}}else{return ret}}return(o.begin<=o.end)?Deferred.call(_loop,o.begin):null})};Deferred.repeat=function(n,fun){var i=0,end={},ret=null;return Deferred.next(function(){var t=(new Date()).getTime();do{if(i>=n)return null;ret=fun(i++)}while((new Date()).getTime()-t<20);return Deferred.call(arguments.callee)})};Deferred.register=function(name,fun){this.prototype[name]=function(){var a=arguments;return this.next(function(){return fun.apply(this,a)})}};Deferred.register("loop",Deferred.loop);Deferred.register("wait",Deferred.wait);Deferred.connect=function(funo,options){var target,func,obj;if(typeof arguments[1]=="string"){target=arguments[0];func=target[arguments[1]];obj=arguments[2]||{}}else{func=arguments[0];obj=arguments[1]||{};target=obj.target}var partialArgs=obj.args?Array.prototype.slice.call(obj.args,0):[];var callbackArgIndex=isFinite(obj.ok)?obj.ok:obj.args?obj.args.length:undefined;var errorbackArgIndex=obj.ng;return function(){var d=new Deferred().next(function(args){var next=this._next.callback.ok;this._next.callback.ok=function(){return next.apply(this,args.args)}});var args=partialArgs.concat(Array.prototype.slice.call(arguments,0));if(!(isFinite(callbackArgIndex)&&callbackArgIndex!==null)){callbackArgIndex=args.length}var callback=function(){d.call(new Deferred.Arguments(arguments))};args.splice(callbackArgIndex,0,callback);if(isFinite(errorbackArgIndex)&&errorbackArgIndex!==null){var errorback=function(){d.fail(arguments)};args.splice(errorbackArgIndex,0,errorback)}Deferred.next(function(){func.apply(target,args)});return d}};Deferred.Arguments=function(args){this.args=Array.prototype.slice.call(args,0)};Deferred.retry=function(retryCount,funcDeferred,options){if(!options)options={};var wait=options.wait||0;var d=new Deferred();var retry=function(){var m=funcDeferred(retryCount);m.next(function(mes){d.call(mes)}).error(function(e){if(--retryCount<=0){d.fail(['retry failed',e])}else{setTimeout(retry,wait*1000)}})};setTimeout(retry,0);return d};Deferred.methods=["parallel","wait","next","call","loop","repeat","chain"];Deferred.define=function(obj,list){if(!list)list=Deferred.methods;if(!obj)obj=(function getGlobal(){return this})();for(var i=0;i<list.length;i++){var n=list[i];obj[n]=Deferred[n]}return Deferred};this.Deferred=Deferred;

var log = widget.preferences.debugMode ? debug : function(){};

log('background.js executed');

opera.extension.onconnect = function(event)  {
	// код выполняется при запуске loader.js
};

var ready = Deferred();

/**
 * Выполнить инъекцию скриптов
 * @param {Object} source - окно-источник
 * @param {string} url
 */
function callReady(source, url) 
{
	log('ready : ' + url);
	ready.call({source: source, url: url});
};

/**
 * Инъекция скриптов на страницы
 * @param {Object} script - информация о скрипте
 * @param {Object} target - окно, куда производится иъекция
 */
function inject(script, target)
{
	log('injection to ' + target.url + ' starts...');
	createScript(script.content, script.url, target.source, target.url);
};

function debug(message) 
{
	var messagePrefix = "vkpatch (background.js) :: ";
	opera.postError(messagePrefix + message);
};

/**
 * Отправка окну скрипт для инъекции
 * @param {string} content - тело скрипта
 * @param {string} url - путь скрипта (для отладки в DOM страницы)
 * @param {Object} target - окно-получатель
 */
function createScript(content, scriptUrl, target, targetUrl) 
{
	log('injection ' + targetUrl + ' // ' + scriptUrl);
	target.postMessage(
	{
		action: 'createScript',
		content: content,
		scriptUrl: scriptUrl
	});
};

/**
 * Получить содержимое локального файла
 * @param {string} path - относительный путь к файлу из папки opera extension
 */
function read(url)
{
	var deferred = new Deferred();
	log('reading ' + url + '...');
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.onreadystatechange = function() 
	{
		try 
		{ 
			if (req.readyState == 4) 
			{
				log('reading ' + url + '... done');
				deferred.call(
				{
					content: req.responseText,
					url: url
				});
			}
			else
			{
				log('reading ' + url + '... not found');
				deferred.call(
				{
					content: null,
					url: url
				});
			}
		} 
		catch (e) 
		{
			deferred.fail();
		}
	};
	
	req.send(null);
	
	return deferred;
};
		
var readList = read;

opera.extension.onmessage = function(event) {
	/*
	 * Получено сообщение от loader.js
	 */
	var data = event.data;
	log('message: ' + data.action);
	if (data.action) 
	{
		switch (data.action)
		{
			case 'widgetUrl':
				
				// отправляем loader.js адрес текущего плагина в опере
				event.source.postMessage(document.location.host);
				
				break;
				
			case 'ready':
				/*
				 * Страница готова к инъекции
				 */
				callReady(event.source, data.url);
				
				break;
		}
	};
	
};

/**
 * Загрузчик модулей
 * @param {function} ready() - ожидает загрузку страницы. Её результат будет передан функции inject вторым аргументом 
 * @param {function} read(url) - читает файл. Должна возвращать объект, содержащий поле content с содержимым файла
 * @param {function} readList(url) - читает файл списка. По сути дублирует read, вынесено отдельно, т.к. в некоторых браузерах нет необходимости читать содержимое скрипта, а инъекция проиводится указанием адреса. Например в Chrome
 * @param {function} inject(script, target) - script - результат выполнения функции read, target - ready. Выполняет инъекцию скрипта в страницу
 * @param {function} log(message) - отладочные сообщения
 */
(function(ready, read, readList, inject, log)
{
	// имя файла, содержащий перечисление подключаемых модулей
	var listFilename = "list.txt";
	
	read = wrapFunction(read);
	readList = wrapFunction(readList);
	inject = wrapFunction(inject);
	logBind = wrapFunction(log);
	
	/**
	 * Возвращает функцию, работающую как bind для переданной
	 * @example
	 * var log = function(message){ console.log(message); }
	 * var bindLog = wrapFunction(log);
	 * var log1 = bindLog(1);
	 * var logAlert = bindLog('alert!');
	 * log1();		// 1
	 * logAlert();	// alert!
	 * @param {Object} fn
	 */
	function wrapFunction(fn) 
	{
		return function() 
		{
			// вызываем bind на нашей функции с аргументами, переданными функции
			return Function.prototype.bind.apply(fn, [null].concat( Array.prototype.slice.call(arguments) ))
		};
	}
	
	/**
	 * Парсинг списка модулей
	 * @param {string} data - содержимое файла
	 */
	function parseList(data) 
	{
		if (!data || !data.content) 
		{
			return [];
		};
		
		var lines = data.content.match(/^[^#\r\n]+/gm);
		var result = [];
		for (var i = 0; i < lines.length; i++) 
		{
			var line = lines[i].trim();
			if (line == '') 
			{
				continue;
			}
			result.push(line);
		};
		log('parse ' + data.url + " :: " + result);
		return result;
	};
	
	/**
	 * Подключение всех модулей
	 * @param {array} list - список описаний модуля
	 */
	function injectAll(list) 
	{
		var jobs = [];
		var result = Deferred;
		var pageInfo = list.shift();		// первый элемент это результат выволнения ready функции
		log('inject all ', list);
		for (var i=0;i<list.length;i++)
		{
			result = result.next( inject(list[i], pageInfo) );
		}
		
		result = result.next(function()
		{
			return {page: pageInfo, list: list};	// возвращаем результат следующей функции в цепочке вызовов
		});
		
		return result;
	}
	
	/**
	 * Подключение всех модулей в папке
	 * читает содержимое файла с именем listFilename в папке
	 * @param {string} path - путь к папке
	 * @param {function} eachFunc - этой функции будет передано имя плагина, перед его подключением
	 */
	function include(path, eachFunc)
	{
		return function() 
		{
			log('include ' + path);
			return Deferred
			.next(
				readList(path + 'list.txt')			// чтение списка плагинов
			)
			.next(parseList)								// парсинг
			.next(function(list)
			{
				var parallelJobs = [];
				for (var i=0;i<list.length;i++)
				{
					if (eachFunc) 
					{
						parallelJobs.push(
							eachFunc(list[i], path)	
						);
					};
					parallelJobs.push(
						read(path + list[i] + '.js')	// чтение файлов
					);
				}
				if (parallelJobs.length == 0) 
				{
					return null;		// список пуст или не существут
				}
				else
				{
					log('read by list:', list);
					return Deferred.parallel(parallelJobs);
				}
			});
		};
	};
	
	/**
	 * Выпрямление массива
	 * @param {array} arr
	 */
	function flatten(arr) 
	{
	    var r = [];
	    for (var i = 0; i < arr.length; i++) {
	        var v = arr[i];
	        if (v instanceof Array) {
	            Array.prototype.push.apply(r, flatten(v));
	        } else {
	            r.push(v);
	        }
	    }
	    return r;
	};
	
	/**
	 * Удаление null элементов
	 * @param {Object} arr
	 */
	function clean(arr) 
	{
		var r = [];
		for (var i = 0; i < arr.length; ++i) 
		{
			if (arr[i] !== null)
			{
				r.push(arr[i]);
			} 
	   };
		return r;
	}
	
	/**
	 * Подключить библиотеки, относящиеся к этому плагину
	 * поиск их в папке plugins/{имя плагина}/list.txt
	 * @param {string} name
	 * @param {string} path
	 */
	function includeLibs(name, path) 
	{
		return include(path + name + '/');
	};
	
	/*
	 * Создание цепочки ассинхронных вызовов
	 */
	Deferred.parallel(
	[
				ready,											//
				include('components/'),						//  асинхронно читаем все скрипты 
				read('vkpatch.user.js'),					//  
				include('plugins/', includeLibs)			//  включая модули, относящиеся к плагинам
	])
	/*
	 *  на на выходе получаем массив результатов функций, выполненых параллельно
	 *  для вложенных цепочек функций, например при include создается отдельная цепочка
	 *  асинхронных вызовов. Поэтому выпрямляем массив (flatten) и удаляем null результаты
	 *  null результаты могут возникать, например если нет файла list.txt, тогда результатом цепочки
	 *  include будет null.
	 *  В конце производим иъекцию всех скриптов, поочередно, соблюдая порядок,
	 *  заданный в цепочке параллельных функций и в файлах list.txt 
	 */
	.next(flatten).next(clean).next(injectAll);		
	
})(ready, read, readList, inject, log);