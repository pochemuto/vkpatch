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
 * devToolz 0.2
 * расширение объектов
 */
var $$ = {
	/*
	 * Настройки alert'а
	 */
	maxAlerts: 5,
	alertTimeOut: 1000,
	
	
	lastAlertTime: 0,
	alertCount: 0,
	alertFreeze: false,
	alertFunc: alert,
	
	
	/*
	 * Алерт с предотвращением зацикливания
	 */
	replaceAlert: function() {
		window.alert = devToolz.alert;
		return this;
	},
	
	/*
	 * Расширение объектов методами
	 */
	 
	 extendObjects: function() {
	 	
	 	String.prototype.repeat = function(n) {return devToolz.repeat(this,n);};
	 	
		Object.prototype.like = 	function(obj) {return devToolz.compare(this,obj);};
		Object.prototype.exists = 	function(obj) {return devToolz.exists(this,obj);};
		Object.prototype.find = 	function(obj) {return devToolz.find(this,obj);};
		Object.prototype.subtract = function(obj) {return devToolz.subtract(this,obj);};
		Object.prototype.clone = 	function() {return devToolz.clone(this);};
		Object.prototype.remove = 	function(obj) {return devToolz.remove(this,obj);};
		Object.prototype.findAll = 	function(obj) {return devToolz.findAll(this,obj);};
		
		Object.prototype.isArray = 	function() {return devToolz.is.array(this);};
		Object.prototype.isNumber = function() {return devToolz.is.number(this);};
		Object.prototype.isString =	function() {return devToolz.is.string(this);};
		Object.prototype.isRegexp = function() {return devToolz.is.regexp(this);};
		Object.prototype.isFunc = 	function() {return devToolz.is.func(this);};

		Object.prototype.dump = 	function() {return devToolz.dump(this,0);};
		Array.prototype.dump = 		function() {return devToolz.dump(this,0);};
		
	 },
		
	/*
	 * Расширение string
	 */
	
	repeat: function(str,n) {
		//console.log('repeat');
		var s = '';
		while (n > 0) {
			s += str;
			n--;
		}
		return s;
	},
	
	/*
	 * Расширение Object
	 */
	
	compare: function(obj1,obj2) {
		//console.log('compare');
		if (typeof(obj1) == 'undefined' && typeof(obj2) == 'undefined')
			return true;
	
		if (typeof(obj1) == 'undefined' || typeof(obj2) == 'undefined')
			return false;
		
		if (typeof(obj1) !== typeof(obj2)) 
			return false;
		
		if ((typeof(obj1) == 'string' || typeof(obj1) == 'number' || typeof(obj1) == 'boolean') && obj1 == obj2)
			return true;
				
		if (obj1.length !== obj2.length)
			return false;
		
		return (obj1.toSource() == obj2.toSource());
		/*
		if (!obj1.toSource || !obj2.toSource)
			return false;
		
		return (obj1.toSource() == obj2.toSource());
		*/
		/*
		for (var i in obj1) {
			if(obj2[i] == undefined)
				return false;
			
			if(!this.compare(obj1[i],obj2[i]))
				return false;
		}
		
		if (obj1.toString() !== obj2.toString())
			return false;
		
		return true;
		*/
	},
	
	exists: function(obj,needle) {
		//console.log('exists');
		for (var i in obj) {
			if (devToolz.compare(obj[i],needle))
				return true;
		}
		return false;
	},
	
	find: function(obj,needle) {
		//console.log('find');
		for (var i in obj) {		
			if (devToolz.compare(obj[i],needle))
				return i;

		}
		
		return null;
	},
	
	findAll: function(obj,needle) {
		//console.log('findall');
		var result = [];
		for (var i in obj) {		
			if (devToolz.compare(obj[i],needle))
				result.push(i);

		}
		
		return result;
	},
	
	subtract: function(obj,subtr) {
		//console.log('subtract');
		var result;
		
		/*
		 * Вычитается строка из строки
		 */
		if (typeof(obj) == 'string' && typeof(subtr) == 'string')
			return result.replace(new RegExp(subtr,'g'),'');

		
		/*
		 * Вычитается число из числа
		 */
		if (typeof(obj) == 'number' && typeof(subtr) == 'number')
			return obj - subtr;

		/*
		 * Вычитается из массива массив
		 */
		if (typeof(obj) == 'object' && obj instanceof Array && typeof(subtr) == 'object' && subtr instanceof Array) {
			result = [];
			for (var i=0;i<obj.length;i++) {
				/*
				 * Если текущий елемент не существует в вычитаемом, 
				 * то добавляем его к результату
				 */
				if (!devToolz.exists(subtr,obj[i])) {
					result.push(obj[i]);
				}

			}
			return result;
		}
		 
		/*
		 * Вычитается из объекта объект
		 */
		result = devToolz.clone(obj);
		for (var i in obj) {
			if (typeof(subtr[i]) != 'undefined' && devToolz.compare(obj[i],subtr[i]))
				delete(result[i]);
		}
		
		return result;
	},
	
	remove: function(obj,element) {
		//console.log('remove');
		var result;
		/*
		 * Вычитается строка из строки
		 */
		if (typeof(obj) == 'string' && typeof(element) == 'string')
			return result.replace(new RegExp(element,'g'),'');

		
		/*
		 * Вычитается число из числа
		 */
		if (typeof(obj) == 'number' && typeof(element) == 'number')
			return obj - element;
		
		/*
		 * Вычитается объект из массива
		 */
		if (typeof(obj) == 'object' && obj instanceof Array) {
			result = [];
			for (var i=0;i<obj.length;i++) {
				/*
				 * Если текущий елемент не равен вычитаемому, 
				 * то добавляем его к результату
				 */
				if (!this.compare(element,obj[i])) {
					result.push(obj[i]);
				}
			}
			return result;
		}

		/*
		 * Вычитается из объекта объект
		 */
		result = devToolz.clone(obj);
		for (var i in obj) {
			if (devToolz.compare(obj[i],element))
				delete result[i];
		}
		
		return result;
	},
	
	dump: function(obj,level) {
		//console.log('toString');
		if (typeof(obj) == 'string' || typeof(obj) == 'number' || typeof(obj) == 'boolean')
			return obj;
			
		/*
		 * Функция для развёртывания вложенных элементов
		 */
		function formatNode(node) {
			switch(typeof(node)) {
				case 'string':
					node = "\u201C"+node+"\u201D";
					break;
				case 'function':
					// в опере нет toSource ?
					if (typeof(node.toSource) == 'undefined')
					{
						node = node.toString();
					}
					else
					{
						node = node.toSource();
					}
					break;
				case 'object':
					node = devToolz.dump(node,level+1);
					break;
				default:
					/*
					 * Ничего не делаем
					 */
					node = node;
			}
		
			return node;
		}
		
		level = level || 0;
		var result = '';
		var space = devToolz.repeat("\t",level);
		var node;

		if (typeof(obj) == 'object' && obj instanceof Array) {
			
			for(var i=0;i<obj.length;i++) 
				result += "\n"+ space +i+': ' + formatNode(obj[i]);	
							
		} else {
			for(var i in obj) {
				/*
				 * Не показываем методы, добавленные devToolz
				 */
				//if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					//continue;
				/*
				 * Не показывать методы, установленные prototype
				 */
				if(!obj.hasOwnProperty(i))
				{
					continue;
				}
				result += "\n"+ space + '['+i+']: ' + formatNode(obj[i]);
			}	
		}
		
		if (level == 0) {
			result = result.substr(1);
		}
		
		return result;
	},
	
	clone: function(obj) {
		//console.log('clone');
		if (typeof(obj) == 'number' || typeof(obj) == 'string' || typeof(obj) == 'function' || typeof(obj) == 'boolean') 
			return obj;
		
		
		var result;
		if (devToolz.is.array(obj)) {
		
			result = [];
			for(var i=0;i<obj.length;i++) {
				if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					continue;
				result.push(devToolz.clone(obj[i]));
			}
			
		} else {
		
			result = {};
			for (var i in obj) {
				if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					continue;
				result[i] = devToolz.clone(obj[i]);
			}
			
		}
		
		return result;
	},
		
	date: {
		now: function() {return (new Date().getTime());	},
		elapsedTime: function(old,now) {
			now = now || devToolz.date.now();
			return (now - old);
		}
	},
	
	is: {
		array: function (obj) {
			return (typeof(obj) == 'object' && obj instanceof Array);
		},
		string: function (obj) {
			return (typeof(obj) == 'string');
		},
		number: function (obj) {
			return (typeof(obj) == 'number');
		},
		bool: function (obj) {
			return (typeof(obj) == 'boolean');
		},
		func: function (obj) {
			return (typeof(obj) == 'function');
		},
		regexp: function (obj) {
			return (typeof(obj) == 'object' && obj instanceof RegExp);
		}
	},
	
	alert: function(message) {
		/*
		 * Перевызов функции в контексте devToolz
		 */
		if (alert.caller !== alert) {
			devToolz.alert(devToolz.dump(message));
			return;
		}
			 
		if (this.date.elapsedTime(this.lastAlertTime) < this.alertTimeOut)
			devToolz.alertCount++;
		else {
			devToolz.alertCount = 0;
			devToolz.alertFreeze = false;
		}
		
		if (devToolz.alertFreeze) {devToolz.lastAlertTime = devToolz.date.now(); return;}
		
		if (devToolz.alertCount >= devToolz.maxAlerts) {
			if (!confirm('Продолжить показ всплывающих окон?')) {
				devToolz.alertFreeze = true;
			} else
				devToolz.alertCount = 0;
		}
		
		if (devToolz.alertCount < devToolz.maxAlerts) {
		
			/*
			 * Вызов стандартного alert в контексте window
			 */
			devToolz.alertFunc.call(window,message);

		}
		
		devToolz.lastAlertTime = devToolz.date.now();
	}
};
devToolz = $$;

