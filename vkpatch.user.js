// ==UserScript==
// @name           vkPatch
// @namespace      
// @description    Расширение функционала ВКонтакте.ру
// @include        http://vkontakte.ru/*
// ==/UserScript==
// Author: Сергей Третьяк
// Version: 6
// Site: klinifini.livejournal.com


/**
 * vkPatch
 */
var vkPatch = 
{
	
	init: function()
	{
		vkPatch.load.step0();
	},
	
	/**
	 * Процессы инициализации vkPatch
	 */
	load: 
	{
		step0: function()
		{
			
			_window = window;
			if (typeof(unsafeWindow) != 'undefined')
			{
				_window = unsafeWindow;
				window = _window;
				document = _window.document;
			};	
		
		
			/*
			 * В IE7Pro скрипт выполняется заново, при смене hash (#list).
			 * Чтобы это предотвратить, при первом выполнении устанавливаем переменную в window
			 * а если она уже была, что значит что скрипт выполняется повторно для текущего окна, то завершаем выполнение
			 */
			if(_window.vkPatchExecuted)
			{
				return;
			};
			_window.vkPatchExecuted = true;

			/*
			 * Определяем, является ли текущая страница, страницей контакта. Это может быть полем редактирования заметки, например.
			 * Если нет, то прекращаем выполнение vkPatch
			 */
			if (! (document.getElementById('vkontakte') && document.getElementById('vkontakte').tagName.toUpperCase() == 'HTML'))
			{
				return;
			};

			
			/*
			 * devToolz 0.2.1
			 * расширение объектов
			 */
			var devToolz=_=new(function(){var maxAlerts=5,alertTimeOut=1000,lastAlertTime=0,alertCount=0,alertFreeze=false,alertFunc=alert,self=this;var getNormalizeKeysFunc=function(obj){return self.isArray(obj)?function(value){return Number(value)}:function(value){return value};};this.replaceAlert=function(){window.alert=self.alert;return this;};this.repeat=function(str,n){var s='';while(n>0){s+=str;n--}return s};this.isEqual=function(a,b){if(a===b)return true;if(self.isNumber(a)&&self.isNumber(b)){return a.toString()==b.toString();};if(self.isString(a)&&self.isString(b)){return a==b;};if(self.isBoolean(a)&&self.isBoolean(b)){return a.valueOf()==b.valueOf();};if(self.isFunction(a)&&self.isFunction(b)){return a.toString()==b.toString();};if(typeof(a)!=typeof(b))return false;if(a==b)return true;if((!a&&b)||(a&&!b))return false;if(typeof(a.length)!=='undefined'&&(a.length!==b.length))return false;if(self.keys(a).length!=self.keys(b).length)return false;for(var key in a){if(!(key in b)||!self.isEqual(a[key],b[key])){return false;}}return true;};this.exists=function(obj,needle){for(var i in obj){if(self.isEqual(obj[i],needle))return true};return false};this.indexOf=this.keyOf=function(obj,needle,context){var decorateValueFunc=getNormalizeKeysFunc(obj);var findVal=needle;var testFunc=self.isFunction(needle)?needle:function(value,key,obj){return self.isEqual(value,findVal)};for(var i in obj){if(testFunc.call(context,obj[i],i,obj)){return decorateValueFunc(i);}};return null;};this.indexesOf=this.keysOf=function(obj,needle,context){var result=[];var normalizeKeyFunc=getNormalizeKeysFunc(obj);var findVal=needle;var testFunc=self.isFunction(needle)?needle:function(value,key,obj){return self.isEqual(value,findVal)};for(var i in obj){if(testFunc.call(context,obj[i],i,obj)){result.push(normalizeKeyFunc(i));}};return result};this.subtract=function(obj,subtr){var result;if(typeof(obj)=='string'&&typeof(subtr)=='string')return obj.replace(new RegExp(subtr,'g'),'');if(typeof(obj)=='number'&&typeof(subtr)=='number')return obj-subtr;if(self.isArray(obj)&&self.isArray(subtr)){result=[];for(var i=0;i<obj.length;i++){if(!self.exists(subtr,obj[i])){result.push(obj[i])}};return result}result=self.clone(obj);for(var i in obj){if(typeof(subtr[i])!='undefined'&&self.isEqual(obj[i],subtr[i]))delete(result[i])};return result};this.filter=function(obj,element,funcResult){var result,func,addItemFunc;funcResult=typeof(funcResult)=='undefined'?true:funcResult;if(typeof(obj)=='string'&&typeof(element)=='string')return obj.replace(new RegExp(element,'g'),'');if(typeof(obj)=='number'&&typeof(element)=='number')return obj-element;if(self.isFunction(element)){func=element;}else{var el=element;func=function(item){return self.isEqual(el,item);}};result=self.newLike(obj);if(self.isArray(obj)){addItemFunc=function(item){result.push(item)};}else{addItemFunc=function(item,key){result[key]=item};};self.each(obj,function(item,key){if(func(item,key,obj)==funcResult){addItemFunc(item,key);}});return result;};this.remove=function(obj,element){return self.filter(obj,element,false);};this.removeAt=this.removeWith=function(obj,keys){if(self.isString(keys)||self.isNumber(keys)){keys=[keys];};if(self.isArray(obj)){keys.sort(function(left,right){return left==right?0:left<right?1:-1;});};var deleteFunc=self.isArray(obj)?function(obj,index){obj.splice(index,1);}:function(obj,key){delete obj[key];};var result=self.clone(obj);self.each(keys,function(key){deleteFunc(result,key);});return result;};this.dump=function(obj,maxdepth,level){maxdepth=typeof(maxdepth)=='undefined'?Number.POSITIVE_INFINITY:maxdepth;var level=level||0;if(level>=maxdepth){return obj.toString();};var result='';var space=self.repeat("    ",level);var node;if(typeof(obj)=='string'||typeof(obj)=='number'||typeof(obj)=='boolean')return obj;function formatNode(node){switch(typeof(node)){case'string':node="\u201C"+node+"\u201D";break;case'function':if(typeof(node.toSource)=='undefined'){node=node.toString()}else{node=node.toSource()};break;case'object':node=self.dump(node,maxdepth,level+1);break;default:node=node}return node}if(typeof(obj)=='object'&&obj instanceof Array){for(var i=0;i<obj.length;i++)result+="\n"+space+i+': '+formatNode(obj[i])}else{for(var i in obj){if(!obj.hasOwnProperty(i)){continue};result+="\n"+space+'['+i+']: '+formatNode(obj[i])}};if(level==0){result=result.substr(1)};return result};this.clone=function(obj){if(typeof(obj)=='number'||typeof(obj)=='string'||typeof(obj)=='function'||typeof(obj)=='boolean')return obj;if(self.isArray(obj))return obj.slice();var result=self.newLike(obj);for(var i in obj){if(!obj.hasOwnProperty(i))continue;result[i]=obj[i];};return result};this.newLike=function(obj){if(self.isArray(obj)){return[];}else{var constr=function(){};constr.prototype=obj.constructor.prototype;result=new constr();return result;}};this.breaker={};this.each=function(obj,iterator,context){var args=Array.prototype.slice.call(arguments,3);args.unshift(null,null,obj);var normalizeKeyFunc=getNormalizeKeysFunc(obj);for(var i in obj){if(!obj.hasOwnProperty(i)){continue};args[0]=obj[i];args[1]=normalizeKeyFunc(i);var result=iterator.apply(context,args);if(result===self.breaker){break;}};};this.map=function(obj,iterator,context){var args=Array.prototype.slice.call(arguments,3);args.unshift(null,null,obj);var normalizeKeyFunc=getNormalizeKeysFunc(obj);var result=self.newLike(obj);self.each(obj,function(item,key,obj){args[0]=item;args[1]=normalizeKeyFunc(key);result[key]=iterator.apply(context,args);},context);return result;};this.withKey=function(arr,key){var result=[];self.each(arr,function(item){result.push(item[key]);});return result;};this.values=function(obj){var result=[];self.each(obj,function(item){result.push(item);});return result;};this.keys=function(obj){var result=[];var normalizeKeyFunc=getNormalizeKeysFunc(obj);self.each(obj,function(item,key){result.push(normalizeKeyFunc(key));});return result;};this.sortBy=function(arr,criteria,context){var result=self.clone(arr);var reverseFlag='!';if(self.isString(criteria)){criteria=[criteria];};if(self.isArray(criteria)){var props=criteria;result.sort(function(left,right){for(var i=0;i<props.length;i++){var propName=props[i];var direction=1;if(propName.charAt(0)==reverseFlag){propName=propName.substr(1);direction=-1;};if(left[propName]>right[propName])return 1*direction;if(left[propName]<right[propName])return -1*direction;};return 0;});return result;}else{var iterator=criteria;var objects=self.map(result,function(item,key){return{criteria:iterator.call(context,item,key,arr),value:item};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;});return _.withKey(objects,'value');}};this.date={now:function(){return(new Date().getTime())},elapsedTime:function(old,now){now=now||self.date.now();return(now-old)}};this.isArray=function(obj){return(typeof(obj)=='object'&&obj instanceof Array)};this.isString=function(obj){return(typeof(obj)=='string'||(typeof(obj)=='object'&&obj instanceof String))};this.isNumber=function(obj){return(typeof(obj)=='number'||(typeof(obj)=='object'&&obj instanceof Number))};this.isBoolean=function(obj){return(typeof(obj)=='boolean'||(typeof(obj)=='object'&&obj instanceof Boolean))};this.isFunction=function(obj){return(typeof(obj)=='function')};this.isRegExp=function(obj){return(typeof(obj)=='object'&&obj instanceof RegExp)};this.alert=function(message,maxdepth){message=self.dump(message,maxdepth);if(self.date.elapsedTime(lastAlertTime)<alertTimeOut)alertCount++;else{alertCount=0;alertFreeze=false};if(alertFreeze){lastAlertTime=self.date.now();return};if(alertCount>=maxAlerts){if(!confirm('Продолжить показ всплывающих окон?')){alertFreeze=true}else alertCount=0};if(alertCount<maxAlerts){alertFunc.call(window,message)};lastAlertTime=self.date.now()};})();
	
			// Подмена алерта
			devToolz.replaceAlert();
			
			/*
			 * Подключение jQuery
			 */
			vkPatch.page.requireScript('http://code.jquery.com/jquery-1.4.2.min.js',vkPatch.load.step1);
		},
		
		/**
		 * Подключаем необходимые плагины jQuery
		 */
		step1: function()
		{
			console.log('step1');
			/*
			 * Определяем jQuery
			 */
		
			jQuery = _window.jQuery;
			$ = jQuery;
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
						
			
			/**
			 * jQuery.Rule - Css Rules manipulation, the jQuery way.
			 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
			 * Dual licensed under MIT and GPL.
			 * Date: 02/27/2008
			 * @author Ariel Flesler
			 * @version 1.0.1
			 */
			(function($){var storageNode=$('<style rel="alternate stylesheet" type="text/css" />').appendTo('head')[0],sheet=storageNode.sheet?'sheet':'styleSheet',storage=storageNode[sheet],rules=storage.rules?'rules':'cssRules',remove=storage.deleteRule?'deleteRule':'removeRule',owner=storage.ownerNode?'ownerNode':'owningElement',reRule=/^([^{]+)\{([^}]*)\}/m,reStyle=/([^:]+):([^;}]+)/;storage.disabled=true;var $rule=$.rule=function(r,c){if(!(this instanceof $rule))return new $rule(r,c);this.sheets=$rule.sheets(c);if(r&&reRule.test(r))r=$rule.clean(r);if(typeof r=='object'&&!r.exec)return this.setArray(r.get?r.get():r.splice?r:[r]);this.setArray(this.sheets.cssRules().get());return r?this.filter(r):this};$.extend($rule,{sheets:function(c){var o=c;if(typeof o!='object')o=$.makeArray(document.styleSheets);o=$(o).not(storage);if(typeof c=='string')o=o.ownerNode().filter(c).sheet();return o},rule:function(str){if(str.selectorText)return['',str.selectorText,str.style.cssText];return reRule.exec(str)},appendTo:function(r,ss,skip){switch(typeof ss){case'string':ss=this.sheets(ss);case'object':if(ss[0])ss=ss[0];if(ss[sheet])ss=ss[sheet];if(ss[rules])break;default:if(typeof r=='object')return r;ss=storage}var p;if(!skip&&(p=this.parent(r)))r=this.remove(r,p);var rule=this.rule(r);if(ss.addRule)ss.addRule(rule[1],rule[2]||';');else if(ss.insertRule)ss.insertRule(rule[1]+'{'+rule[2]+'}',ss[rules].length);return ss[rules][ss[rules].length-1]},remove:function(r,p){p=p||this.parent(r);if(p!=storage){var i=p?$.inArray(r,p[rules]):-1;if(i!=-1){r=this.appendTo(r,0,true);p[remove](i)}}return r},clean:function(r){return $.map(r.split('}'),function(txt){if(txt)return $rule.appendTo(txt+'}')})},parent:function(r){if(typeof r=='string'||!$.browser.msie)return r.parentStyleSheet;var par;this.sheets().each(function(){if($.inArray(r,this[rules])!=-1){par=this;return false}});return par},outerText:function(rule){return!rule?'':[rule.selectorText+'{','\t'+rule.style.cssText,'}'].join('\n').toLowerCase()},text:function(rule,txt){if(txt!==undefined)rule.style.cssText=txt;return!rule?'':rule.style.cssText.toLowerCase()}});$rule.fn=$rule.prototype={pushStack:function(rs,sh){var ret=$rule(rs,sh||this.sheets);ret.prevObject=this;return ret},end:function(){return this.prevObject||$rule(0,[])},filter:function(s){var o;if(!s)s=/./;if(s.split){o=$.trim(s).toLowerCase().split(/\s*,\s*/);s=function(){return!!$.grep(this.selectorText.toLowerCase().split(/\s*,\s*/),function(sel){return $.inArray(sel,o)!=-1}).length}}else if(s.exec){o=s;s=function(){return o.test(this.selectorText)}}return this.pushStack($.grep(this,function(e,i){return s.call(e,i)}))},add:function(rs,c){return this.pushStack($.merge(this.get(),$rule(rs,c)))},is:function(s){return!!(s&&this.filter(s).length)},not:function(n,c){n=$rule(n,c);return this.filter(function(){return $.inArray(this,n)==-1})},append:function(s){var rules=this,rule;$.each(s.split(/\s*;\s*/),function(i,v){if((rule=reStyle.exec(v)))rules.css(rule[1],rule[2])});return this},text:function(txt){return!arguments.length?$rule.text(this[0]):this.each(function(){$rule.text(this,txt)})},outerText:function(){return $rule.outerText(this[0])}};$.each({ownerNode:owner,sheet:sheet,cssRules:rules},function(m,a){var many=a==rules;$.fn[m]=function(){return this.map(function(){return many?$.makeArray(this[a]):this[a]})}});$.fn.cssText=function(){return this.filter('link,style').eq(0).sheet().cssRules().map(function(){return $rule.outerText(this)}).get().join('\n')};$.each('remove,appendTo,parent'.split(','),function(k,f){$rule.fn[f]=function(){var args=$.makeArray(arguments),that=this;args.unshift(0);return this.each(function(i){args[0]=this;that[i]=$rule[f].apply($rule,args)||that[i]})}});$.each(('each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,'+'queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo').split(','),function(k,f){$rule.fn[f]=$.fn[f]});$rule.fn.setArray=function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this};var curCSS=$.curCSS;$.curCSS=function(e,a){return('selectorText'in e)?e.style[a]||$.prop(e,a=='opacity'?1:0,'curCSS',0,a):curCSS.apply(this,arguments)};$rule.cache={};var mediator=function(original){return function(elm){var id=elm.selectorText;if(id)arguments[0]=$rule.cache[id]=$rule.cache[id]||{};return original.apply($,arguments)}};$.data=mediator($.data);$.removeData=mediator($.removeData);$(window).unload(function(){$(storage).cssRules().remove()})})(jQuery);
			
			
			vkPatch.load.step2();
		},
		
		/**
		 * Инициализация модулей vkPatch и выполнение
		 */
		step2: function()
		{
			console.log('step2');
			// Определение страницы
			vkPatch.page.get();
	
			// Определение браузера и задание специфичный параметров
			vkPatch.browser.determine();
			_window.onhashchange = vkPatch.page.hashchangeHandler;
			window.onhashchange = function() {alert('change')}
			
			vkPatch.plugins.init();
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
		hash: location.hash,
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
			if (_.isArray(url))
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
			if (_.exists(vkPatch.page.connectedScripts, url))
			{
				callback()
			}
			else		// иначе ищем его в head
			{
				
				// Просматриваем подключённые скрипты
				var scripts = document.getElementsByTagName('script');
				// Паттерн для проверки аттрибута src
				var pattern = new RegExp('^'+url);
				
				var found = false;
				for(var i=0; i<scripts.length; i++)
				{
					if (pattern.test(scripts[i].src))
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
					 * Это копипаст метода подключения удалённых скриптов, в этом случае браузеры корректно понимают кодировку
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
			if (_.isArray(url))
			{
				for(var i=0; i<url.length; i++)
				{
					vkPatch.page.requireCSS(url[i]);
				};
				return;	// и выходим
			};
			if (!_.exists(vkPatch.page.connectedCSS, url))
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
			
		},
		
		hashchangeHandler: function()
		{
			alert(location.hash);
			$(this).trigger('hashchange',[location.hash]);
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

							if (_.exists(this.list,value))
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
					if (_.isBoolean(this.def))				 /* булево */
					{
						return vkPatch.settings.TYPE_BOOL;
					}				
					else if (_.isNumber(this.def))		/* число */
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
					else if(_.isString(this.def))
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
			var value = localStorage.getItem(name);

			if (value !== null)
			{
				value = $.evalJSON(value);
			}
			return value;
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
		},
				
		/*
		 * Инициализация плагинов.
		 * Выполняется до выполнения, чтобы плагины были готовы
		 */
		init: function()
		{
			var plugin;
			for (var i=0; i<vkPatch.plugins.container.length; i++)
			{
				plugin = vkPatch.plugins.container[i];
								
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
					for (var j in plugin.lang.categories)
					{
						if (plugin.lang.categories.hasOwnProperty(j))
						{
							vkPatch.lang.categories[j] = plugin.lang.categories[j];
						}
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
				
				if (!_.isArray(plugin.page))
				{
					plugin.page = [plugin.page];
				};

				/*
				 * Определяем необходимость выполнения
				 */
				var mustRun = false;
				for (var j=0; j < plugin.page.length; j++)
				{
					var page = plugin.page[j];
					
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
					oldHandler = _window.onerror;
					_window.onerror = vkPatch.plugins.errorHandler;
					vkPatch.plugins.current = plugin;
					try
					{
						plugin.exec.call(plugin);
					}
					catch (err)
					{
						vkPatch.plugins.errorHandler(err.name + ': ' + err.message,null,'exception',null);
					}
					//_window.onerror = oldHandler
				};
					
			};
		},
		
		errorHandler: function(desc,page,line,chr)
		{
			alert('Error. Plugin ' + vkPatch.plugins.current.name + '. ' + desc + ', line: ' + line);
			vkpatch.console('Error. Plugin ' + vkPatch.plugins.current.name + '. ' + desc + ', line: ' + line);
			return true;
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
		 * href - href ссылки
		 */
		addTab:	function(text,target,href)
		{
			href = href || 'javascript:void(0)';
			target = $(target);
			var link = $('<a>').append( 
								$('<b>').addClass('tl1')
							 ).append( 
							 	$('<b>').addClass('tl2')
							 ).append(
							 	$('<b>').addClass('tab_word').html(text)
							 ).attr({href:href});
			
			var li = $('<li>').append(link).appendTo(target);
			
			
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
			var button = $('<ul class="nNav"><li style="padding-right: 7px"><b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b><span class="ncc"><a href="javascript:void(0)">'+label+'</a></span><b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b></li></ul>');
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
			iface: 'Интерфейс'
		}
	}
};

/**
 * Болванка модуля
 */
var module = {
		/**
		 * Описания
		 */
		name: 'name',
		title: 'Название',
		desc: 'Описание',
		settings: {
	
		},
		
		lang:
		{
			settings: {},
			categories: {}
			
		},
		
		page: '',
		

		exec: function()
		{
			
		}
};

/**
 * Модуль редактирования настроек
 */

vkPatch.plugins.add({	
	/**
	 * Описания
	 */
	name: 'settings',
	title: 'Настройки',
	desc: 'Конфигуратор vkPatch',
	
	settings: {

	},
	
	lang:
	{
		settings: {

		},
		
		categories: {},
		
		tabTitle: 			'В +'  /* сумма (&#8512;), звёздочка (&#9733;), молоточки (&#9874;) */,
		saved: 				'Настройки сохранены',
		nothingShow: 		'Нет параметров для отображения'
	},
	
	page: 'settings',
	

	exec: function()
	{
		this.tab = vkPatch.iface.addTab(this.lang.tabTitle, $('#content > div.tBar:eq(0) > ul'),this.settingsHash).click(jQuery.proxy(this.tabClickHandler,this));
		
		// Если в адресе есть #vkpath, то активируем вкладку
		this.checkHash();
	},
	
	// тег страницы настроек
	settingsHash: '#vkpatch',
	
	/**
	 * Содержание
	 */
	
	// ссылка на вкладку
	tab: null,
	
	// содержание вкладки
	tabContent: null,
	
	/*
	 * Активация вкладки по хешу
	 */
	checkHash: function()
	{
		if (location.hash == this.settingsHash)
		{
			this.activateTab();
		};
	},
	
	tabClickHandler: function(e,data)
	{
		// отменяем обработчик события поумолчанию
		// чтобы IE не брал страницу из кеша
		e.preventDefault();
		this.activateTab();
	},
	
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
		
		alert(a);
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
		

		// Удаляем сообщения
		$('#content > div > div.msg').parent().remove();
		// очищаем страницу и подготавливаем форму
		this.tabContent = $('#content > div.editorPanel').empty().append('<form mathod="get" action="#" name="vkPatchSettings" id="vkPatchSettings"></form>').find('form');
		
		// Нечего отображать
		var nothingShow = true;
		
		for (var categoryName in vkPatch.settings.categories)
		{
			if (!vkPatch.settings.categories.hasOwnProperty(categoryName)) continue;
			
			// пропускаем скрытые настройки
			if (categoryName == 'hidden') continue;
			
			nothingShow = false;
			
			var category = vkPatch.settings.categories[categoryName];

			if (category.length > 0)
			{
				this.tabContent.append('<div class="settingsPanel"><h4 style="margin-top: 10px;">'+vkPatch.lang.categories[categoryName]+'</h4></div>');
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
		
		if (nothingShow) 	/* нет параметров для отображения */
		{
			vkPatch.iface.newInlineMessage(this.lang.nothingShow).insertBefore('#content > div.editorPanel');
		}
		else
		{
			// Кнопка "сохранить"
			this.tabContent.append(
					$('<div class="buttons"></div>').append(
								vkPatch.iface.newButton('Сохранить', jQuery.proxy(this.save,this))
					)
				);
		}
		
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
		vkPatch.iface.newInlineMessage(this.lang.saved).insertBefore('#content > div.editorPanel')
		
		/* скрываем через заданный интервал */
			.delay(3000).slideUp('slow');
		// Прокручиваем страницу наверх
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
		};

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

vkPatch.plugins.add({
		/**
		 * Скачивание музыки
		 */
		name: 'audioSave',
		title: 'Скачивание музыки',
		desc: 'Добавляет кнопку для скачивания музыки',
		
		settings: {
	
		},
		
		lang:
		{
			settings: {},
			categories: {}
		},
		
		page: 'audio',
		

		exec: function()
		{
			this.updatePage();
		},
		
		updatePage: function()
		{
			var elements = $('#audios > div');
			var a = addCSSRule('.audioDownload');
			$(a).css('border','1px solid black');
			elements.find('div.duration').before('<div style="margin-left: 7px; padding-top: 0px;" class="duration"><img class="audioDownload" src="images/transpx2.png"></div>');
		}
});

vkPatch.init();