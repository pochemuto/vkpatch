// ==UserScript==
// @name           vkPatch
// @namespace      http://klinifini.livejournal.com/
// @description    Расширение функционала ВКонтакте.ру
// @include        http://vkontakte.ru/*
// ==/UserScript==
// Author: Сергей Третьяк
// Version: 6
// Site: klinifini.livejournal.com

/*
 * Подключение jQuery 1.4
 */
_window = window;
if (typeof(unsafeWindow) != 'undefined')
{
	_window = unsafeWindow;
};

// Загрузка скрипта
var jQueryScript = document.createElement('script');
jQueryScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
jQueryScript.type = 'text/javascript';
_window.document.getElementsByTagName('head')[0].appendChild(jQueryScript);


/*
 * devToolz 0.2
 * расширение объектов
 */
var devToolz={maxAlerts:5,alertTimeOut:1000,lastAlertTime:0,alertCount:0,alertFreeze:false,alertFunc:alert,replaceAlert:function(){window.alert=devToolz.alert;return this},extendObjects:function(){String.prototype.repeat=function(n){return devToolz.repeat(this,n)};Object.prototype.like=function(obj){return devToolz.compare(this,obj)};Object.prototype.exists=function(obj){return devToolz.exists(this,obj)};Object.prototype.find=function(obj){return devToolz.find(this,obj)};Object.prototype.subtract=function(obj){return devToolz.subtract(this,obj)};Object.prototype.clone=function(){return devToolz.clone(this)};Object.prototype.remove=function(obj){return devToolz.remove(this,obj)};Object.prototype.findAll=function(obj){return devToolz.findAll(this,obj)};Object.prototype.isArray=function(){return devToolz.is.array(this)};Object.prototype.isNumber=function(){return devToolz.is.number(this)};Object.prototype.isString=function(){return devToolz.is.string(this)};Object.prototype.isRegexp=function(){return devToolz.is.regexp(this)};Object.prototype.isFunc=function(){return devToolz.is.func(this)};Object.prototype.dump=function(){return devToolz.dump(this,0)};Array.prototype.dump=function(){return devToolz.dump(this,0)}},repeat:function(str,n){var s='';while(n>0){s+=str;n--}return s},compare:function(obj1,obj2){if(typeof(obj1)=='undefined'&&typeof(obj2)=='undefined')return true;if(typeof(obj1)=='undefined'||typeof(obj2)=='undefined')return false;if(typeof(obj1)!==typeof(obj2))return false;if((typeof(obj1)=='string'||typeof(obj1)=='number'||typeof(obj1)=='boolean')&&obj1==obj2)return true;if(obj1.length!==obj2.length)return false;return(obj1.toSource()==obj2.toSource())},exists:function(obj,needle){for(var i in obj){if(devToolz.compare(obj[i],needle))return true};return false},find:function(obj,needle){for(var i in obj){if(devToolz.compare(obj[i],needle))return i};return null},findAll:function(obj,needle){var result=[];for(var i in obj){if(devToolz.compare(obj[i],needle))result.push(i)};return result},subtract:function(obj,subtr){var result;if(typeof(obj)=='string'&&typeof(subtr)=='string')return result.replace(new RegExp(subtr,'g'),'');if(typeof(obj)=='number'&&typeof(subtr)=='number')return obj-subtr;if(typeof(obj)=='object'&&obj instanceof Array&&typeof(subtr)=='object'&&subtr instanceof Array){result=[];for(var i=0;i<obj.length;i++){if(!devToolz.exists(subtr,obj[i])){result.push(obj[i])}};return result}result=devToolz.clone(obj);for(var i in obj){if(typeof(subtr[i])!='undefined'&&devToolz.compare(obj[i],subtr[i]))delete(result[i])};return result},remove:function(obj,element){var result;if(typeof(obj)=='string'&&typeof(element)=='string')return result.replace(new RegExp(element,'g'),'');if(typeof(obj)=='number'&&typeof(element)=='number')return obj-element;if(typeof(obj)=='object'&&obj instanceof Array){result=[];for(var i=0;i<obj.length;i++){if(!this.compare(element,obj[i])){result.push(obj[i])}};return result};result=devToolz.clone(obj);for(var i in obj){if(devToolz.compare(obj[i],element))delete result[i]};return result},dump:function(obj,level){if(typeof(obj)=='string'||typeof(obj)=='number'||typeof(obj)=='boolean')return obj;function formatNode(node){switch(typeof(node)){case'string':node="\u201C"+node+"\u201D";break;case'function':if(typeof(node.toSource)=='undefined'){node=node.toString()}else{node=node.toSource()};break;case'object':node=devToolz.dump(node,level+1);break;default:node=node}return node}level=level||0;var result='';var space=devToolz.repeat("\t",level);var node;if(typeof(obj)=='object'&&obj instanceof Array){for(var i=0;i<obj.length;i++)result+="\n"+space+i+': '+formatNode(obj[i])}else{for(var i in obj){if(!obj.hasOwnProperty(i)){continue};result+="\n"+space+'['+i+']: '+formatNode(obj[i])}};if(level==0){result=result.substr(1)};return result},clone:function(obj){if(typeof(obj)=='number'||typeof(obj)=='string'||typeof(obj)=='function'||typeof(obj)=='boolean')return obj;var result;if(devToolz.is.array(obj)){result=[];for(var i=0;i<obj.length;i++){if(devToolz.is.func(obj[i])&&devToolz.exists(devToolz.protoMethods,obj[i]))continue;result.push(devToolz.clone(obj[i]))}}else{result={};for(var i in obj){if(devToolz.is.func(obj[i])&&devToolz.exists(devToolz.protoMethods,obj[i]))continue;result[i]=devToolz.clone(obj[i])}};return result},date:{now:function(){return(new Date().getTime())},elapsedTime:function(old,now){now=now||devToolz.date.now();return(now-old)}},is:{array:function(obj){return(typeof(obj)=='object'&&obj instanceof Array)},string:function(obj){return(typeof(obj)=='string')},number:function(obj){return(typeof(obj)=='number')},bool:function(obj){return(typeof(obj)=='boolean')},func:function(obj){return(typeof(obj)=='function')},regexp:function(obj){return(typeof(obj)=='object'&&obj instanceof RegExp)}},alert:function(message){if(alert.caller!==alert){devToolz.alert(devToolz.dump(message));return};if(this.date.elapsedTime(this.lastAlertTime)<this.alertTimeOut)devToolz.alertCount++;else{devToolz.alertCount=0;devToolz.alertFreeze=false};if(devToolz.alertFreeze){devToolz.lastAlertTime=devToolz.date.now();return};if(devToolz.alertCount>=devToolz.maxAlerts){if(!confirm('Продолжить показ всплывающих окон?')){devToolz.alertFreeze=true}else devToolz.alertCount=0};if(devToolz.alertCount<devToolz.maxAlerts){devToolz.alertFunc.call(window,message)};devToolz.lastAlertTime=devToolz.date.now()}};
$$ = devToolz;