devToolz.extendObjects();

devToolz.replaceAlert();

/*
 * Инициализация скрипта
 */
function init()
{
	/*
	 * Подключаем модули
	 */

		
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
	
	/*
	 * Процессы инициализации vkPatch
	 */
	load: 
	{
		/*
		 * Подключаем необходимые плагины jQuery
		 */
		step1: function()
		{
			/*
			 * Подключаем необходимые плагины jQuery
			 */
			
			// jQBrowser v0.2: http://davecardwell.co.uk/javascript/jquery/plugins/jquery-browserdetect/
			// Добавлен Chrome - $.browser.chrome()
			eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36));};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e];}];e=function(){return'\\w+';};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('I 2(){g a={\'5\':2(){3 b.5},\'9\':{\'k\':2(){3 b.9.k},\'l\':2(){3 b.9.l}},\'h\':2(){3 b.h},\'n\':2(){3 b.n},\'w\':2(){3 b.w},\'x\':2(){3 b.x},\'y\':2(){3 b.y},\'z\':2(){3 b.z},\'A\':2(){3 b.A},\'B\':2(){3 b.B},\'o\':2(){3 b.o},\'C\':2(){3 b.C},\'p\':2(){3 b.p},\'D\':2(){3 b.D},\'E\':2(){3 b.E},\'F\':2(){3 b.F},\'q\':2(){3 b.q}};$.5=a;g b={\'5\':\'G\',\'9\':{\'k\':r,\'l\':\'G\'},\'h\':\'G\',\'n\':7,\'w\':7,\'x\':7,\'y\':7,\'z\':7,\'A\':7,\'B\':7,\'o\':7,\'C\':7,\'p\':7,\'D\':7,\'J\':7,\'E\':7,\'F\':7,\'q\':7};K(g i=0,f=H.10,m=H.11,6=[{\'4\':\'12\',\'5\':2(){3/13/.8(m)}},{\'4\':\'14\',\'5\':2(){3 15.p!=r}},{\'4\':\'L\',\'5\':2(){3/L/.8(m)}},{\'4\':\'16\',\'5\':2(){3/17/.8(m)}},{\'j\':\'n\',\'4\':\'18 M\',\'5\':2(){3/19 1a 1b/.8(f)},\'9\':2(){3 f.t(/1c(\\d+(?:\\.\\d+)+)/)}},{\'4\':\'N\',\'5\':2(){3/N/.8(f)}},{\'4\':\'O\',\'5\':2(){3/O/.8(m)}},{\'4\':\'P\',\'5\':2(){3/P/.8(f)}},{\'4\':\'Q\',\'5\':2(){3/Q/.8(f)}},{\'j\':\'o\',\'4\':\'1d M\',\'5\':2(){3/R/.8(f)},\'9\':2(){3 f.t(/R (\\d+(?:\\.\\d+)+(?:b\\d*)?)/)}},{\'4\':\'1e\',\'5\':2(){3/J/.8(f)}},{\'4\':\'S\',\'5\':2(){3/1f|S/.8(f)},\'9\':2(){3 f.t(/1g:(\\d+(?:\\.\\d+)+)/)}}];i<6.T;i++){u(6[i].5()){g c=6[i].j?6[i].j:6[i].4.U();b[c]=V;b.5=6[i].4;g d;u(6[i].9!=r&&(d=6[i].9())){b.9.l=d[1];b.9.k=W(d[1])}1h{g e=I 1i(6[i].4+\'(?:\\\\s|\\\\/)(\\\\d+(?:\\\\.\\\\d+)+(?:(?:a|b)\\\\d*)?)\');d=f.t(e);u(d!=r){b.9.l=d[1];b.9.k=W(d[1])}}X}};K(g i=0,v=H.1j,6=[{\'j\':\'q\',\'4\':\'1k\',\'h\':2(){3/1l/.8(v)}},{\'4\':\'Y\',\'h\':2(){3/Y/.8(v)}},{\'4\':\'Z\',\'h\':2(){3/Z/.8(v)}}];i<6.T;i++){u(6[i].h()){g c=6[i].j?6[i].j:6[i].4.U();b[c]=V;b.h=6[i].4;X}}}();',62,84,'||function|return|name|browser|data|false|test|version||||||ua|var|OS||identifier|number|string|ve|aol|msie|opera|win|undefined||match|if|pl|camino|firefox|flock|icab|konqueror|mozilla|netscape|safari|linux|mac|Unknown|navigator|new|chrome|for|iCab|Explorer|Flock|Camino|Firefox|Netscape|MSIE|Mozilla|length|toLowerCase|true|parseFloat|break|Mac|Linux|userAgent|vendor|Safari|Apple|Opera|window|Konqueror|KDE|AOL|America|Online|Browser|rev|Internet|Chrome|Gecko|rv|else|RegExp|platform|Windows|Win'.split('|'),0,{}));
		
			// Cookies
			// http://plugins.jquery.com/node/1387
			jQuery.cookie=function(a,b,c){if(typeof b!='undefined'){c=c||{};if(b===null){b='';c=$.extend({},c);c.expires=-1;}var d='';if(c.expires&&(typeof c.expires=='number'||c.expires.toUTCString)){var e;if(typeof c.expires=='number'){e=new Date();e.setTime(e.getTime()+(c.expires*24*60*60*1000));}else{e=c.expires;}d='; expires='+e.toUTCString();}var f=c.path?'; path='+(c.path):'';var g=c.domain?'; domain='+(c.domain):'';var h=c.secure?'; secure':'';document.cookie=[a,'=',encodeURIComponent(b),d,f,g,h].join('');}else{var j=null;if(document.cookie&&document.cookie!=''){var k=document.cookie.split(';');for(var i=0;i<k.length;i++){var l=jQuery.trim(k[i]);if(l.substring(0,a.length+1)==(a+'=')){j=decodeURIComponent(l.substring(a.length+1));break;}}}return j;}};
			

			/*
			 * Настраеваем flash-storage
			 */
			 
			/*
			jQuery.extend(jQuery.jStore.defaults, {  
                    project: 'vkpatch',  
                    engine: 'flash',  
                    flash: 'http://localhost/vkpatch/jStore.Flash.html'  
            });
             
			// Ожидаем плагины
			jQuery.jStore.ready(function(engine){ 
				jQuery.jStore.flashReady(function(){ 
						// выполняем следующий шаг инициализации
                    	vkPatch.load.step2();	
				});
			});    
			
						
			jQuery.jStore.load();
			*/
			
			vkPatch.load.step2();
		},
		
		/*
		 * Задание настроек vkPatch
		 */
		step2: function()
		{
			/*
			 * Задание специфичных для браузера установок
			 */
			if ($.browser.opera())
			{
				vkPatch.browser.isOpera = true;
				vkPatch.console_browser = opera.postError;
			}
			else if ($.browser.firefox())
			{
				vkPatch.console_browser = console.log;
				vkPatch.browser.isFirefox = true;
			}
			else if ($.browser.msie())
			{
				vkPatch.browser.isIE = true;
			}
			else if ($.browser.chrome())
			{
				//vkPatch.console_browser = console.log;
				//vkPatch.browser.isChrome = true;
			};
			
			vkPatch.load.step3();
		},
		
		/*
		 * Инициализация модулей vkPatch и выполнение
		 */
		step3: function()
		{
			
			// Определение страницы
			vkPatch.page.get();
	
			vkPatch.iface.addTab(vkPatch.lang.settingsTabTitle,'#content > div.tBar:eq(0) > ul').click(function(){vkPatch.iface.activateTab(this);});
		}
	},
	
	browser:
	{
		isFirefox: false,
		isOpera: false,
		isIE: false,
		isChrome: false
	},
	
	/*
	 * Текущая страница
	 */
	page:
	{
		string: 'index',
		isSettings: false,
		isIndex: false,
		
		get: function()
		{
			var page = location.pathname.substring(1);	// удаляем ведущий слеш /
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
	
	/*
	 * Настройки
	 */
	
	settings:
	{
		
	},
	
	/*
	 * Интерфейс
	 */
	iface:
	{
		
		/*
		 * Создание таба
		 * 
		 * @return объект A созданного таба
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
							 	$('<b>').addClass('tab_word').text(text)
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
	
	lang:
	{
		settingsTabTitle: 'vkPatch'
	}
};

window.setTimeout(jQuery_wait,0);