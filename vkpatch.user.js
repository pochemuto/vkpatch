// ==UserScript==
// @name           vkPatch
// @namespace      
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
	document = _window.document;
};

// Загрузка скрипта
var jQueryScript = document.createElement('script');
//jQueryScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
jQueryScript.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
jQueryScript.type = 'text/javascript';
_window.document.getElementsByTagName('head')[0].appendChild(jQueryScript);


/*
 * devToolz 0.2.1
 * расширение объектов
 */
var devToolz={maxAlerts:5,alertTimeOut:1000,lastAlertTime:0,alertCount:0,alertFreeze:false,alertFunc:alert,replaceAlert:function(){window.alert=devToolz.alert;return this},extendObjects:function(){String.prototype.repeat=function(n){return devToolz.repeat(this,n)};Object.prototype.like=function(obj){return devToolz.compare(this,obj)};Object.prototype.exists=function(obj){return devToolz.exists(this,obj)};Object.prototype.find=function(obj){return devToolz.find(this,obj)};Object.prototype.subtract=function(obj){return devToolz.subtract(this,obj)};Object.prototype.clone=function(){return devToolz.clone(this)};Object.prototype.remove=function(obj){return devToolz.remove(this,obj)};Object.prototype.findAll=function(obj){return devToolz.findAll(this,obj)};Object.prototype.isArray=function(){return devToolz.is.array(this)};Object.prototype.isNumber=function(){return devToolz.is.number(this)};Object.prototype.isString=function(){return devToolz.is.string(this)};Object.prototype.isRegexp=function(){return devToolz.is.regexp(this)};Object.prototype.isFunc=function(){return devToolz.is.func(this)};Object.prototype.dump=function(){return devToolz.dump(this,0)};Array.prototype.dump=function(){return devToolz.dump(this,0)}},repeat:function(str,n){var s='';while(n>0){s+=str;n--}return s},compare:function(obj1,obj2){if(typeof(obj1)=='undefined'&&typeof(obj2)=='undefined')return true;if(typeof(obj1)=='undefined'||typeof(obj2)=='undefined')return false;if(typeof(obj1)!==typeof(obj2))return false;if((typeof(obj1)=='string'||typeof(obj1)=='number'||typeof(obj1)=='boolean')&&obj1==obj2)return true;if(obj1.length!==obj2.length)return false;return(obj1.toString()==obj2.toString())},exists:function(obj,needle){for(var i in obj){if(devToolz.compare(obj[i],needle))return true};return false},find:function(obj,needle){for(var i in obj){if(devToolz.compare(obj[i],needle))return i};return null},findAll:function(obj,needle){var result=[];for(var i in obj){if(devToolz.compare(obj[i],needle))result.push(i)};return result},subtract:function(obj,subtr){var result;if(typeof(obj)=='string'&&typeof(subtr)=='string')return result.replace(new RegExp(subtr,'g'),'');if(typeof(obj)=='number'&&typeof(subtr)=='number')return obj-subtr;if(typeof(obj)=='object'&&obj instanceof Array&&typeof(subtr)=='object'&&subtr instanceof Array){result=[];for(var i=0;i<obj.length;i++){if(!devToolz.exists(subtr,obj[i])){result.push(obj[i])}};return result}result=devToolz.clone(obj);for(var i in obj){if(typeof(subtr[i])!='undefined'&&devToolz.compare(obj[i],subtr[i]))delete(result[i])};return result},remove:function(obj,element){var result;if(typeof(obj)=='string'&&typeof(element)=='string')return result.replace(new RegExp(element,'g'),'');if(typeof(obj)=='number'&&typeof(element)=='number')return obj-element;if(typeof(obj)=='object'&&obj instanceof Array){result=[];for(var i=0;i<obj.length;i++){if(!this.compare(element,obj[i])){result.push(obj[i])}};return result};result=devToolz.clone(obj);for(var i in obj){if(devToolz.compare(obj[i],element))delete result[i]};return result},dump:function(obj,level){if(typeof(obj)=='string'||typeof(obj)=='number'||typeof(obj)=='boolean')return obj;function formatNode(node){switch(typeof(node)){case'string':node="\u201C"+node+"\u201D";break;case'function':if(typeof(node.toSource)=='undefined'){node=node.toString()}else{node=node.toSource()};break;case'object':node=devToolz.dump(node,level+1);break;default:node=node}return node}level=level||0;var result='';var space=devToolz.repeat("\t",level);var node;if(typeof(obj)=='object'&&obj instanceof Array){for(var i=0;i<obj.length;i++)result+="\n"+space+i+': '+formatNode(obj[i])}else{for(var i in obj){if(!obj.hasOwnProperty(i)){continue};result+="\n"+space+'['+i+']: '+formatNode(obj[i])}};if(level==0){result=result.substr(1)};return result},clone:function(obj){if(typeof(obj)=='number'||typeof(obj)=='string'||typeof(obj)=='function'||typeof(obj)=='boolean')return obj;var result;if(devToolz.is.array(obj)){result=[];for(var i=0;i<obj.length;i++){if(devToolz.is.func(obj[i])&&devToolz.exists(devToolz.protoMethods,obj[i]))continue;result.push(devToolz.clone(obj[i]))}}else{result={};for(var i in obj){if(devToolz.is.func(obj[i])&&devToolz.exists(devToolz.protoMethods,obj[i]))continue;result[i]=devToolz.clone(obj[i])}};return result},date:{now:function(){return(new Date().getTime())},elapsedTime:function(old,now){now=now||devToolz.date.now();return(now-old)}},is:{array:function(obj){return(typeof(obj)=='object'&&obj instanceof Array)},string:function(obj){return(typeof(obj)=='string')},number:function(obj){return(typeof(obj)=='number')},bool:function(obj){return(typeof(obj)=='boolean')},func:function(obj){return(typeof(obj)=='function')},regexp:function(obj){return(typeof(obj)=='object'&&obj instanceof RegExp)}},alert:function(message){if(alert.caller!==alert){devToolz.alert(devToolz.dump(message));return};if(this.date.elapsedTime(this.lastAlertTime)<this.alertTimeOut)devToolz.alertCount++;else{devToolz.alertCount=0;devToolz.alertFreeze=false};if(devToolz.alertFreeze){devToolz.lastAlertTime=devToolz.date.now();return};if(devToolz.alertCount>=devToolz.maxAlerts){if(!confirm('Продолжить показ всплывающих окон?')){devToolz.alertFreeze=true}else devToolz.alertCount=0};if(devToolz.alertCount<devToolz.maxAlerts){devToolz.alertFunc.call(window,message)};devToolz.lastAlertTime=devToolz.date.now()}};
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
		           test: vkPatch.settings.create().def(0).min(0).max(150).category('interface').done(),
		           stringParam: vkPatch.settings.create().def('test string').category('interface').done(),
		           stringParam2: vkPatch.settings.create().def('Тестовая строка').category('interface').done(),
		           boolTestParam: vkPatch.settings.create().def(true).category('interface').done(),
		           boolTestParam2: vkPatch.settings.create().def(false).category('interface').done(),
		           test2: vkPatch.settings.create().def(0).min(0).max(150).category('interface').done(),
		           list: vkPatch.settings.create().def('two').list(['one','two','tree','more']).category('interface').done(),
		           list2: vkPatch.settings.create().def('more5').list(['one1','two3','tree4','more5','exists','mgahah','test','ops','again']).category('myCat').done(),
		           obj: vkPatch.settings.create().def({}).done()
		},
		
		lang:
		{
			settings: {
				test: ['название параметра','Описание'],
				stringParam: ['Строковой параметр','Описание, может быть очччееннь длиинныныым'],
				stringParam2: 'Второй строковой параметр',
				boolTestParam: ['Булевый','Описание, мblab lablablalsl ожет быть очччееннь длиинныныым'],
				boolTestParam2: ['Булевый','Описание, мblab lablablalsl ожет быть очччееннь длиинныныым'],
				test2: ['название параметра','Описание'],
				list: ['Список всяких-там',{one:'Первый',two:'Второй',more:'Ещё...'}]
			},
			categories: {
				myCat: 'Категориияя'
			},
			
			tabTitle: 'В +'  /* сумма (&#8512;), звёздочка (&#9733;), молоточки (&#9874;) */,
			saved: 'Настройки сохранены'
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
		 * Активируем вкладку
		 */
		activateTab: function()
		{

			// активируем вкладку
			vkPatch.iface.activateTab(this.tab);
			
			
			/*
			 *	Устанавливаем переменные, необходимые для отображения
			 *	выпадающего меню 
			 */
			
			_window['pp_options'] = {};
			_window['pp_selected'] = {};
			//_window['pp_advanced_friends'] = {};
			//_window['dp_checked'] = {};
			_window['friends_lists'] = {};
			//_window['savePrivacy'] = function(){};
			
			_window['js_fr_cnt'] = 0;
			
			
			
			// подключаем стили
			vkPatch.page.requireCSS(['http://vkontakte.ru/css/ui_controls.css','http://vkontakte.ru/css/privacy.css']);
			// и скрипты интерфейса
			// после подключения всех скриптов выполнится колбек - this.showTabContent
			vkPatch.page.requireScript(['http://vkontakte.ru/js/lib/ui_controls.js','http://vkontakte.ru/js/friends.js','http://vkontakte.ru/js/privacy.js'],jQuery.proxy(this.showTabContent,this));
					
		},
		/*
		 * Содержимое вкладки
		 */
		showTabContent: function()
		{
			

			/*
			 *  Колбек, который вызывается при выборе элемента списка
			 *  Получаем индекс варианта и устанавливаем по нему значение
			 */
			_window.ppCallback = function(pp_tag, index)
			{
				// получаем значение по индексу
				var value = vkPatch.settings.container[pp_tag].list[index];
				// устанавливаем в скрытое поле
				$('#'+pp_tag).val(value);
			};
			

			
			
			this.tabContent = $('#content > div.editorPanel').empty().append('<form mathod="get" action="#" name="vkPatchSettings" id="vkPatchSettings"></form>').find('form');
			
			
			for (var categoryName in vkPatch.settings.categories)
			{
				if (!vkPatch.settings.categories.hasOwnProperty(categoryName)) continue;
				
				// пропускаем скрытые настройки
				if (categoryName == 'hidden') continue;
				
				var category = vkPatch.settings.categories[categoryName];

				if (category.length > 0)
				{
					this.tabContent.append('<div class="settingsPanel"><h4 style="padding-top: 20px;">'+vkPatch.lang.categories[categoryName]+'</h4></div>');
				}
				
				for (var i=0; i < category.length; i++)
				{
					var option = category[i];
					var type = option.getType();
					
					switch (type)
					{
						case vkPatch.settings.TYPE_STRING:
							
							this.stringParam(option);
							
							break;
							
						case vkPatch.settings.TYPE_BOOL:
							
							this.booleanParam(option);
							
							break;
							
						case vkPatch.settings.TYPE_INT:
						case vkPatch.settings.TYPE_FLOAT:
							
							this.numberParam(option);
							
							break;
							
						case vkPatch.settings.TYPE_LIST:
								
							this.listParam(option);
							
							break;
					};
					
				}
				
			};
			
			
			// Кнопка "сохранить"
			this.tabContent.append(
					$('<div class="buttons"></div>').append(
								vkPatch.iface.newButton('Сохранить', jQuery.proxy(this.save,this))
					)
				);
			
		},
		
		/*
		 * Сохранение параметров
		 */
		
		save: function()
		{
			var serializedForm = $('#vkPatchSettings').serializeArray();

			for (var i=0; i<serializedForm.length; i++)
			{
				vkPatch.settings.container[serializedForm[i].name].set(serializedForm[i].value);
				$('#'+serializedForm[i].name).val(vkPatch.settings.container[serializedForm[i].name].get());
			}

			
			// Выводим сообщение
			$('#messageWrap').remove();	// удаляем старое
			vkPatch.iface.newInlineMessage(this.lang.saved).insertBefore('#content > div.editorPanel');
			$(_window).scrollTop(0);
		},
		
		/*
		 * Строковой параметр
		 */
		stringParam: function(option)
		{
			var title = option.title;
			var desc = option.desc ? '<br><small style="color:#777">'+option.desc+'</small>' : '';
			
			this.tabContent.append('<div class="label">'+title+':</div><div class="labeled_small"><input type="text" class="inputText" id="'+option.name+'" name="'+option.name+'" value="'+option.get()+'" />'+desc+'</div>');
		},
		
		/*
		 * Булевский параметр
		 */
		booleanParam: function(option)
		{
			//this.tabContent.append('<div class="serviceChecks" style="display: inline-block"><div class="serviceCheck"><input type="hidden" id="'+option.name+'" name="'+option.name+'" /></div></div>');
				
			// Добавляем строку параметра
			this.tabContent.append('<div class="label">'+option.title+':</div><div class="labeled_small"><input type="hidden" id="'+option.name+'" name="'+option.name+'" /></div>');
			
			var desc = option.desc ? '<small style="color:#777">'+option.desc+'</small>' : '';
			
			// Функцией ВКонтакте, преобразуем флажок
			new _window.Checkbox(_window.ge(option.name), {checked: option.get(), label: desc,  onChange: function() { }});
						
			// Подправляем стили флажка
			this.tabContent.find('div.checkbox_container:last').children('table').css({marginTop:'3px'})
															.find('td.checkbox').css({verticalAlign: 'top'}).end();

		},
		
		/*
		 * Число
		 */
		numberParam: function(option)
		{
			// Поле выглядит так-же, как и строковой параметр
			this.stringParam(option);
		},
		
		
		/*
		 * Список
		 */
		listParam: function(option)
		{
			// Выбранный вариант
			var selected = option.get();
			// Название выбранного варианта
			var selected_title = selected;
			var selected_index = 0;
			
			
			
			var desc = [];
			
			// Если не определены описания
			if (option.desc === null)
			{
				option.desc = {};
			}

			// получаем названия вариантов
			for (var i=0; i<option.list.length; i++)
			{
				// Из описания или если нет, то берём просто имя
				var title = option.desc[option.list[i]] || option.list[i];
				
				
				desc.push(title);
				
				// Нашли выбранный
				if (option.list[i] == selected)
				{
					selected_index = i;
					selected_title = title;
				}
			}
		
			
			this.tabContent.append('<div class="label">'+option.title+':</div><div class="labeled_small" style="padding-top: 9px;"><a id="pp_'+option.name+'" style="cursor: pointer;" onclick="ppShow(\''+option.name+'\');">'+selected_title+'</a><span id="pp_custom_'+option.name+'"></span></div><input type="hidden" id="'+option.name+'" name="'+option.name+'" />');
			_window.pp_options[option.name] = desc;
			_window.pp_selected[option.name] = selected_index;
				
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
			 * version: 2.1 (2009-08-14)
			 *
			 * This document is licensed as free software under the terms of the
			 * MIT License: http://www.opensource.org/licenses/mit-license.php
			 *
			 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
			 * website's http://www.json.org/json2.js, which proclaims:
			 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
			 * I uphold.
			 *
			 * It is also influenced heavily by MochiKit's serializeJSON, which is 
			 * copyrighted 2005 by Bob Ippolito.
			 */
			(function($){$.toJSON=function(o){if(typeof(JSON)=='object'&&JSON.stringify)return JSON.stringify(o);var type=typeof(o);if(o===null)return"null";if(type=="undefined")return undefined;if(type=="number"||type=="boolean")return o+"";if(type=="string")return $.quoteString(o);if(type=='object'){if(typeof o.toJSON=="function")return $.toJSON(o.toJSON());if(o.constructor===Date){var month=o.getUTCMonth()+1;if(month<10)month='0'+month;var day=o.getUTCDate();if(day<10)day='0'+day;var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10)hours='0'+hours;var minutes=o.getUTCMinutes();if(minutes<10)minutes='0'+minutes;var seconds=o.getUTCSeconds();if(seconds<10)seconds='0'+seconds;var milli=o.getUTCMilliseconds();if(milli<100)milli='0'+milli;if(milli<10)milli='0'+milli;return'"'+year+'-'+month+'-'+day+'T'+hours+':'+minutes+':'+seconds+'.'+milli+'Z"'}if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++)ret.push($.toJSON(o[i])||"null");return"["+ret.join(",")+"]"}var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number")name='"'+k+'"';else if(type=="string")name=$.quoteString(k);else continue;if(typeof o[k]=="function")continue;var val=$.toJSON(o[k]);pairs.push(name+":"+val)}return"{"+pairs.join(", ")+"}"}};$.evalJSON=function(src){if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);return eval("("+src+")")};$.secureEvalJSON=function(src){if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))return eval("("+src+")");else throw new SyntaxError("Error parsing JSON, source is not valid.");};$.quoteString=function(string){if(string.match(_escapeable)){return'"'+string.replace(_escapeable,function(a){var c=_meta[a];if(typeof c==='string')return c;c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+string+'"'};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'}})(jQuery);
			
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
		},
		
		/*
		 * Подключить внешний скрипт
		 * url - адрес внешнего скрипта, или массив адресов
		 * callback - функция, выполяющаяся после загрузки и выполнения скриптов
		 */
		// список подключённых скриптов, чтобы не загружать дважды
		connectedScripts: [],
		
		requireScript: function(url,callback)
		{
			callback = callback || function(){};
			
			// если первым параметром передан массив, то последовательно подключаем все скрипты
			if ($$.is.array(url))
			{
				// запоминаем колбек
				var _callback = callback;
				
				var _urls = url;
				// подключаем первый из списка
				url = _urls.shift();

				// Если ещё остался неподключённый, то меняем колбек для продолжения цепочки
				if (_urls.length > 0)
				{
					callback = function() {vkPatch.page.requireScript(_urls,_callback)};
				};
				
			};

			// если скрипт уже подключён вручную
			if ($$.exists(vkPatch.page.connectedScripts, url))
			{
				callback()
			}
			else		// иначе ищем его в head
			{
				
				// Просматриваем подключённые скрипты
				var scripts = $('head script');
				// Паттерн для проверки аттрибута src
				var pattern = new RegExp('^'+url);
				
				var found = false;
				for(var i=0; i<scripts.length; i++)
				{
					if (pattern.test(scripts.get(i).src))
					{
						var found = true;
						break;
					}
				}
				
				// если он был изначально подключён в head
				if (found)
				{
					callback();
				}
				else	// если не был, то подключаем и ждём
				{
					vkPatch.console('load script: ');

					//jQuery.getScript(url,callback);
					
					/*
					 * Копипаст с jQuery
					 * Если использовать jQuery.getScript или jQuery.ajax, то возникает проблема:
					 * если скрипт находится на vkontakte.ru, то он считается не удалённым (remote = false) и его подключение
					 * jQuery делает по схеме: скачать, создать тег <script>, записать в тело script содержимое скрипта
					 * но скрипт получен в битой кодировке, и поэтому может выполняться с ошибками
					 * Это копипаст метода подключения удалённых скриптов, в этои случае браузеры корректно понимают кодировку
					 */
					var head = document.getElementsByTagName("head")[0] || document.documentElement;
					var script = document.createElement("script");
					
					script.src = url;
					
					var done = false;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function() {
						if ( !done && (!this.readyState ||
								this.readyState === "loaded" || this.readyState === "complete") ) {
							done = true;
							
							callback();
							
							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;
							if ( head && script.parentNode ) {
								head.removeChild( script );
							}
						}
					}
					
					head.insertBefore( script, head.firstChild );

				}
				
				vkPatch.page.connectedScripts.push(url);
			}
		},

		
		/*
		 * Подключение внешних css
		 * url - адрес стилевого файла или массив адресов
		 */
		connectedCSS: [],
		requireCSS: function(url)
		{
			// Если массив, то перебираем его
			if ($$.is.array(url))
			{
				for(var i=0; i<url.length; i++)
				{
					vkPatch.page.requireCSS(url[i]);
				};
				return;	// и выходим
			};
			
			if (!$$.exists(vkPatch.page.connectedCSS, url))
			{
				var styles = $("head link[type='text/css']");
				
				// Паттерн для проверки аттрибута src
				var pattern = new RegExp('^'+url);
				
				var found = false;
				for(var i=0; i<styles.length; i++)
				{
					if (pattern.test(styles.get(i).href))
					{
						var found = true;
						break;
					}
				}
				
				// подключаем стиль
				if (!found)
				{
					$('<link type="text/css" href="'+url+'" rel="stylesheet">').appendTo('head');
				}
				
				vkPatch.page.connectedCSS.push(url);
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
		 * Типы параметров
		 */
		
		TYPE_BOOL: 'bool',			// булево
		TYPE_STRING: 'string',
		TYPE_INT: 'int',
		TYPE_FLOAT: 'float',
		TYPE_LIST: 'list',			// набор
		TYPE_OBJECT: 'object',		// объект. нет проверок
		
		
		/*
		 * Категории.
		 * Контейнер, содержащий все параметры, разбитые на категории, для удобного представления
		 * hidden - категория по-умолчанию
		 */
		categories: {},
				
		
		/*
		 * Контейнер всех параметров 
		 */
		container: {},
		
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
				list: null,

				
				// название и описание
				title: null,
				desc: null,
				
				/*
				 * Чтение параметра из памяти
				 */
				get: function()
				{
					var value = vkPatch.storage.get(this.name);
					
					if (value === null)
					{
						return this.def;
					};
					
					var result_value = this.def;
					/*
					 * Требуемый тип значения узнаём по типу значения по-умолчанию
					 */
					var type = this.getType();
					
					switch(type)
					{
						case vkPatch.settings.TYPE_BOOL:
							
							result_value = (value == true);
							
							break;
						
						case vkPatch.settings.TYPE_INT:
						case vkPatch.settings.TYPE_FLOAT:
							
							var temp_value;
							/*
							 * Пытаемся получить число, в зависимости от типа
							 */
							if (type == vkPatch.settings.TYPE_FLOAT)
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
							
							break;
							
						case vkPatch.settings.TYPE_LIST:

							if ($$.exists(this.list,value))
							{
								result_value = value;
							}
							else
							{
								result_value = this.def;
							};
							
							break;
							
						case vkPatch.settings.TYPE_STRING:
							
							result_value = '' + value;
							
							break;
							
						default:
							
							result_value = value;
					}
					
					return result_value;
				},
				
				/*
				 * Сохранине параметра в памяти
				 */
				set: function(value)
				{
					// сохраниние
					vkPatch.storage.set(this.name, value);				
				},
				
				/*
				 * Определение типа
				 */
				getType: function()
				{
					if ($$.is.bool(this.def))				 /* булево */
					{
						return vkPatch.settings.TYPE_BOOL;
					}				
					else if ($$.is.number(this.def))		/* число */
					{
						
						if (this.isFloat)
						{
							return vkPatch.settings.TYPE_FLOAT;			/* с плавающей точкой */
						}
						else
						{
							return vkPatch.settings.TYPE_INT;			/* целое */
						};

					}
					else if(this.list !== null) /* набор */
					{
						return vkPatch.settings.TYPE_LIST;	/* набор */
					}
					else if($$.is.string(this.def))
					{
						return vkPatch.settings.TYPE_STRING;	/* строка */
					}
					else		/* объект */
					{
						return vkPatch.settings.TYPE_OBJECT;
					}
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
			
			this.category = function(category)
			{
				node.category = category;
				return this;
			};
			
			this.list = function(list)
			{
				node.list = list;
				return this;
			}
			
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
		},
		
		/*
		 * Добавляем параметры к спискам
		 */
		add: function(option)
		{
			/*
			 * Добавляем в соответствующую категорию
			 */
			// создаём, если не существует
			if (!vkPatch.settings.categories.hasOwnProperty(option.category))
			{
				vkPatch.settings.categories[option.category] = [];
			}
			// добавляем
			vkPatch.settings.categories[option.category].push(option);

			// и в контейнер
			vkPatch.settings.container[option.name] = option;
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
			 * Устанавливаем имя в описания параметров плагинов
			 * Оно состоит из имени_плагина-имя_параметра
			 */
			for (var optionName in plugin.settings)
			{
				if (plugin.settings.hasOwnProperty(optionName))
				{
					var option = plugin.settings[optionName];
					
					
					option.name = plugin.name + '-' + optionName;
					
					// Описание параметра
					// Может быть строкой (название) или массивом (название, описание)
					// Если в lang плагина не найдено, то принимаем просто имя
					var desc = plugin.lang.settings[optionName] || option.name;
					
					option.title = typeof(desc) == 'string' ? desc : desc[0];
					option.desc = typeof(desc) == 'string' ? null : desc[1];
					
					
					// добавляем к списку в vkPatch
					vkPatch.settings.add(option);
				};
			};
			
			
			
			/*
			 * Получаем локализации
			 */
			
			if (plugin.lang.hasOwnProperty('categories'))
			{
				for (var i in plugin.lang.categories)
				{
					if (plugin.lang.categories.hasOwnProperty(i))
					{
						vkPatch.lang.categories[i] = plugin.lang.categories[i];
					}
				}
			}
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
		},
		
		/*
		 * Создание кнопка
		 * label - Надпись
		 * [action] - onclick действие
		 * @return jQuery-объект
		 */
		newButton: function(label, action)
		{
			var button = $('<ul class="nNav"><li><b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b><span class="ncc"><a href="javascript:void(0)">'+label+'</a></span><b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b></li></ul>');
			if (action)
			{
				button.find('a').click(action);
			}
			return button;
		},
		
		/*
		 * Рамка с сообщением
		 * @return jQuery-объект
		 */
		newInlineMessage: function(message)
		{
			return $('<div id="messageWrap"><div style="margin: 0px;" class="msg">'+message+'</div></div>');
		},
		
		/*
		 * Рамка с сообщением об ошибке
		 * @return jQuery-объект
		 */
		newInlineError: function(message)
		{
			return $('<div id="messageWrap"><div style="margin: 0px;" id="error">'+message+'</div></div>');
		}
	},
	
	
	
	console_browser: function(){},
	console: function(mess) {
		vkPatch.console_browser(mess);
	},
	
	lang:
	{
		categories:
		{
			main: 'Основные',
			interface: 'Интерфейс'
		}
	}

};


window.setTimeout(jQuery_wait,10);