// Расширение объектов свойствами
// Лучше отключить - плохая практика раз, Опера не переваривает - два
//devToolz.extendObjects();

// Подмена алерта
devToolz.replaceAlert();

// Ожидание
function jQuery_wait()
{

    if(typeof(_window.jQuery) == 'undefined')
	{
		_window.setTimeout(jQuery_wait,100);
	}
	else
	{
		$ = _window.jQuery;
		jQuery = _window.jQuery;
		
		init();
	};
	
};



/*
 * Инициализация скрипта
 */
function init()
{
	/*
	 * Подключаем модули
	 */
	
	/**
	 * Модуль редактирования настроек
	 */

	vkPatch.plugins.add({
		
		/**
		 * Описания
		 */
		name: 'settings',
		settings: {
		           test: vkPatch.settings.create().def(0).min(0).max(150).done()
		},
		
		lang:
		{
			settings: {
				test: ['название параметра','Описание']
			},
			
			tabTitle: '&#9874;'  /* сумма (&#8512;), звёздочка (&#9733;), молоточки (&#9874;) */
		},
		
		page: 'settings',
		exec: function()
		{
			this.tab = vkPatch.iface.addTab(this.lang.tabTitle, $('#content > div.tBar:eq(0) > ul')).click(jQuery.proxy(this.activateTab,this));
		},
		
		
		/**
		 * Содержание
		 */
		
		// ссылка на вкладку
		tab: null,
		
		// содержание вкладки
		tabContent: null,
		
		/*
		 * Подготавливаем содержимое вкладки
		 */
		prepareTabContent: function()
		{
			//this.tabContent = $('<form ')
		},
		
		/*
		 * Активируем вкладку
		 */
		activateTab: function()
		{

			// активируем вкладку
			vkPatch.iface.activateTab(this.tab);
			
			// содержимое вкладки
			if (this.tabContent === null)
			{
				this.prepareTabContent();
			};

			// заменяем содержимое
			$('#content > div.editorPanel').empty().append(this.tabContent);
			
		}
			
	});

	vkPatch.init();
};




/*
 * vkPatch
 */
var vkPatch =
{
	init: function()
	{
		
		/*
		 * Определяем, является ли текущая страница, страницей контакта. Это может быть полем редактирования заметки, например.
		 * Если нет, то прекращаем выполнение vkPatch
		 */
		if ($('#vkontakte').length == 0 || $('#vkontakte').get(0).tagName.toUpperCase() != 'HTML')
		{
			return;
		};
		
		vkPatch.load.step1();

	},
	
	/**
	 * Процессы инициализации vkPatch
	 */
	load: 
	{
		/**
		 * Подключаем необходимые плагины jQuery
		 */
		step1: function()
		{
		
			
		
			/*
			 * Подключаем необходимые плагины jQuery
			 */
			
			// jQBrowser v0.2: http://davecardwell.co.uk/javascript/jquery/plugins/jquery-browserdetect/
			// Добавлен Chrome - $.browser.chrome()
			new function(){var a={'browser':function(){return b.browser},'version':{'number':function(){return b.version.number},'string':function(){return b.version.string}},'OS':function(){return b.OS},'aol':function(){return b.aol},'camino':function(){return b.camino},'firefox':function(){return b.firefox},'flock':function(){return b.flock},'icab':function(){return b.icab},'konqueror':function(){return b.konqueror},'mozilla':function(){return b.mozilla},'msie':function(){return b.msie},'netscape':function(){return b.netscape},'opera':function(){return b.opera},'safari':function(){return b.safari},'chrome':function(){return b.chrome},'linux':function(){return b.linux},'mac':function(){return b.mac},'win':function(){return b.win}};$.browser=a;var b={'browser':'Unknown','version':{'number':undefined,'string':'Unknown'},'OS':'Unknown','aol':false,'camino':false,'firefox':false,'flock':false,'icab':false,'konqueror':false,'mozilla':false,'msie':false,'netscape':false,'opera':false,'safari':false,'chrome':false,'linux':false,'mac':false,'win':false};for(var i=0,ua=navigator.userAgent,ve=navigator.vendor,data=[{'name':'Safari','browser':function(){return/Apple/.test(ve)}},{'name':'Opera','browser':function(){return window.opera!=undefined}},{'name':'iCab','browser':function(){return/iCab/.test(ve)}},{'name':'Konqueror','browser':function(){return/KDE/.test(ve)}},{'identifier':'aol','name':'AOL Explorer','browser':function(){return/America Online Browser/.test(ua)},'version':function(){return ua.match(/rev(\d+(?:\.\d+)+)/)}},{'name':'Flock','browser':function(){return/Flock/.test(ua)}},{'name':'Camino','browser':function(){return/Camino/.test(ve)}},{'name':'Firefox','browser':function(){return/Firefox/.test(ua)}},{'name':'Netscape','browser':function(){return/Netscape/.test(ua)}},{'identifier':'msie','name':'Internet Explorer','browser':function(){return/MSIE/.test(ua)},'version':function(){return ua.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)}},{'name':'Chrome','browser':function(){return/chrome/.test(ua)}},{'name':'Mozilla','browser':function(){return/Gecko|Mozilla/.test(ua)},'version':function(){return ua.match(/rv:(\d+(?:\.\d+)+)/)}}];i<data.length;i++){if(data[i].browser()){var c=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();b[c]=true;b.browser=data[i].name;var d;if(data[i].version!=undefined&&(d=data[i].version())){b.version.string=d[1];b.version.number=parseFloat(d[1])}else{var e=new RegExp(data[i].name+'(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)');d=ua.match(e);if(d!=undefined){b.version.string=d[1];b.version.number=parseFloat(d[1])}}break}};for(var i=0,pl=navigator.platform,data=[{'identifier':'win','name':'Windows','OS':function(){return/Win/.test(pl)}},{'name':'Mac','OS':function(){return/Mac/.test(pl)}},{'name':'Linux','OS':function(){return/Linux/.test(pl)}}];i<data.length;i++){if(data[i].OS()){var c=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();b[c]=true;b.OS=data[i].name;break}}}();
		
			// Cookies
			// http://plugins.jquery.com/node/1387
			jQuery.cookie=function(a,b,c){if(typeof b!='undefined'){c=c||{};if(b===null){b='';c=$.extend({},c);c.expires=-1;}var d='';if(c.expires&&(typeof c.expires=='number'||c.expires.toUTCString)){var e;if(typeof c.expires=='number'){e=new Date();e.setTime(e.getTime()+(c.expires*24*60*60*1000));}else{e=c.expires;}d='; expires='+e.toUTCString();}var f=c.path?'; path='+(c.path):'';var g=c.domain?'; domain='+(c.domain):'';var h=c.secure?'; secure':'';document.cookie=[a,'=',encodeURIComponent(b),d,f,g,h].join('');}else{var j=null;if(document.cookie&&document.cookie!=''){var k=document.cookie.split(';');for(var i=0;i<k.length;i++){var l=jQuery.trim(k[i]);if(l.substring(0,a.length+1)==(a+'=')){j=decodeURIComponent(l.substring(a.length+1));break;}}}return j;}};
			

			/*
			 * jQuery JSON Plugin
			 * version: 1.0 (2008-04-17)
			 *
			 * This document is licensed as free software under the terms of the
			 * MIT License: http://www.opensource.org/licenses/mit-license.php
			 *
			 * Brantley Harris technically wrote this plugin, but it is based somewhat
			 * on the JSON.org website's http://www.json.org/json2.js, which proclaims:
			 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
			 * I uphold.  I really just cleaned it up.
			 *
			 * It is also based heavily on MochiKit's serializeJSON, which is 
			 * copywrited 2005 by Bob Ippolito.
			 */
			(function($){function toIntegersAtLease(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(date){return this.getUTCFullYear()+"-"+toIntegersAtLease(this.getUTCMonth())+"-"+toIntegersAtLease(this.getUTCDate())};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};$.quoteString=function(string){if(escapeable.test(string)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+string+'"'};$.toJSON=function(o,compact){var type=typeof(o);if(type=="undefined"){return"undefined"}else{if(type=="number"||type=="boolean"){return o+""}else{if(o===null){return"null"}}}if(type=="string"){return $.quoteString(o)}if(type=="object"&&typeof o.toJSON=="function"){return o.toJSON(compact)}if(type!="function"&&typeof(o.length)=="number"){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i],compact))}if(compact){return"["+ret.join(",")+"]"}else{return"["+ret.join(", ")+"]"}}if(type=="function"){throw new TypeError("Unable to convert object of type 'function' to json.")}var ret=[];for(var k in o){var name;type=typeof(k);if(type=="number"){name='"'+k+'"'}else{if(type=="string"){name=$.quoteString(k)}else{continue}}var val=$.toJSON(o[k],compact);if(typeof(val)!="string"){continue}if(compact){ret.push(name+":"+val)}else{ret.push(name+": "+val)}}return"{"+ret.join(", ")+"}"};$.compactJSON=function(o){return $.toJSON(o,true)};$.evalJSON=function(src){return eval("("+src+")")};$.secureEvalJSON=function(src){var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,"@");filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered)){return eval("("+src+")")}else{throw new SyntaxError("Error parsing JSON, source is not valid.")}}})(jQuery);(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.prototype=e;c.constructor=c;c.extend=arguments.callee;return c}})();
			
			
			vkPatch.load.step2();
		},
		
		/**
		 * Инициализация модулей vkPatch и выполнение
		 */
		step2: function()
		{

			// Определение страницы
			vkPatch.page.get();
	
			// Определение браузера и задание специфичный параметров
			vkPatch.browser.determine();
			
			vkPatch.plugins.exec();

			
		}
	},
	
	/**
	 * Текущий браузер
	 */
	browser:
	{
		isFirefox: false,
		isOpera: false,
		isIE: false,
		isChrome: false,
		
		/*
		 * Задание специфичных для браузера установок
		 */
		determine: function()
		{
			if ($.browser.opera())
			{
				vkPatch.browser.isOpera = true;
				vkPatch.console_browser = opera.postError;
			}
			else if ($.browser.firefox())
			{
				vkPatch.browser.isFirefox = true;
				vkPatch.console_browser = console.log;
			}
			else if ($.browser.msie())
			{
				vkPatch.browser.isIE = true;
			}
			else if ($.browser.chrome())
			{
				vkPatch.console_browser = console.log;
				vkPatch.browser.isChrome = true;
			};
		}
	},
	
	/**
	 * Текущая страница
	 */
	page:
	{
		string: 'index',
		path: '',
		isSettings: false,
		isIndex: false,
		
		/*
		 * Получение информации о текущей странице
		 */
		get: function()
		{
			var page = location.pathname.substring(1);	// удаляем ведущий слеш /
			vkPatch.page.path = page;
			
			if (/^id[0-9]*$/.test(page))
			{
				vkPatch.page.isIndex = true;
			}
			else
			{
				// удаляем .php
				page = page.substring(0,page.length-4);
			};
			vkPatch.page.string = page;
			
			switch(page)
			{
				case 'settings':
					vkPatch.page.isSettings = true;
					break;
			
			};
		}
	},
	
	/**
	 * Настройки
	 * 
	 * Содержатся описания настроек, такие как минимум, максимум, начальное значение, тип и другие
	 * Доступ к параметру осуществляется геттерами и сеттерами:
	 * 		vkPatch.settings./имя параметра/.get();
	 * 										.set(value);
	 * или для параметров плагина: vkPatch./имя плагина/.settings./имя параметра/.get()  | set()
	 * 
	 * 	С помощью конструктора описаний можно задавать параметры цепочками вызовов. В конце объект описания получают функцией done():
	 * 		vkPatch.settings.create('floatVal').def(4.75).min(0).max(10).isFloat().done();
	 */
	settings:
	{
		/*
		 * Категории.
		 * Контейнер, содержащий все параметры, разбитые на категории, для удобного представления
		 * hidden - категория по-умолчанию
		 */
		categories: {},
				
		/*
		 * Конструктор описания параметра
		 * Пример создания: vkPatch.settings.create().def(4).min(1).max(10).isFloat().inSett().done();
		 */
		option: function()
		{
			
			/*
			 * Описание параметра
			 */
			var node =
			{
				// имя, без пробелов. По этому адресу хранится в памяти само значение
				// имя содержит имя плагина, пример updater.timeout
				name: null,
				// категория. По-умолчанию hidden - скрытые.
				category: 'hidden',
				// значение по-умолчанию. тип параметра определяется по типа этого значения. 
				def: true,
				
				min: null,
				max: null,
				// число с плавающей точкой. в противном случае округляется до целого 
				isFloat: false,
				
				// набор: массив возможных значений
				set: null,

				/*
				 * Чтение параметра из памяти
				 */
				get: function()
				{
					var value = vkPatch.storage.get(this.name);
					
					var result_value = this.def;
					/*
					 * Требуемый тип значения узнаём по типу значения по-умолчанию
					 */
					if ($$.is.bool(this.def))
					{
						result_value = new Boolean(value);
					}				
					else if ($$.is.number(this.def))
					{
						var temp_value;
						/*
						 * Пытаемся получить число, в зависимости от типа
						 */
						if (this.isFloat)
						{
							temp_value = parseFloat(value);
						}
						else
						{
							temp_value = parseInt(value);
						};

						/*
						 * Обработка крайних случаев
						 */
						if (isNaN(temp_value) || temp_value == Infinity)
						{
							temp_value = this.def;
						}
						else if (this.min !== null && temp_value < this.min)
						{
							temp_value = this.min;
						}
						else if (this.max !== null && temp_value > this.max)
						{
							temp_value = this.max;
						}
						
						result_value = temp_value;
					}
					else if(this.set !== null) /* набор */
					{
						if ($$.exists(this.set,value))
						{
							result_value = value;
						}
						else
						{
							result_value = this.def;
						}
					}
					else	/*	строка	*/
					{
						result_value = value;
					};
					
					return result_value;
				},
				
				/*
				 * Сохранине параметра в памяти
				 */
				set: function(value)
				{
					// сохраниние
					vkPatch.storage.set(this.name, value);				
				}
			};
			
			this.def = function(value)
			{
				node.def = value;
				return this;
			};
			
			this.min = function(min)
			{
				node.min = min;
				return this;
			};
			
			this.max = function(max)
			{
				node.max = max;
				return this;
			};
			
			this.isFloat = function()
			{
				node.isFloat = true;
				return this;
			};
			
			this.inSett = function(category)
			{
				node.category = category;
				return this;
			};
			
			/*
			 * Завершаем описание параметра и получаем объект описания
			 */
			this.done = function()
			{
				return node;
			};
		},
		
		
		/*
		 * Создание описания настройки
		 */
		create: function()
		{
			var option = new vkPatch.settings.option();
	
			return option;
		}
	},
	
	/**
	 * Хранилище данных
	 */
	storage:
	{
	
		set: function(name,value)
		{
			localStorage.setItem(name,$.toJSON(value));
		},
		
		get: function(name)
		{
			return $.evalJSON(localStorage.getItem(name));
		},
		
		remove: function(name)
		{
			localStorage.removeItem(name);
		},
		
		clear: function()
		{
			localStorage.clear();
		}
	},
	
	/**
	 * Плагины
	 */
	plugins:
	{
		/*
		 * Контейнер всех плагинов, чтобы можно было их обходить перебором
		 */
		container: [],
		
		/*
		 * Добавление плагина к vkPatch
		 */
		add: function(plugin)
		{
			// в контейнер
			vkPatch.plugins.container.push(plugin);
			
			
			/*
			 * Устанавливаем имя в описания парамтров плагинов
			 * Оно состоит из имени_плагина.имя_параметра
			 */
			for (var optionName in plugin.settings)
			{
				if (plugin.settings.hasOwnProperty(optionName))
				{
					plugin.settings[optionName].name = plugin.name + '.' + optionName;
				};
			};
			
		},
				
		/*
		 * Выполнение
		 * Производится только на заданой странице, которая указывается параметром page в плагине
		 */
		exec: function()
		{
			var container = vkPatch.plugins.container;
			/*
			 * Проходим по всем
			 */
			for (var i=0; i < container.length; i++)
			{
				var plugin = container[i];
				
				if (!$$.is.array(plugin.page))
				{
					plugin.page = [plugin.page];
				};
				
				/*
				 * Определяем необходимость выполнения
				 */
				var mustRun = false;
				for (var j=0; j < plugin.page.length; j++)
				{
					var page = plugin.page[i];
					
					if (	( page instanceof RegExp && page.test(vkPatch.page.path) )	/* задано регулярное выражение */
						||	( page === '*' )					/* все страницы */
						||	( page === vkPatch.page.string)
						)
					{
						mustRun = true;
						break;
					};
				};
				
				if (mustRun)
				{
					/*
					 * Выполняем плагин в своем контексте
					 */
					plugin.exec.call(plugin);
				};
					
			};
		}
	},
	
	/**
	 * Интерфейс
	 */
	iface:
	{
		
		/*
		 * Создание таба
		 * 
		 * @return объект A созданного таба
		 * target - объект списка ul
		 */
		addTab:	function(text,target,active)
		{
			active = active || false;
			target = $(target);
			var link = $('<a>').append( 
								$('<b>').addClass('tl1')
							 ).append( 
							 	$('<b>').addClass('tl2')
							 ).append(
							 	$('<b>').addClass('tab_word').html(text)
							 ).attr({href:'javascript:void(0)'});
			
			var li = $('<li>').append(link).appendTo(target);
			if (active)
			{
				vkPatch.iface.activateTab(li);
				// Удаляем активность у другого таба
				//target.find('.activeLink').removeClass('activeLink');
				// и устанавливаем на наш
				//li.addClass('activeLink');
			}
			
			// возвращается ссылка, чтобы на неё можно было повесить событие
			return link;
		},
		
		/*
		 * Активация таба
		 */
		activateTab: function(target)
		{
			target = $(target);
			
			// Идём наверх, пока не получим элемент списка
			while (target.get(0).tagName.toLowerCase() != 'li')
			{
				target = target.parent();
			}

			// Выше сам список табов
			var tabs = target.parent();
			
			// Удаляем активность у другого таба
			tabs.find('.activeLink').removeClass('activeLink');
			
			// Добавляем нашему
			target.addClass('activeLink');
		}
	},
	
	console_browser: function(){},
	console: function(mess) {
		vkPatch.console_browser(mess);
	},

};


window.setTimeout(jQuery_wait,10);