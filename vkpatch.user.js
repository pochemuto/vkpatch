﻿// ==UserScript==
// @name           vkPatch
// @namespace      
// @description    Расширение функционала ВКонтакте.ру
// @include        http://vkontakte.ru/*
// ==/UserScript==
// Author: Сергей Третьяк
// Site: klinifini.livejournal.com

/**
 * vkPatch
 */
var vkPatch = 
{
	
	init: function()
	{
		/**
		 * Версия vkPatch
		 * Эта строка используется для имён файлов при сборке, необходимо соблюдать формат
		 * Только одинарные кавычки! 
		 */
		vkPatch.version = '6.1.4';
		vkPatch.load.step0();
	},
	
	/**
	 * Выполнение в режиме отладки
	 */
	debug: false,
	
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
			 * Если установлена кука vkpatch_debug - в режиме отладки
			 */
			vkPatch.debug = (function(){
				var cookies = document.cookie.split(';');
				for ( var i=0; i<cookies.length; i++ )
				{
					if ( /^\s*vkpatch_debug=/.test(cookies[i]) )
					{
						return true;
					};
				};
				return false;
			})();
			
			/*
			 * В IE7Pro скрипт выполняется заново, при смене hash (#list).
			 * Чтобы это предотвратить, при первом выполнении устанавливаем переменную в window
			 * а если она уже была, что значит что скрипт выполняется повторно для текущего окна, то завершаем выполнение
			 */

			/*
			 * Определяем, является ли текущая страница, страницей контакта. Это может быть полем редактирования заметки, например.
			 * Если нет, то прекращаем выполнение vkPatch
			 */
//			if (! (document.getElementById('vkontakte') && document.getElementById('vkontakte').tagName.toUpperCase() == 'HTML'))
//			{
//				return;
//			};
			
			// абсолютный URL плагина
			vkPatch.extensionUrl = _window.vkpatchUrl;
			
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
			vkPatch.page.requireScript('http://code.jquery.com/jquery-1.5.1.min.js',vkPatch.load.step1);
		},
		
		/**
		 * Подключаем необходимые плагины jQuery
		 */
		step1: function()
		{
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
			new function(){var a={'browser':function(){return b.browser},'version':{'number':function(){return b.version.number},'string':function(){return b.version.string}},'OS':function(){return b.OS},'aol':function(){return b.aol},'camino':function(){return b.camino},'firefox':function(){return b.firefox},'flock':function(){return b.flock},'icab':function(){return b.icab},'konqueror':function(){return b.konqueror},'mozilla':function(){return b.mozilla},'msie':function(){return b.msie},'netscape':function(){return b.netscape},'opera':function(){return b.opera},'safari':function(){return b.safari},'chrome':function(){return b.chrome},'linux':function(){return b.linux},'mac':function(){return b.mac},'win':function(){return b.win}};$.browser=a;var b={'browser':'Unknown','version':{'number':undefined,'string':'Unknown'},'OS':'Unknown','aol':false,'camino':false,'firefox':false,'flock':false,'icab':false,'konqueror':false,'mozilla':false,'msie':false,'netscape':false,'opera':false,'safari':false,'chrome':false,'linux':false,'mac':false,'win':false};for(var i=0,ua=navigator.userAgent,ve=navigator.vendor,data=[{'name':'Safari','browser':function(){return/Apple/.test(ve)}},{'name':'Opera','browser':function(){return window.opera!=undefined}},{'name':'iCab','browser':function(){return/iCab/.test(ve)}},{'name':'Konqueror','browser':function(){return/KDE/.test(ve)}},{'identifier':'aol','name':'AOL Explorer','browser':function(){return/America Online Browser/.test(ua)},'version':function(){return ua.match(/rev(\d+(?:\.\d+)+)/)}},{'name':'Flock','browser':function(){return/Flock/.test(ua)}},{'name':'Camino','browser':function(){return/Camino/.test(ve)}},{'name':'Firefox','browser':function(){return/Firefox/.test(ua)}},{'name':'Netscape','browser':function(){return/Netscape/.test(ua)}},{'identifier':'msie','name':'Internet Explorer','browser':function(){return/MSIE/.test(ua)},'version':function(){return ua.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)}},{'name':'Chrome','browser':function(){return/Chrome/.test(ua)}},{'name':'Mozilla','browser':function(){return/Gecko|Mozilla/.test(ua)},'version':function(){return ua.match(/rv:(\d+(?:\.\d+)+)/)}}];i<data.length;i++){if(data[i].browser()){var c=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();b[c]=true;b.browser=data[i].name;var d;if(data[i].version!=undefined&&(d=data[i].version())){b.version.string=d[1];b.version.number=parseFloat(d[1])}else{var e=new RegExp(data[i].name+'(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)');d=ua.match(e);if(d!=undefined){b.version.string=d[1];b.version.number=parseFloat(d[1])}}break}};for(var i=0,pl=navigator.platform,data=[{'identifier':'win','name':'Windows','OS':function(){return/Win/.test(pl)}},{'name':'Mac','OS':function(){return/Mac/.test(pl)}},{'name':'Linux','OS':function(){return/Linux/.test(pl)}}];i<data.length;i++){if(data[i].OS()){var c=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();b[c]=true;b.OS=data[i].name;break}}}();
		
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

			/*
			 * https://github.com/trix/nano
			 */				
			/* Nano Templates (Tomasz Mazur, Jacek Becela) */
			(function($){
			  $.nano = function(template, data) {
			    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
			      var keys = key.split("."), value = data[keys.shift()];
			      $.each(keys, function () { value = value[this]; });
			      return (value === null || value === undefined) ? "" : value;
			    });
			  };
			})(jQuery);
		
			/*
			 * Кодирование/декодирование строк из/в html
			 * htmlEncode(string) - кодирование
			 * htmlDecode(string) - декодирование
			 * http://www.strictly-software.com/htmlencode
			 */
			vkPatch.sys.encoder={EncodeType:"entity",isEmpty:function(val){if(val){return((val===null)||val.length==0||/^\s+$/.test(val))}else{return true}},HTML2Numerical:function(s){var arr1=new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&Oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');var arr2=new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;');return this.swapArrayVals(s,arr1,arr2)},NumericalToHTML:function(s){var arr1=new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;');var arr2=new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&Oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');return this.swapArrayVals(s,arr1,arr2)},numEncode:function(s){if(this.isEmpty(s))return"";var e="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c<" "||c>"~"){c="&#"+c.charCodeAt()+";"}e+=c}return e},htmlDecode:function(s){var c,m,d=s;if(this.isEmpty(d))return"";d=this.HTML2Numerical(d);arr=d.match(/&#[0-9]{1,5};/g);if(arr!=null){for(var x=0;x<arr.length;x++){m=arr[x];c=m.substring(2,m.length-1);if(c>=-32768&&c<=65535){d=d.replace(m,String.fromCharCode(c))}else{d=d.replace(m,"")}}}return d},htmlEncode:function(s,dbl){if(this.isEmpty(s))return"";dbl=dbl|false;if(dbl){if(this.EncodeType=="numerical"){s=s.replace(/&/g,"&#38;")}else{s=s.replace(/&/g,"&amp;")}}s=this.XSSEncode(s,false);if(this.EncodeType=="numerical"||!dbl){s=this.HTML2Numerical(s)}s=this.numEncode(s);if(!dbl){s=s.replace(/&#/g,"##AMPHASH##");if(this.EncodeType=="numerical"){s=s.replace(/&/g,"&#38;")}else{s=s.replace(/&/g,"&amp;")}s=s.replace(/##AMPHASH##/g,"&#")}s=s.replace(/&#\d*([^\d;]|$)/g,"$1");if(!dbl){s=this.correctEncoding(s)}if(this.EncodeType=="entity"){s=this.NumericalToHTML(s)}return s},XSSEncode:function(s,en){if(!this.isEmpty(s)){en=en||true;if(en){s=s.replace(/\'/g,"&#39;");s=s.replace(/\"/g,"&quot;");s=s.replace(/</g,"&lt;");s=s.replace(/>/g,"&gt;")}else{s=s.replace(/\'/g,"&#39;");s=s.replace(/\"/g,"&#34;");s=s.replace(/</g,"&#60;");s=s.replace(/>/g,"&#62;")}return s}else{return""}},hasEncoded:function(s){if(/&#[0-9]{1,5};/g.test(s)){return true}else if(/&[A-Z]{2,6};/gi.test(s)){return true}else{return false}},stripUnicode:function(s){return s.replace(/[^\x20-\x7E]/g,"")},correctEncoding:function(s){return s.replace(/(&amp;)(amp;)+/,"$1")},swapArrayVals:function(s,arr1,arr2){if(this.isEmpty(s))return"";var re;if(arr1&&arr2){if(arr1.length==arr2.length){for(var x=0,i=arr1.length;x<i;x++){re=new RegExp(arr1[x],'g');s=s.replace(re,arr2[x])}}}return s},inArray:function(item,arr){for(var i=0,x=arr.length;i<x;i++){if(arr[i]===item){return i}}return-1}};
			
			/*
			 * Кодирование строки в utf8
			 */
			vkPatch.sys.utf8_encode = function (str_data){str_data=str_data.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<str_data.length;n++){var c=str_data.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext}
			/*
			 * Кодирование строки в md
			 */
			vkPatch.sys.md5 = function (str){var RotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))};var AddUnsigned=function(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8)}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8)}else{return(lResult^0x40000000^lX8^lY8)}}else{return(lResult^lX8^lY8)}};var F=function(x,y,z){return(x&y)|((~x)&z)};var G=function(x,y,z){return(x&z)|(y&(~z))};var H=function(x,y,z){return(x^y^z)};var I=function(x,y,z){return(y^(x|(~z)))};var FF=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var GG=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var HH=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var II=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var ConvertToWordArray=function(str){var lWordCount;var lMessageLength=str.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(str.charCodeAt(lByteCount)<<lBytePosition));lByteCount++}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray};var WordToHex=function(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;x=ConvertToWordArray(str);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()}
						
			vkPatch.load.step2();
		},
		
		/**
		 * Инициализация модулей vkPatch и выполнение
		 */
		step2: function()
		{
			// Определение браузера и задание специфичный параметров
			vkPatch.browser.determine();
			// не выводим сообщения в обычном режиме
			if (!vkPatch.debug) 
			{
				vkPatch.log = function(){};
			};
			
			// объявление событий
			vkPatch.events = _.map(vkPatch.events, function(item, name)
			{
				return new vkPatch.event(name, 'core');
			});

			// Определение страницы
			vkPatch.page.get();
			
			_window.onhashchange = vkPatch.page.hashchangeHandler;
			
			/**
			 * Инициализация внутренних объектов vkPatch
			 */
			// скрипты, стили, подзагрузка, информация о странице
			vkPatch.page.init();
			
			// аудио
			vkPatch.audio.init();
			
			/**
			 * Инициализация плагинов
			 */
			vkPatch.plugins.init();
			
			/*
			 * Обработчики событий vkPatch
			 */
			// обработчик на смену страницы - выполнение ф-ий страницы
			vkPatch.events.pageChanged.bind(vkPatch.plugins.pageChangedHandler);
			
			// Выполнение расрирешия объектов при загрузке ресурса
			vkPatch.events.resourceLoaded.bind(vkPatch.sys.handleLazyResourceHandler);
			
			// вызываем событие смены страницы, чтобы выполнились все ф-ии плагинов на текущей странице
			vkPatch.events.pageChanged.raise(vkPatch.page.string);

		}
	},
	
	/**
	 * Текущий браузер
	 */
	browser:
	{
		/**
		 * Имя браузера
		 */
		name: null,
		
		isFirefox: false,
		isOpera: false,
		isIE: false,
		isChrome: false,
		
		/**
		 * Объект консоли браузера - контекст log
		 */
		console: {},
		
		/**
		 * Функция вывода сообщения в консоль браузера
		 */
		log: function(){},
		
		/*
		 * Задание специфичных для браузера установок
		 */
		determine: function()
		{
			vkPatch.browser.name = $.browser.browser();
			
			if ($.browser.opera())
			{
				vkPatch.browser.isOpera = true;
				
				vkPatch.browser.console = console;
				vkPatch.browser.log = console.log;
			}
			else if ($.browser.firefox())
			{
				vkPatch.browser.isFirefox = true;
				
				vkPatch.browser.console = console;
				vkPatch.browser.log = console.log;
			}
			else if ($.browser.msie())
			{
				vkPatch.browser.isIE = true;
				vkPatch.browser.console = console;
				vkPatch.browser.log = function(msg)
					{
						console.log(msg)
					};
			}
			else if ($.browser.chrome())
			{
				vkPatch.browser.isChrome = true;
				
				vkPatch.browser.console = console;
				vkPatch.browser.log = console.log;
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
		hash: window.location.hash,
		isSettings: false,
		isIndex: false,
		
		// параметры GET
		params: {},
		
		/**
		 * .page init
		 */
		init: function() 
		{
			/*
			 * Привязываем события vkpatch к функциям vkontakte
			 */
			vkPatch.sys.handle('stManager.done', null, function(file) 		// подзагрузка скриптов
			{
				vkPatch.events.resourceLoaded.raise(file);
			});
			vkPatch.sys.handle('stManager._add', null, function(file) 	// подзагрузка стилей
			{
				if (file.indexOf('.css') != -1)
				{
					vkPatch.events.resourceLoaded.raise(file);
				}
			});
			
			vkPatch.sys.handle('nav.setLoc', null, function(loc) 	// смена страницы
			{
				if (loc.tagName && loc.tagName.toLowerCase() == 'a' && loc.href) {
      			loc = loc.href;
    			}
				else if(typeof(loc) == 'object' && loc[0])	// setLoc может принимать объект с параметрами
				{
					loc = loc[0];
				};
				
				vkPatch.events.pageChanged.raise(loc.split('?')[0]);
			});
			
			// подменяем обработчик клика по странице для предотвращения обработки ссылок Контактом
			vkPatch.sys.handle('window.checkEvent', null, function(e) 
			{
				if (!e) return;
				var target = $( e.target || e.srcElement );
				var dataKey = vkPatch.sys.ignoreEventDataKey;
				var ignore = false;
				while (target.length)
				{
					ignore = target.data(dataKey);
					if (ignore) break;
					target = target.parent();
				};
				
				if (ignore)
				{
					return true;
				};
			});
			
			vkPatch.events.pageChanged.bind(function()
			{
				vkPatch.page.parseGet();
				
				/*
				 * Подменяем функцию для предотвращения перехвата контактом смены хеша
				 * Используется для корректной работы vkPatch.page.hash
				 */
				if (window.hab && !window.hab.vkpatch_extended)
				{
					
					window.hab.setOptions({onLocChange: function(loc) 
						{
							// не обрабатываем действие, если vkPatch инициировал смену хеша
							if (vkPatch.page.hashChanging)
							{
								vkPatch.page.hashChanging = false;
								return;
							};
							
							nav.go('/' + loc, undefined, {back: true});
						}
					});
					window.hab.vkpatch_extended = true;
				};
				
			});
			
			vkPatch.page.parseGet();
		},
		
		/*
		 * Получение информации о текущей странице
		 */
		get: function()
		{
			var page = location.pathname.substring(1);	// удаляем ведущий слеш /
			vkPatch.page.path = page;
			
			// удаляем .php
			page = page.replace('.php','').replace(/[0-9]+$/,'');

			vkPatch.page.string = page;
		},
		
		/**
		 * Установить хеш адреса, без обработки события hashchange контактом
		 * @param {string} hash
		 */
		hash: function(hash)
		{
			vkPatch.page.hashChanging = true;
			location.hash = hash;
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
			
			/*
			 * в колбек не вызываем событие resourceLoad, потомоу что во всех файлх js
			 * вконтакте вконце есть событие stManager.done, которое отлавливается 
			 */
			
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
					vkPatch.log('load script: ' + url);

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
			
		},
		
		/**
		 * Извлечение параметров из url
		 */
		parseGet: function() 
		{
			/*
			 * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript
			 */
				var params = {}, e,
				a = /\+/g,  // Regex for replacing addition symbol with a space
				r = /([^&=]+)=?([^&]*)/g,
				d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
				q = window.location.search.substring(1);

			while (e = r.exec(q))
				params[d(e[1])] = d(e[2]);
				
			vkPatch.page.params = params;
		}
		
	},
	
	/**
	 * Системные методы
	 */
	sys: 
	{
		/**
		 * Имя ключа параметра DOM-объекта, указывающего, что нужно игнорировать обработку события нажатия контактом
		 * @return string
		 */
		ignoreEventDataKey: 'vkp-ignore-event',
		
		/**
		 * Преобразование свойства объекта
		 * @param {string} property - путь к свойству, например "audio.play"
		 * @param {function} func - функция, преобразующая свойство function(элемент, имя_свойства, родительский контейнер)
		 * @param {object} context - контекст фукнции
		 * @param {object} [container=window] - контейнер, содержащий объект
		 * @return {bool} true - если успешно, false - если объект не существует
		 * @example 
		 * 	var container = {
		 * 		names: {
		 * 			first: 'Arnold'
		 * 		}
		 * 	};
		 * 	extend('names.first', function(fname){return fname+' junior';}, null, container);
		 * 	alert( container.names.first );	// 'Arnold junior';
		 */
		extend: function(property, func, context, container)
		{
			var names = property.split('.');
			var element = container || _window, propName, parent;
			
			// добираемся до объекта пробегаяся по всей цепочке свойств
			while(names.length) 
			{
				propName = names.shift()
				parent = element;
				element = parent[propName];
				
				// одно из промежуточных свойств не определено
				if (typeof(element) == 'undefined' && names.length != 0) return false;
			};
			
			parent[propName] = func.call(context, element, propName, parent);
			
			return true;
		},
		
		/**
		 * Привязывание функций к другой функции. Будет выполнена сначала before, потом оригинальная ф-ия, потом after
		 * @param {string} property - имя свойства-метода
		 * @param {Object} before - функция, выполняемая перед оригинальной. Агрументы, которые возвращает, будут переданы оригинальной ф-ии
		 * @param {Object} after - функция выполняемая после оригинальной. Если возвращает результат, то он будет передан.
		 * @param {object} context - контекст дополнительных ф-ий
		 * @return {bool} true - в случае удачи, и false - если обхект не существует
		 * @example
		 * var obj = {
		 * 	foo: function(mess) {alert(mess + ' original')}
		 * };
		 * handle('obj.foo', function(mess) {alert(mess + ' before')}, function(mess) {alert(mess + ' after')});
		 * 
		 * obj.foo('test');
		 * // test before
		 * // test original
		 * // test after
		 */
		handle: function(property, before, after, context) 
		{
			context = context || this;
			var before = before || jQuery.noop;
			var after = after || jQuery.noop;
			var propName = property;
			
			return vkPatch.sys.extend(property, function(original) 
			{
				return function() 
				{
					//vkPatch.log(propName + ' handling');
					var args = before.apply(context, arguments);
					// если ф-ия не вернула новые аргументы, то используем оригинальные
					if (!args) 
					{
						args = arguments;
					};
					
					// выполняем обёрнутую функцию и запоминаем результат
					var result = original.apply(null, args);
					// выполняем ф-ию после оригинальной
					var resultAfter = after.apply(context, args);
					if (resultAfter !== undefined)
					{
						result = resultAfter;
					};
					// возвращаем результат
					return result;
				};
			});
			
		},
		
		/**
		 * Обработчик события заргузки файла
		 * Проверяем загрузку файла и выполняет расрирешие объектов, находящхся в очереди
		 * @param {string} resource
		 */
		handleLazyResourceHandler: function(resource) 
		{
			if (vkPatch.sys.handleLazy.queue && vkPatch.sys.handleLazy.queue[resource]) 
			{
				_.each(vkPatch.sys.handleLazy.queue[resource], function(func)
				{
					func();	// выполняем ф-ию расширения для данного файла
				});
			};
		},
		
		
		/**
		 * Привязывание функций к другой функции, после загрузки файла, содержащего исходную функцию
		 * @see handle
		 * @example
		 * handleLazy('player.js/Player.play',function(){alert('start playing')});
		 * // функция будет привязана к Player.play, когда подгрузится player.js
		 */
		handleLazy: function(property, before, after, context)
		{
			property = property.split('/');
			var file = property[0];
			property = property[1];
			
			var handle = function()
			{
				return vkPatch.sys.handle(property, before, after, context);
			};
			
			// пытаемся привязать уже сейчас, возможно обхект уже существует
			handle();
			
			/*
			 * Добавляем в очередь. Если файл ещё не загружен, или будет загружен повторно
			 * будет вызвана функция расширения файла 
			 */
			var queue = arguments.callee.queue = arguments.callee.queue || {};
			if (!queue[file]) 
			{
				queue[file] = [];
			};
			
			// добавляем в очередь
			queue[file].push(handle);
		},
		
		/**
		 * Случайное целое число в интервале [a;b] или в [0;a] если b не указано
		 * @param {Object} a
		 * @param {Object} b
		 */
		random: function(a, b) 
		{
			if (typeof(b) == 'undefined')
			{
				b = a;
				a = 0;
			};
			
			return Math.floor(Math.random() * (b - a + 1)) + a;
		},
		
		/**
		 * Вызывает функцию по истечению времени
		 * @param {function} callback - колбек
		 * @param {integer} delay - время в милисекундах
		 * @param {bool} [autostart=true] - запустить таймер сразу после создания
		 */
		timer: function(callback, delay, autostart) 
		{
			/*
			 * Состояния таймера
			 */
			var STATE_STOPPED = this.STATE_STOPPED = 'stopped',
				 STATE_STARTED = this.STATE_STARTED = 'started',
				 STATE_PAUSED = this.STATE_PAUSED = 'paused';
			
			
			var _callback = function(){callback();_stop()},
				 _delay = delay,
				 _autostart = typeof(autostart) == 'undefined' ? true : autostart,
				 _startTime, 
				 _timeLeft = delay;
			
			/**
			 * Идентификатор таймера
			 */
			var _id = this.id = null;
			
			/**
			 * Состояние таймера
			 */
			var _state = this.STATE_STOPPED;
					
			/**
			 * Запустить таймер или продолжить после паузы
			 */
			var _start = this.start = function() 
			{
				switch (_state)
				{
					case STATE_STOPPED:
					case STATE_PAUSED:
					
						if (_timeLeft <= 0) 
						{
							_timeLeft = 0;
						};
						
						_id = setTimeout(_callback, _timeLeft);
						_startTime = +new Date;
					
					break;
				};
				
				_state = STATE_STARTED;
			};
			
			/**
			 * Приостановить
			 */
			var _pause = this.pause = function()
			{
				switch (_state)
				{
					case STATE_STARTED:
					
					clearTimeout(_id);
					_timeLeft -= +new Date - _startTime;
					_state = STATE_PAUSED;
					
					break;
				};
			};
			
			/**
			 * Продолжить с паузы
			 */
			var _resume = this.resume = function() 
			{
				if (_state == STATE_PAUSED)
				{
					_start();
				}
			};
			
			/**
			 * Остановить таймер и сбросить время
			 */
			var _stop = this.stop = function()
			{
				clearTimeout(_id);
				_timeLeft = _delay;
				_startTime = null;
				_state = STATE_STOPPED;
			};
			
			/**
			 * Оставшееся время
			 */
			this.left = function() 
			{
				switch (_state)
				{
					case STATE_STOPPED:
						return _delay;	
					break;
					
					case STATE_STARTED:		
						return _timeLeft - (+new Date - _startTime);
					break;
					
					case STATE_PAUSED:
						return _timeLeft;
					break;
				}
			};
			
			/**
			 * Состояние таймера
			 */
			this.state = function()
			{
				return _state;
			};
			
			if (_autostart) 
			{
				_start();
			}
		},
	
		md5: function(){},
		encoder: {},
		utf8_encode: function(){}
		
	},

	/**
	 * Конструктор события vkPatch
	 * @param {string} name - имя события
	 * @param {string} pluginName - имя плагина-владельца
	 */
	event: function(name, pluginName)
	{
		// обработчики
		var handlers = [];
		
		var name = name;
		var pluginName = pluginName+'.' || '';
		 
		/**
		 * Повесить обработчик на событие
		 * @param {function} handler - обработчик
		 */
		this.bind = function(handler) 
		{
			handlers.push(handler);
		};
		
		/**
		 * Отвязать обработчик от события
		 * @param {function} handler - обработчик
		 */
		this.unbind = function(handler) 
		{
			handlers = _.remove(handlers, handler);
		};
		
		/**
		 * Вызвать событие. Аргументы будут переданы обработчикам
		 */
		this.raise = function() 
		{
			vkPatch.log(pluginName + name + ' raised: '+[].join.call(arguments,', '));
			for (var i=0; i < handlers.length; i++)
			{
				handlers[i].apply(this, arguments);
			};
		};
	},
	
	/**
	 * Коллекция событий
	 */
	events: 
	{
		/*
		 * Подружен файл - скрипт или стиль. Выполняется после выполнения скрипта
		 * function(имя_ресурса)
		 */
		resourceLoaded: null,
		
		/*
		 * Изменена страница
		 * function(имя_страницы)
		 */
		pageChanged: null,
		
		/*
		 * Перерисовка состояния проигрывания
		 * function(state, trackInfo)
		 */
		audioRedraw: null,
		
		/*
		 * Начало воспроизведения трека (только при первом запуске, не из паузы)
		 */
		audioStart: null,
		
		/*
		 * Начало проигрывания или продолжение из паузы
		 * function(trackInfo)
		 */
		audioPlay: null,
		
		/*
		 * Аудиозапись поставилась на паузу
		 * function(trackInfo)
		 */
		audioPause: null,
		
		/*
		 * Аудиозапись остановлена или закончилась
		 * function(trackInfo)
		 */
		audioStop: null
	},
	
	/**
	 * Функции связанные с аудиозаписями и звуками 
	 */
	audio: 
	{
		/**
		 * Привязываение обработчиков событий и инициализация объектов audio
		 */
		init: function()
		{
			/*
			 * Привязываем события vkpatch к функциям vkontakte
			 */
			vkPatch.sys.handleLazy('new_player.js/audioPlayer.playback', function(pause)
			{
				var trackInfo = vkPatch.audio.currentTrackInfo();
				if (pause) 
				{
					vkPatch.events.audioPause.raise(trackInfo);
				}
				else
				{
					if (trackInfo.id != vkPatch.audio.lastPlayedId)
					{
						// первый запуск трека
						vkPatch.events.audioStart.raise(trackInfo);
					};
					vkPatch.audio.lastPlayedId = trackInfo.id;
					
					vkPatch.events.audioPlay.raise(trackInfo);
				}
			});

			vkPatch.sys.handleLazy('new_player.js/audioPlayer.stop', function()
			{
				vkPatch.audio.lastPlayedId = null;
				vkPatch.events.audioStop.raise( vkPatch.audio.currentTrackInfo() );
			});
			
			vkPatch.sys.handleLazy('new_player.js/audioPlayer.setGraphics', null, function(state) 	// смена страницы
			{
				var trackInfo = vkPatch.audio.currentTrackInfo();

				vkPatch.events.audioRedraw.raise(state, trackInfo);
			});
		},
		
		/**
		 * ID последнего проигрываемого трека. Чтобы отличить проигрывание с паузы от начала проигрывания трека
		 */
		lastPlayedId: null,
		
		/**
		 * Конструктор информации о треке
		 * @param {array} arr - массив, содержащий поля информации о треке
		 * @return {object} 
		 */
		trackInfo: function(arr)
		{
			// id владельца аудио
			this.ownerId = arr[0];
			// id трека
			this.id = arr[1];
			// id контейнера, соддержащего аудиозапись
			this.aid = arr.aid;
			// ссылка на mp3 файл
			this.url = arr[2];
			// продолжительность в секундах
			this.duration = arr[3];
			// продолжителность в формате mm:ss
			var dur = this.durationTest = arr[4];
			// имя артиста
			var artist = this.artist = vkPatch.sys.encoder.htmlDecode(arr[5]);
			// название трека
			var track = this.track = vkPatch.sys.encoder.htmlDecode(arr[6]);
			
			this.toString = function() 
			{
				return artist + ' - ' + track + ' (' + dur + ')';
			};
		},
		
		/**
		 * Получить информацию о текущем треке
		 * @return {vkPatch.audio.trackInfo}
		 */
		currentTrackInfo: function() 
		{
			return new vkPatch.audio.trackInfo(_window.audioPlayer.lastSong);
		},
		
		/**
		 * Получить информацию о треке по id
		 * Работает только если трек присутствует на странице
		 * @param {integer} id
		 */
		trackInfoById: function(id)
		{
			return new vkPatch.audio.trackInfo(_window.audios[id]);
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
		TYPE_BUTTON: 'button',		// кнопка
		TYPE_OBJECT: 'object',		// объект. нет проверок
		TYPE_PANEL: 'panel',			// панель, которая выводится с настройками
		
		
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
				
				// обработчик для параметра-кнопки
				buttonHandler: null,
				
				// HTML или функция его возвращающая, который будет выведен в табе настроек
				panel: null,
				
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
					if (this.panel !== null)	/* панель. Просто выводится в табе настроек */
					{
						return vkPatch.settings.TYPE_PANEL;	
					}
					else if (this.buttonHandler !== null) /* этот параметр - кнопка */ 
					{
						return vkPatch.settings.TYPE_BUTTON;
					}
					else if (_.isBoolean(this.def))				 /* булево */
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
				node.def = list[0];
				return this;
			};
			
			/**
			 * Тип параметра - кнопка
			 * @param {function, string} handler - действие, которое будет выполнено при нажатии, может задано как имя метода в plugin
			 */
			this.button = function(handler)
			{
				node.buttonHandler = handler;
				return this;
			};
			
			/**
			 * Тип параметра - панель. Просто выводится на настройках
			 * @param {string, function} html - код или функция, котора его возвращает
			 */
			this.panel = function(html) 
			{
				node.panel = html;
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
		// префикс параметров vkpatch
		paramsPrefix: 'vkpatch::',
		
		set: function(name,value)
		{
			localStorage.setItem(vkPatch.storage.paramsPrefix + name,$.toJSON(value));
		},
		
		get: function(name)
		{
			var value = localStorage.getItem(vkPatch.storage.paramsPrefix + name);

			if (value !== null)
			{
				value = $.evalJSON(value);
			}
			return value;
		},
		
		remove: function(name)
		{
			localStorage.removeItem(vkPatch.storage.paramsPrefix + name);
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
		 * Ассоциативный массив, где ключ - имя страницы, а значение - массив ф-ий из плагинов
		 */
		pages: {},
	
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
				 * Добавляем плагин к vkPatch.settings.[pluginName]
				 */
				if (!vkPatch.plugins[plugin.name])
				{
					vkPatch.plugins[plugin.name] = plugin;
				}
				else
				{
					vkPatch.log('plugin name conflict: '+plugin.name);
				};
				
				/*
				 * Раскладываем ф-ии плагинов, выполняемые на страницах в pages 
				 */
				_.each(plugin.pages, function(func, pages) 
				{
						var func = jQuery.proxy(func, plugin);	// задаём ф-ии контекст плагина
						
						// страницы могу быть разделены | 
						var pages = pages.split('|');
						
						_.each(pages, function(p) 
						{
							p = p.replace(/(^\s+)|(\s+$)/g,'');	// обрезаем пробелы
							
							if (!vkPatch.plugins.pages[p])
							{
								vkPatch.plugins.pages[p] = [];
							};
							
							// кладём ф-ию
							vkPatch.plugins.pages[p].push([plugin, func]);
						});
				});
				
				plugin.resources = _.map(plugin.resources, function(resource) 
				{
					var url = resource;
					
					// разворачиваем относительные ссылки
					if (resource.charAt(0) == '/')
					{
						url = vkPatch.extensionUrl + 'resources/' + plugin.name + resource;
					};
					
					return url;
				});
				
				/*
				 * Создаём объекты событий
				 */
				if (plugin.events) 
				{
					plugin.events = _.map(plugin.events, function(event, name) 
					{
						return new vkPatch.event(name, plugin.name);
					});
				};
				
				/*
				 * Логирование
				 */
				plugin.log = (function()
					{
						var name = plugin.name;
						
						return function() 
						{
							vkPatch.log(name+": " + Array.prototype.join.call(arguments, ','));
						};
						
					})();
				
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
						
						if (_.isString(option.buttonHandler)) 
						{
							option.buttonHandler = jQuery.proxy(plugin, option.buttonHandler);
						};
						
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
				};
				
				/*
				 * Выполнение собственных функции инициализации в плагинах
				 */
				if (plugin.init) 
				{
					vkPatch.plugins.callFunction(plugin, plugin.init);
				}
				
			};
		},
		
		/**
		 * Выполнение функции в плагине. Вызывает в контексте плагина с обработкой ошибок
		 * @param {object} plugin - обхект плагина
		 * @param {function} func - вызываемая функция
		 */
		callFunction: function(plugin, func) 
		{
			var oldHandler = _window.onerror;
			_window.onerror = vkPatch.plugins.onerrorHandler;
			
			vkPatch.plugins.current = plugin;
			
			try
			{
				func.call(plugin);
			}
			catch (err)
			{
				vkPatch.plugins.errorHandler(err, plugin);
			};
			
			_window.onerror = oldHandler;
		},
		
		pageChangedHandler: function(page) 
		{
			if (vkPatch.plugins.pages[page])
			{
				_.each(vkPatch.plugins.pages[page], function(node) 
				{
					vkPatch.plugins.callFunction(node[0], node[1]); // выполняем фукнцию, связанную с этой страницей
				});
			};
		},
		
		/**
		 * Обработчик ошибок onerror
		 * @param {string} message - текст ошибки
		 * @param {string} url - ссылка на файл
		 * @param {string} lineNumber - номер строки
		 */
		onerrorHandler: function(message, url, lineNumber) 
		{
			vkPatch.log('Error in plugin "' + vkPatch.plugins.current.name + '": ' + message + ' at ' + url + ':' + lineNumber);
		},
		
		/**
		 * Обработчик ошибок try
		 * @param {Error} err
		 */
		errorHandler: function(err)
		{
			var info = '';
			for (var prop in err) 
			{
				info += "\n\t " + prop + " = ["+ err[prop]+ "]"; 
			} 
		   info += "\n\t string = [" + err.toString() + "]"; 
			vkPatch.log('Error in plugin "' + vkPatch.plugins.current.name + '": ' + info);
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
							 	$('<b>').addClass('tab_word').css('overflow','visible').html(text)
							 ).attr({href:href}).data(vkPatch.sys.ignoreEventDataKey, true);
			
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
			tabs.find('.activeLink, .active_link').removeClass('activeLink active_link');
			
			// Добавляем нашему
			target.addClass('activeLink active_link');
		},
		
		/**
		 * Создание кнопки
		 * @param {string} label - Надпись
		 * @param {function} action - onclick действие
		 * @param {string} [id] - id кнопки
		 * @param {string} [color=blue] - цвет кнопки (blue, gray)
		 * @return {jQuery} jQuery-объект кнопки
		 */
		button: function(label, action, id, color)
		{
			if (id) 
			{
				id = ' id="' + id + '"';
			}
			else
			{
				id = '';
			};
			
			color = color || 'blue';
			
			var button = $('<div nosorthandle="1" class="button_'+color+'"><button nosorthandle="1"'+id+'>'+label+'</button></div>');
			if (action)
			{
				button.find('button').click(function(e){e.preventDefault();}).click(action);
			}
			return button;
		},
		
		/*
		 * Рамка с сообщением
		 * @return jQuery-объект
		 */
		inlineMessage: function(message)
		{
			return $('<div id="messageWrap"><div style="margin: 0px;" class="msg"><b>'+message+'</b></div></div>');
		},
		
		/*
		 * Рамка с сообщением об ошибке
		 * @return jQuery-объект
		 */
		inlineError: function(message)
		{
			return $('<div id="messageWrap"><div style="margin: 0px;" id="error"><b>'+message+'</b></div></div>');
		},
		
		/**
		 * Привязать подсказку к элементу
		 * @param {string} type - тип подсказки (simple, balloon)
		 * @param {object} element - элемент DOM
		 * @param {string} message - текст подсказки
		 * @param {integer} shift - отступ подсказки слева 
		 */
		tooltip: function(type, element, message, shift) 
		{
			element = $(element).get(0);
			shift = shift || 0;
			
			// выбираем тип
			switch (type)
			{
				case 'balloon':
					var func = function() 
					{
						showTooltip(element, {
		     				shift: [shift, 3, 3],
							text: message,
		    				slide: 15,
							className: 'settings_about_tt',
							hasover: 1
		        		})
					};
					break;
				
				case 'simple':
				default:
					func = function() 
					{
						showTooltip(this, {text: message, showdt: 200})
					};
					break;
			}
			// вешаем тултип
			$(element).mouseover( jQuery.proxy(_window, func));
			
		}
	},
		
	log: function(mess) {
		// вызываем в контексте консоли
		vkPatch.browser.log.call( vkPatch.browser.console, ":: " + mess );
	},
	
	lang:
	{
		categories:
		{
			main: 'Основные',
			iface: 'Интерфейс',
			audio: 'Аудио'
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
		
		/**
		 * Ссылки на ресурсы, хранящиеся в resources/[имя плагина]/
		 */
		resources:
		{
			
		},
		
		/**
		 * Функции, привязанные к страницам
		 */
		pages: {},
		
		/**
		 * Инициализация плагина
		 */
		init: null
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
		bool: vkPatch.settings.create().def(true).category('settings_test').done(),
		num: vkPatch.settings.create().def(200).min(1).max(500).category('settings_test').done(),
		floatNum: vkPatch.settings.create().def(200).min(1).max(500).isFloat(true).category('settings_test').done(),
		str: vkPatch.settings.create().def('Test string').category('settings_test').done(),
		list: vkPatch.settings.create().list(['one','two','three','withoutTranslation']).def('two').category('settings_test').done()
	},
	
	resources: 
	{
		tabIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBElEQVR4nHWSa0iTYRTH/+/zbm6+28plS0OXNS276C4GlYhFXr5U3uhKVBQVBUVB0AWKDAqxL32R6CLdPkVElKJ0EZdOKbJlK8t1WTedkbm1ze3Vxd73efpQFpr+4cDhcPgdzjl/YAIVF+ZpAcCSlUEKli3WTNTHj1d01J2oObjDdn1A1N/dWJK+smqfya5JMH1tdrxyTQgoW7VcqD668YBal/Qhz6rbMGNazGzOIIWWDLpKUA5O6nz707k4Jy20pSK94ns4sdPr7WMAwI0Abl4+eHhNUVJ1RAyFhLhhLWEiDyrid0QgDg2F1XxETRBR7D+XWVxzsaEZAMgIoK7Jcy0S/h7SxgUmE9nPQ/IDku9P+KFRDOh45lM63/BdX76hY9QK7bf31OTbVBuMhmEzR0MENAj3p+EPt1pIbfdn+syYODA7nv8hQA5BrRB5S1rQajNnJjW2fO3A0rwcbbR71xB7t4kxdwVjr4tZd2OBp7ysxDgyZcfmIstwuyDSx3GMtquZ7IhnT67MclqtVgUAYOfW8pwvLSves1f5jL20sXOnCqvHXvts5aL9cls8k1sF9uBspn3t6pI5AECy588gBTniQn28T/93X1VEPRZgNvrnQSJgEsFMvZg8NzliBAA+w5QmnN4t2gVlYBJoEKCDSNX7Z4fJ0vtO18d+ALhw3Lau1NpTBZlwkHkkqGMGTRxd4PSmXuYAoOpI0TaNKpqyvfD5IUEZ04FyiP5UDrl7Ex1alaRLnzqYC8oRUILXfXqP/W3K1d6AtutM7b36vz44tneJpXK96ykBlKAEoBwYJYDM/cspB+8Pbc+BW9nW23WNgVE+MBqkXEKJwumZ/tIfEnxM4gGJgMkETObR3TfF4/XrevSqWFJyAmf+z8reoKHT7ctuu9NhOGlJjVin66Lz7e7Uh0zmowmqmOFGp+nMeUfK9o6+lKZHrt62/v5+BgCKEYDL9YK6XC+aAWCFJbeVSvzMS+3pu02JYWPpgm+nvUFNV33D3QCA1rEfGldZWVmK8fKx+gVkCk2ZX8BevgAAAABJRU5ErkJggg==',
		rabbit: 'data:image/png;base64,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'
	},
	
	lang:
	{
		settings: {
			bool: ['Булев параметр','Подсказка булева параметра'],
			num: ['Целый параметр','Интервал от 1 до 500, целое число'],
			floatNum: ['Числовой параметр','Интервал от 1 до 500'],
			str:  ['Строковой параметр','Подсказка строкового параметра'],
			list: ['Список',{one: 'Один', two:'Два', three:'Три'}]
		},
		
		categories: 
		{
			settings_test: 'Секция тестовых настроек'
		},
		
		tabTitle: 			'В +'  /* сумма (&#8512;), звёздочка (&#9733;), молоточки (&#9874;) */,
		saved: 				'Настройки сохранены',
		nothingShow: 		'Нет параметров для отображения',
		version:				'Версия',
		homePage:			'Домашняя страница',
		author:				'Автор',
		debugMode:			'режим отладки',
		donate:				'Яндекс.Деньги'
	},
	
	events: 
	{
		tabActivated: null
	},
	
	pages: 
	{
		'settings': function()
		{
			var tabImg = $('<img>').attr('src',this.resources.tabIcon).css('margin','-2px 0px -4px 0px').css('height','16px');
			this.tab = vkPatch.iface.addTab(tabImg, $('#content > div.tBar:first > ul,#content > div.tabs:first > ul'),this.settingsHash).click(jQuery.proxy(this.tabClickHandler,this));
			
			// если в адрее указан ?show=vkpatch
			if (vkPatch.page.params.show == 'vkpatch') 
			{
				this.activateTab();
			}
			else
			{
				// Если в адресе есть #vkpath, то активируем вкладку
				this.checkHash();
			};
			
		}
	},
	
	init: null,
	
	// тег страницы настроек
	settingsHash: '#vkpatch',
	
	/**
	 * Содержание
	 */
	
	// ссылка на вкладку
	tab: null,
	
	// содержание вкладки
	tabContainer: null,
	
	// элемент, в который добавляется содержимое категории
	categoryContainer: null,
	
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
		// временный фикс для вкладки
		// если находимся на новой вкладке, то перезагружаемся в старую
		// в старых вкладках есть .php в конце, в новых - нет
		/*if (! /\.php$/.test(location.pathname) )
		{
			location.href = 'http://'+location.host+'/settings.php'+this.settingsHash;
			e.preventDefault();
			return false;
		};*/
		
		// отменяем обработчик события поумолчанию
		// чтобы IE не брал страницу из кеша
		e.preventDefault();
		vkPatch.page.hash(this.settingsHash);
		this.activateTab();
	},
	
	/*
	 * Активируем вкладку
	 */
	activateTab: function()
	{
		// активируем вкладку
		vkPatch.iface.activateTab(this.tab);
		
				
		// подключаем стили
		vkPatch.page.requireCSS(['http://vkontakte.ru/css/ui_controls.css','http://vkontakte.ru/css/al/privacy.css']);
		// и скрипты интерфейса
		// после подключения всех скриптов выполнится колбек - this.showTabContent
		vkPatch.page.requireScript(['http://vkontakte.ru/js/lib/ui_controls.js','http://vkontakte.ru/js/al/privacy.js'],jQuery.proxy(this.showTabContent,this));
				
	},
	/*
	 * Содержимое вкладки
	 */
	showTabContent: function()
	{
		/*
		 *  Колбек, который вызывается при выборе элемента списка
		 */
		cur.onPrivacyChanged = function(key)
		{
			var value = _window.Privacy.getValue(key);
			// значение выпадающего списка представляет собой величину вида: -1_1_[значение выбранного элемента]_
			// извлечём
			value = value.substring(5, value.length-1)
			$('#'+key).val(value);
		};

		// Удаляем сообщения
		$('#content > div > div.msg').parent().remove();
		
		// очищаем страницу и подготавливаем форму
		this.tabContainer = $('#content').children('div.tabs').nextAll().remove().end().end().append('<div id="settings_result" style="display: block; "></div><div id="settings_panel" class="clear_fix"><form mathod="get" action="#" name="vkPatchSettings" id="vkPatchSettings"></form></div>').find('form');
		// Нечего отображать
		var nothingShow = true;
		
		this.tabContainer.append(this.aboutPanel());
		nothingShow = false;
		
		for (var categoryName in vkPatch.settings.categories)
		{
			if (!vkPatch.settings.categories.hasOwnProperty(categoryName)) continue;
			
			// пропускаем скрытые настройки
			if (categoryName == 'hidden') continue;
			// отключаем тестовую секцию, если не в режиме отладки
			if (categoryName == 'settings_test' && !vkPatch.debug) continue;
			
			nothingShow = false;
			
			var category = vkPatch.settings.categories[categoryName];

			if (category.length > 0)
			{
				this.categoryContainer = $('<div class="settings_section"></div>');
				this.categoryContainer.append('<h2>'+(vkPatch.lang.categories[categoryName]||categoryName)+'</h2>');
				this.tabContainer.append(this.categoryContainer);
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
						
					case vkPatch.settings.TYPE_BUTTON:
					
						this.buttonParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_PANEL:
						
						this.panelParam(option);
						
						break;
				};
				
			};
			
			this.events.tabActivated.raise();
		};
		
		if (nothingShow) 	/* нет параметров для отображения */
		{
			vkPatch.iface.inlineMessage(this.lang.nothingShow).insertBefore('#content > div.editorPanel');
		}
		else
		{
			// Кнопка "сохранить"
			this.button('Сохранить', jQuery.proxy(this.save,this));	
		};
		
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
		this.showMessage(this.lang.saved, 'normal');

		// Прокручиваем страницу наверх
		$(_window).scrollTop(0);
	},
	
	/**
	 * Вывести сообщение вверху панели
	 * @param {string} message
	 * @param {string} [type=normal] - error или normal
	 * @param {integer} [delay=4000] - время показа сообщения в мс, -1 - не скрывать
	 */
	showMessage: function(message, type, delay) 
	{
		delay = delay || 4000;

		$('#settings_result').empty();	// удаляем старое
		switch (type)
		{
			case 'error':
				var messageElement = vkPatch.iface.inlineError(message);
			break;
			
			case 'normal':
			default:
				var messageElement = vkPatch.iface.inlineMessage(message);
		}
		
		messageElement.appendTo('#settings_result');
		
		/* скрываем через заданный интервал */
		if (delay > 0) 
		{
			messageElement.delay(delay).slideUp('slow');
		};
	},
	
	/*
	 * Строковой параметр
	 */
	stringParam: function(option)
	{
		var title = option.title;
		var desc = option.desc || '';
		
		var label = $('<div style="display: inline-block; width: 200px;">'+title+':</div>');
		var input = $('<div style="display: inline-block;"><input type="text" class="text" id="'+option.name+'" name="'+option.name+'" value="'+option.get()+'" /></div>');
		
		var container = $('<div style="margin: 4px 0px"></div>').append(label).append(input);
		this.categoryContainer.append(container);
		
		// вешаем подсказку
		if (option.desc) 
		{
			vkPatch.iface.tooltip('balloon', label, option.desc);
		};
		
	},
	
	/*
	 * Булевский параметр
	 */
	booleanParam: function(option)
	{
		
		// Добавляем строку параметра
		var checked = option.get() ? 1 : 0;
		var wrapper = $('<div id="'+option.name+'_wrapper" class="settings_service_row clear_fix">');
		var hidden = $('<input type="hidden" id="'+option.name+'" name="'+option.name+'" />').val( checked );
		wrapper.append(hidden);
		
		var checkbox = $('<div class="checkbox fl_l" onclick="checkbox(this);" name="checkbox_'+option.name+'"><div></div>'+option.title+'</div>');
		if (checked)
		{
			checkbox.addClass('on');
		};
		
		var optionName = option.name;
		wrapper.append(checkbox);
		
		this.categoryContainer.append(wrapper);
		checkbox.click(function()
		{
			$('#'+optionName).val(_window.isChecked(this));
		});
		
		var input = _window.ge(option.name);
		
		// Функцией ВКонтакте, преобразуем флажок
		//new _window.Checkbox(input, {checked: option.get(), label: option.title,  onChange: function() { }});
		
		if (option.desc)
		{
			vkPatch.iface.tooltip('balloon', checkbox, option.desc, -25);
		}
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
		
		
		var desc = {};
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
			
			
			desc[option.list[i]] = title;
			
			// Нашли выбранный
			if (option.list[i] == selected)
			{
				selected_index = i;
				selected_title = title;
			}
		}
	

		this.categoryContainer.append('<div style="margin: 4px 0px"><div style="display: inline-block; width: 200px">'+option.title+':</div><div class="settings_privacy_control" style="display: inline-block;padding: 4px;"><a id="privacy_edit_'+option.name+'" style="cursor: pointer;" onclick="return Privacy.show(this, event, \''+option.name+'\');">'+selected_title+'</a><span></span></div><input type="hidden" id="'+option.name+'" name="'+option.name+'" /></div>');
		if (!_window.cur.privacy)
		{
			_window.cur.privacy = {};
		};
				
		_window.cur.privacy[option.name + '_types'] = desc;
		_window.cur.privacy[option.name] = [selected];
	},
	
	/**
	 * Вывести параметр-кнопку
	 * @param {object} option - описание параметра из vkPatch.settings.
	 */
	buttonParam: function(option) 
	{
		this.button(option.title, option.buttonHandler, option.name, option.desc, 'gray');		
	},
	
	/**
	 * Вывести кнопку на панель настроек
	 * @param {string} label - текст кнопки
	 * @param {function} handler - обработчик нажатия
	 * @param {string} [id] - id кнопки
	 * @param {string} desc - описание
	 */
	button: function(label, handler, id, desc, color) 
	{
		var button = vkPatch.iface.button(label, handler, id, color);
		// посказка
		if (desc) 
		{
			vkPatch.iface.tooltip('balloon', button, desc);
		};
		
		this.categoryContainer.append( 
			$('<div>').css(
				{
					'text-align': 'center',
					'margin': '5px 0px',
					'clear': 'both'
				})
			.append( button )
		);
	},
	
	/**
	 * Вывести панель
	 * @param {object} option - описание параметра
	 */
	panelParam: function(option) 
	{
		if (_.isFunction(option.panel))
		{
			var panel = option.panel();
		}
		else
		{
			panel = option.panel;
		};
		
		this.categoryContainer.append(panel);
	},
	
	aboutPanel: function() 
	{
		var debug = vkPatch.debug ? ' <small>[' + this.lang.debugMode + ']</small>' : '';
		return $.nano('<div class="settings_section" style="color: #555"><img src="'+this.resources.rabbit+'" style="float: left; margin-bottom: 10px; margin-right: 30px;"><h4 style="color: #555; margin-bottom: 8px; padding-top: 6px;">vkPatch'+debug+'</h4>{version}: '+vkPatch.version+'<br>{homePage}: <a href="http://klinifini.livejournal.com/">http://klinifini.livejournal.com/</a><br>{author}: <a href="http://vkontakte.ru/pochemuto">Сергей Третьяк</a><br>{donate}: <b>41001936638703</b></div>', this.lang);
	}
		
});

vkPatch.plugins.add({
		/**
		 * Скачивание музыки
		 */
		name: 'audioSave',
		title: 'Скачивание музыки',
		desc: 'Добавляет кнопку для скачивания музыки',
		
		settings: 
		{
		},
		
		lang:
		{
			settings: {t:['Настрока','Описание\nВторая строка']},
			categories: {}
		},
		
		pages: 
		{
			'audio' : function()
			{
				
			}
		},
		
		resources: 
		{
			
		},

		init: function()
		{
			this.updatePage();
		},
		
		updatePage: function()
		{
			
		}
});

vkPatch.plugins.add({
		/**
		 * Kikuyutoo
		 */
		name: 'kikuyutoo',
		title: 'Скробблер Last.fm',
		desc: 'Скробблит ваши прослушивания, и обновляет информацию "Сейчас играет" в вашем профиле на Last.fm',
		
		settings: 
		{
			scrobbler: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			nowPlaying: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			playingIcon: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			scrobbledIcon: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			connectLastfmButton: vkPatch.settings.create().button('connectButtonHandler').category('kikuyutoo').done(),
			
			/*
			 * Скрытые
			 */
			token: vkPatch.settings.create().def(null).done(),
			session: vkPatch.settings.create().def(null).done(),
			username: vkPatch.settings.create().def(null).done()
		},
		
		lang:
		{
			settings: 
			{
				playingIcon: ['Иконка при прослушивании аудио','Показывать иконку напротив аудиозаписи при её проигрывании'],
				scrobbler: ['Скробблить аудиозаписи','Когда песня "скробблится" это означает, что ты слушаешь песню, после чего ее название отправляется на <a href="http://www.lastfm.ru" target="_blank">Last.fm</a> и добавляется в твой музыкальный профиль'],
				nowPlaying: ['Обновлять «Cейчас проигрывается» на Last.fm','Аудиозапись, которую Вы сейчас слушаете, будет отображаться в вашем профиле Last.fm. Эта опция не влияет на скробблинг'],
				scrobbledIcon: ['Иконка у заскроббленной аудиозаписи','Когда аудиозапись будет заскробблена, напротив неё появится иконка'],
				connectLastfmButton: 'Связать с аккаунтом Last.fm',
				disconnectLastfmButton: 'Отключить от '
			},
			
			connectSuccessMessage: 'Kikuyutoo подключён к ',
			connectErrorMessage: 'Ошибка подключения к last.fm: ',
			desconnectedMessage: 'Kikuyutoo отключён от профиля last.fm',
			scrobbledIconTooltip: 'Трек заскробблен',
			categories: 
			{
				kikuyutoo: 'Kikuyutoo'
			}
		},
		
		resources: 
		{
			playingIcon: 'data:image/gif;base64,R0lGODlhDAAMALMAAP///9bW1s7Ozr29vbW1ta2traWlpZycnJSUlIyMjAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQEBQD/ACwAAAAADAAMAAAEORAEQisNQJRdKDeCIXKbKB7oYQBAiiIwcrAxnCB0DiR8wvq7X+9H3A2DSB6ix+whBs3mADBYNp+ACAAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIXKbKB7oYaYoggDAAbt08gJ3nexw0vc7H0BIDP6GQERwGUQMmMwBYKBkOgERACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS70AfQEgE9o7DW3B5GzCDA8AAwUREIwAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIW4AUIjioR5GuapIjBylHCd2XSZ8n+y7HhDwIwqJQx7Cx8QNmr4BYLBkIqQRACH5BAQFAP8ALAAAAAAMAAwAAAQ4EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS9zsfQEgM/oZARHAZRAyYzAFgoGQ6AREAIfkEBAUA/wAsAAAAAAwADAAABDgQBEIrDUCUXSg3giFymyge6GGmKOIiBwC8boLI91wnvJz4vOAPMCwGfUiiTci0DZrCAWCAaCKkEQAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYoggBA6s7JC9h0osMJz+s9QHAI9Al/CKASiBgslwPAILlsAiIAIfkEBAUA/wAsAAAAAAwADAAABDYQBEIrDUCUXSg3giFymygeBwCYaIsgqqu+CQy8r5rsie4DvB7wFyTqasFkbaAMDgADhBLxjAAAIfkEBAUA/wAsAAAAAAwADAAABDcQBEIrDUCUXSg3giFymyge6GGmKIIAQOrOyQvMdKLDCc/rPUBwCPQJfwigEogYLJcDwCC5bAIiACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhpiiCAEDqzskL2HaiJzAP+Dtgr7cb/oiIoLI2WAYHgEFSiYBGAAAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYo4iIHALxuQstvoicyD/g7YK+3G/6IiKDSNlgGB4BBUomARgAAOw==',
			
			// Кадры иконки проигрывания
			playingIconFrames: 'data:image/gif;base64,R0lGODlhhAAMAPcAAIyOjJSWlJyenKSmpKyurLS2tLy+vMzOzNTW1Pz+/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAhAAMAAAI/wATIChAsCBBBAkEGjSIUOHCgwkHFiCwsKHEiQwjPoTo8KHFjQU+bhTpUePIBAcIqBxAkMAAlwdSqqQ4cWXMmTRnDrg5s+XLnTJVtrQZNCdRnENhFk0KFGlNpUhxNl3J9MCAqzhdXt36UipXrF6/qkyoVWxYsyu/dtWpVmdZrlnVrlUpoO1ZAXjrJsybNwDerQL88vU7YK9fwYH1JuDbVzFexHkBH37892rivgkBMxa8FfJlzZvrWkYcoLTfhKYBmN6LurRq06cTwJ4toHWA16Zry3ZN2zbsvY95lwYeOCFuw4GFByCeuvfu27cBGJ+eAIB16dWNu77uWvt169Cpf8PvXn27dfHRr6NPj/11e/XlobMXb5z7be3zs+v/Tr86/Pff8bfff+IR6F+A/QnYXn3n7cfgggM2CKGCBUpY4YQPJmgggBge2CGFEX64YYYOeqihhSGeKCKKHKroYokgtgjjiP6xF6B7N9qXo4474rijeTkCeaOQARI5no1FIjmeAT0CYACTPT7ZpJRRQrkjlVdamSOWW2p5I5dfehmgAQkYgGQAZJZ5ZppmDsnmmgm1WeSbbsYJp5p14jmnnXnKuWQCAQEAOw==',
			
			// прозрачный однопиксельный png
			blank: 'data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7',
			
			// трек заскробблен
			scrobbled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNpi+v//PwMpmGXnjnUMhMCd7/v+q3A6MYLYTMQo1la0AdMgPgshxZryFgyW2j5A5/xjuPZg338mZEl0xepyxgwmGk4MRy6tASo+xgB0ViMTTFJDzhSuCexmGV0GA1UrhhNXtzLceHQGrBgo1cACklSV02FQUxVn+PpHnOHOs33/pSWFGRSU2BlO3FjP8PDpE7hisB9AnNuP9tX//veZQU1ZikFJSZCBmZGV4dbd5wyPnj5FUQwLpQaQ4IMnDxnu3HvNwMEsxHD33nusipFDCaSJ4c7TffUsTDwYzkAGyPEAtunu4xs4FWOLB7BNuBSDAECAAQBd15kZmJataAAAAABJRU5ErkJggg=='
		},
		
		pages: 
		{
			'settings': function()
			{
				
			}
		},
		
		events:
		{
			/*
			 * Трек заскробблен
			 * function(trackInfo, [время начала воспроизведения])
			 */
			scrobbled: null
		},

		init: function()
		{
			// md5 для LastFM
			var md5 = function(string){ return vkPatch.sys.md5( vkPatch.sys.utf8_encode(string) ) };
			var document = _window.document;
			/*
			 *
			 * Copyright (c) 2008-2010, Felix Bruns <felixbruns@web.de>
			 * https://github.com/fxb/javascript-last.fm-api/
			 */
			function LastFM(options){var apiKey=options.apiKey||'';var apiSecret=options.apiSecret||'';var apiUrl=options.apiUrl||'http://ws.audioscrobbler.com/2.0/';var cache=options.cache||undefined;var debug=typeof(options.debug)=='undefined'?false:options.debug;this.setApiKey=function(_apiKey){apiKey=_apiKey};this.setApiSecret=function(_apiSecret){apiSecret=_apiSecret};this.setApiUrl=function(_apiUrl){apiUrl=_apiUrl};this.setCache=function(_cache){cache=_cache};var internalCall=function(params,callbacks,requestMethod){if(requestMethod=='POST'){var html=document.getElementsByTagName('html')[0];var frameName='lastfmFrame_'+new Date().getTime();var iframe=document.createElement('iframe');html.appendChild(iframe);iframe.contentWindow.name=frameName;iframe.style.display="none";var doc;var formState='init';iframe.width=1;iframe.height=1;iframe.style.border='none';iframe.onload=function(){if(formState=='sent'){if(!debug){setTimeout(function(){html.removeChild(iframe);html.removeChild(form)},1500)}};formState='done';if(typeof(callbacks.success)!='undefined'){callbacks.success()}};var form=document.createElement('form');form.target=frameName;form.action=apiUrl;form.method="POST";form.acceptCharset="UTF-8";html.appendChild(form);for(var param in params){var input=document.createElement("input");input.type="hidden";input.name=param;input.value=params[param];form.appendChild(input)};formState='sent';form.submit()}else{var jsonp='jsonp'+new Date().getTime();var hash=auth.getApiSignature(params);if(typeof(cache)!='undefined'&&cache.contains(hash)&&!cache.isExpired(hash)){if(typeof(callbacks.success)!='undefined'){callbacks.success(cache.load(hash))}return}params.callback=jsonp;params.format='json';window[jsonp]=function(data){if(typeof(cache)!='undefined'){var expiration=cache.getExpirationTime(params);if(expiration>0){cache.store(hash,data,expiration)}}if(typeof(data.error)!='undefined'){if(typeof(callbacks.error)!='undefined'){callbacks.error(data.error,data.message)}}else if(typeof(callbacks.success)!='undefined'){callbacks.success(data)}window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)}};var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");var array=[];for(var param in params){array.push(encodeURIComponent(param)+"="+encodeURIComponent(params[param]))}script.src=apiUrl+'?'+array.join('&').replace(/%20/g,'+');head.appendChild(script)}};var call=function(method,params,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;internalCall(params,callbacks,requestMethod)};var signedCall=function(method,params,session,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;if(session&&typeof(session.key)!='undefined'){params.sk=session.key}params.api_sig=auth.getApiSignature(params);internalCall(params,callbacks,requestMethod)};this.album={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',')}signedCall('album.addTags',params,session,callbacks,'POST')},getBuylinks:function(params,callbacks){call('album.getBuylinks',params,callbacks)},getInfo:function(params,callbacks){call('album.getInfo',params,callbacks)},getTags:function(params,session,callbacks){signedCall('album.getTags',params,session,callbacks)},removeTag:function(params,session,callbacks){signedCall('album.removeTag',params,session,callbacks,'POST')},search:function(params,callbacks){call('album.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('album.share',params,callbacks)}};this.artist={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',')}signedCall('artist.addTags',params,session,callbacks,'POST')},getCorrection:function(params,callbacks){call('artist.getCorrection',params,callbacks)},getEvents:function(params,callbacks){call('artist.getEvents',params,callbacks)},getImages:function(params,callbacks){call('artist.getImages',params,callbacks)},getInfo:function(params,callbacks){call('artist.getInfo',params,callbacks)},getPastEvents:function(params,callbacks){call('artist.getPastEvents',params,callbacks)},getPodcast:function(params,callbacks){call('artist.getPodcast',params,callbacks)},getShouts:function(params,callbacks){call('artist.getShouts',params,callbacks)},getSimilar:function(params,callbacks){call('artist.getSimilar',params,callbacks)},getTags:function(params,session,callbacks){signedCall('artist.getTags',params,session,callbacks)},getTopAlbums:function(params,callbacks){call('artist.getTopAlbums',params,callbacks)},getTopFans:function(params,callbacks){call('artist.getTopFans',params,callbacks)},getTopTags:function(params,callbacks){call('artist.getTopTags',params,callbacks)},getTopTracks:function(params,callbacks){call('artist.getTopTracks',params,callbacks)},removeTag:function(params,session,callbacks){signedCall('artist.removeTag',params,session,callbacks,'POST')},search:function(params,callbacks){call('artist.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('artist.share',params,session,callbacks,'POST')},shout:function(params,session,callbacks){signedCall('artist.shout',params,session,callbacks,'POST')}};this.auth={getMobileSession:function(params,callbacks){params={username:params.username,authToken:md5(params.username+md5(params.password))};signedCall('auth.getMobileSession',params,null,callbacks)},getSession:function(params,callbacks){signedCall('auth.getSession',params,null,callbacks)},getToken:function(callbacks){signedCall('auth.getToken',null,null,callbacks)},getWebSession:function(callbacks){var previuousApiUrl=apiUrl;apiUrl='http://ext.last.fm/2.0/';signedCall('auth.getWebSession',null,null,callbacks);apiUrl=previuousApiUrl}};this.chart={getHypedArtists:function(params,session,callbacks){call('chart.getHypedArtists',params,callbacks)},getHypedTracks:function(params,session,callbacks){call('chart.getHypedTracks',params,callbacks)},getLovedTracks:function(params,session,callbacks){call('chart.getLovedTracks',params,callbacks)},getTopArtists:function(params,session,callbacks){call('chart.getTopArtists',params,callbacks)},getTopTags:function(params,session,callbacks){call('chart.getTopTags',params,callbacks)},getTopTracks:function(params,session,callbacks){call('chart.getTopTracks',params,callbacks)}};this.event={attend:function(params,session,callbacks){signedCall('event.attend',params,session,callbacks,'POST')},getAttendees:function(params,session,callbacks){call('event.getAttendees',params,callbacks)},getInfo:function(params,callbacks){call('event.getInfo',params,callbacks)},getShouts:function(params,callbacks){call('event.getShouts',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('event.share',params,session,callbacks,'POST')},shout:function(params,session,callbacks){signedCall('event.shout',params,session,callbacks,'POST')}};this.geo={getEvents:function(params,callbacks){call('geo.getEvents',params,callbacks)},getMetroArtistChart:function(params,callbacks){call('geo.getMetroArtistChart',params,callbacks)},getMetroHypeArtistChart:function(params,callbacks){call('geo.getMetroHypeArtistChart',params,callbacks)},getMetroHypeTrackChart:function(params,callbacks){call('geo.getMetroHypeTrackChart',params,callbacks)},getMetroTrackChart:function(params,callbacks){call('geo.getMetroTrackChart',params,callbacks)},getMetroUniqueArtistChart:function(params,callbacks){call('geo.getMetroUniqueArtistChart',params,callbacks)},getMetroUniqueTrackChart:function(params,callbacks){call('geo.getMetroUniqueTrackChart',params,callbacks)},getMetroWeeklyChartlist:function(params,callbacks){call('geo.getMetroWeeklyChartlist',params,callbacks)},getMetros:function(params,callbacks){call('geo.getMetros',params,callbacks)},getTopArtists:function(params,callbacks){call('geo.getTopArtists',params,callbacks)},getTopTracks:function(params,callbacks){call('geo.getTopTracks',params,callbacks)}};this.group={getHype:function(params,callbacks){call('group.getHype',params,callbacks)},getMembers:function(params,callbacks){call('group.getMembers',params,callbacks)},getWeeklyAlbumChart:function(params,callbacks){call('group.getWeeklyAlbumChart',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('group.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('group.getWeeklyChartList',params,callbacks)},getWeeklyTrackChart:function(params,callbacks){call('group.getWeeklyTrackChart',params,callbacks)}};this.library={addAlbum:function(params,session,callbacks){signedCall('library.addAlbum',params,session,callbacks,'POST')},addArtist:function(params,session,callbacks){signedCall('library.addArtist',params,session,callbacks,'POST')},addTrack:function(params,session,callbacks){signedCall('library.addTrack',params,session,callbacks,'POST')},getAlbums:function(params,callbacks){call('library.getAlbums',params,callbacks)},getArtists:function(params,callbacks){call('library.getArtists',params,callbacks)},getTracks:function(params,callbacks){call('library.getTracks',params,callbacks)}};this.playlist={addTrack:function(params,session,callbacks){signedCall('playlist.addTrack',params,session,callbacks,'POST')},create:function(params,session,callbacks){signedCall('playlist.create',params,session,callbacks,'POST')},fetch:function(params,callbacks){call('playlist.fetch',params,callbacks)}};this.radio={getPlaylist:function(params,session,callbacks){signedCall('radio.getPlaylist',params,session,callbacks)},search:function(params,session,callbacks){signedCall('radio.search',params,session,callbacks)},tune:function(params,session,callbacks){signedCall('radio.tune',params,session,callbacks)}};this.tag={getInfo:function(params,callbacks){call('tag.getInfo',params,callbacks)},getSimilar:function(params,callbacks){call('tag.getSimilar',params,callbacks)},getTopAlbums:function(params,callbacks){call('tag.getTopAlbums',params,callbacks)},getTopArtists:function(params,callbacks){call('tag.getTopArtists',params,callbacks)},getTopTags:function(callbacks){call('tag.getTopTags',null,callbacks)},getTopTracks:function(params,callbacks){call('tag.getTopTracks',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('tag.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('tag.getWeeklyChartList',params,callbacks)},search:function(params,callbacks){call('tag.search',params,callbacks)}};this.tasteometer={compare:function(params,callbacks){call('tasteometer.compare',params,callbacks)},compareGroup:function(params,callbacks){call('tasteometer.compareGroup',params,callbacks)}};this.track={addTags:function(params,session,callbacks){signedCall('track.addTags',params,session,callbacks,'POST')},ban:function(params,session,callbacks){signedCall('track.ban',params,session,callbacks,'POST')},getBuylinks:function(params,callbacks){call('track.getBuylinks',params,callbacks)},getCorrection:function(params,callbacks){call('track.getCorrection',params,callbacks)},getFingerprintMetadata:function(params,callbacks){call('track.getFingerprintMetadata',params,callbacks)},getInfo:function(params,callbacks){call('track.getInfo',params,callbacks)},getShouts:function(params,callbacks){call('track.getShouts',params,callbacks)},getSimilar:function(params,callbacks){call('track.getSimilar',params,callbacks)},getTags:function(params,session,callbacks){signedCall('track.getTags',params,session,callbacks)},getTopFans:function(params,callbacks){call('track.getTopFans',params,callbacks)},getTopTags:function(params,callbacks){call('track.getTopTags',params,callbacks)},love:function(params,session,callbacks){signedCall('track.love',params,session,callbacks,'POST')},removeTag:function(params,session,callbacks){signedCall('track.removeTag',params,session,callbacks,'POST')},scrobble:function(params,session,callbacks){if(params.constructor.toString().indexOf("Array")!=-1){var p={};for(i in params){for(j in params[i]){p[j+'['+i+']']=params[i][j]}}params=p}signedCall('track.scrobble',params,session,callbacks,'POST')},search:function(params,callbacks){call('track.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('track.share',params,session,callbacks,'POST')},unban:function(params,session,callbacks){signedCall('track.unban',params,session,callbacks,'POST')},unlove:function(params,session,callbacks){signedCall('track.unlove',params,session,callbacks,'POST')},updateNowPlaying:function(params,session,callbacks){signedCall('track.updateNowPlaying',params,session,callbacks,'POST')}};this.user={getArtistTracks:function(params,callbacks){call('user.getArtistTracks',params,callbacks)},getBannedTracks:function(params,callbacks){call('user.getBannedTracks',params,callbacks)},getEvents:function(params,callbacks){call('user.getEvents',params,callbacks)},getFriends:function(params,callbacks){call('user.getFriends',params,callbacks)},getInfo:function(params,callbacks){call('user.getInfo',params,callbacks)},getLovedTracks:function(params,callbacks){call('user.getLovedTracks',params,callbacks)},getNeighbours:function(params,callbacks){call('user.getNeighbours',params,callbacks)},getNewReleases:function(params,callbacks){call('user.getNewReleases',params,callbacks)},getPastEvents:function(params,callbacks){call('user.getPastEvents',params,callbacks)},getPersonalTracks:function(params,callbacks){call('user.getPersonalTracks',params,callbacks)},getPlaylists:function(params,callbacks){call('user.getPlaylists',params,callbacks)},getRecentStations:function(params,session,callbacks){signedCall('user.getRecentStations',params,session,callbacks)},getRecentTracks:function(params,callbacks){call('user.getRecentTracks',params,callbacks)},getRecommendedArtists:function(params,session,callbacks){signedCall('user.getRecommendedArtists',params,session,callbacks)},getRecommendedEvents:function(params,session,callbacks){signedCall('user.getRecommendedEvents',params,session,callbacks)},getShouts:function(params,callbacks){call('user.getShouts',params,callbacks)},getTopAlbums:function(params,callbacks){call('user.getTopAlbums',params,callbacks)},getTopArtists:function(params,callbacks){call('user.getTopArtists',params,callbacks)},getTopTags:function(params,callbacks){call('user.getTopTags',params,callbacks)},getTopTracks:function(params,callbacks){call('user.getTopTracks',params,callbacks)},getWeeklyAlbumChart:function(params,callbacks){call('user.getWeeklyAlbumChart',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('user.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('user.getWeeklyChartList',params,callbacks)},getWeeklyTrackChart:function(params,callbacks){call('user.getWeeklyTrackChart',params,callbacks)},shout:function(params,session,callbacks){signedCall('user.shout',params,session,callbacks,'POST')}};this.venue={getEvents:function(params,callbacks){call('venue.getEvents',params,callbacks)},getPastEvents:function(params,callbacks){call('venue.getPastEvents',params,callbacks)},search:function(params,callbacks){call('venue.search',params,callbacks)}};var auth={getApiSignature:function(params){var keys=[];var string='';for(var key in params){keys.push(key)}keys.sort();for(var index in keys){var key=keys[index];string+=key+params[key]}string+=apiSecret;return md5(string)}}}
												
			this.lastfm = new LastFM(
				{
					apiKey: this.apiKey,
					apiSecret: this.apiSecret,
					debug: vkPatch.debug
				});
			
			// если есть сессия, значит связан с профилем
			if (this.settings.session.get())
			{
				this.connected = true;
			};
			
			/*
			 * Обновление вкладки настроек, в зависимости от связи с lastfm
			 */
			vkPatch.plugins.settings.events.tabActivated.bind(jQuery.proxy(this.setConnectStatus,this));
			
			
			this.iconsContainer = $('<div style="border: 0px; z-index: 2; right: 22px; position: absolute; text-align: right; width: 72px; height: 12px;"></div>');
			this.iconsContainer.attr('id','vkpatch_iconsContainer');
			
			// иконка напротив трека
			var icon = $('<img style="border: 0px; width: 12px; height: 12px; margin-left: 2px; margin-right: 2px; display: inline-block">');

			vkPatch.events.audioRedraw.bind($.proxy(this.redrawIconsContainer,this));

			/*
			 * Иконка при воспроизведении и паузе
			 */
			if (this.settings.playingIcon.get())
			{
				this.playingIconElement = icon.clone().attr('src',this.resources.playingIcon).attr('id','vkpatch_playing_icon');
				this.pausedIconElement = icon.clone().attr('src',this.resources.blank).css('background-image','url("'+this.resources.playingIconFrames+'")');
								
				// перерисовка
				vkPatch.events.audioRedraw.bind($.proxy(this.redrawPlayingIcon,this));
			};
			
			/*
			 * Получен токен для авторизации
			 */
			if (vkPatch.page.params.token) 
			{
				this.log('получен токен');
				this.settings.token.set(vkPatch.page.params.token);
				
				// ожидаем, когда оба события произойдут - появится таб настроект и свяжется с lastfm
				var tabActivated = false, message = null, delay, type;
				
				var showMessage = jQuery.proxy(function() 
				{
					// сообщение - флаг результата связи с lastfm
					if (!!message && tabActivated) 
					{
						vkPatch.plugins.settings.showMessage(message, type, delay);
						
						// меняем текст кнопки
						this.setConnectStatus();
					}
				},this);
				
				// когда активирована вкладка настроект vkPatch
				vkPatch.plugins.settings.events.tabActivated.bind(jQuery.proxy(function()
				{
					
					tabActivated = true;
					showMessage.call(this);
					
				},this));
				
				// делаем запрос сессии
				this.lastfm.auth.getSession(
				{
					token: vkPatch.page.params.token
				},
				{
					success: jQuery.proxy(function(data)
					{
						/*
						 * Успешно
						 */
						// сохраняем имя и сессию в память
						this.settings.username.set(data.session.name);
						this.settings.session.set(data.session.key);
						this.connected = true;
						
						this.log('получена сессия');
						
						// выводим сообщение
						message = this.lang.connectSuccessMessage + this.settings.username.get();
						delay = 15000;
						showMessage();
						
					},this),
					error: jQuery.proxy(function(code, text)
					{
						/*
						 * Ошибка
						 */
						this.connected = false;
						
						message = this.lang.connectErrorMessage + text;
						type = 'error';
						showMessage();
						
					},this)
				});

			};
			
			if (this.connected)
			{
				this.log('соединён');
				if (this.settings.nowPlaying.get()) 
				{
					vkPatch.events.audioStart.bind(jQuery.proxy(this.nowPlaying, this));
				};
				
				if (this.settings.scrobbler.get()) 
				{
					vkPatch.events.audioStart.bind(jQuery.proxy(this.scrobblerInitTimer, this));
					vkPatch.events.audioPlay.bind(jQuery.proxy(this.scrobblerPlay, this));
					vkPatch.events.audioPause.bind(jQuery.proxy(this.scrobblerPause, this));
				};
				
				if (this.settings.scrobbledIcon.get())
				{

					this.scrobbledIconElement = icon.clone().attr('id','scrobbled_icon').attr('src',this.resources.scrobbled);
					vkPatch.iface.tooltip('simple', this.scrobbledIconElement, this.lang.scrobbledIconTooltip);
										
					this.scrobbledIconElement.hide();
					
					// перерисовка
					vkPatch.events.audioRedraw.bind($.proxy(this.redrawScrobbledIcon,this));
					
					// когда заскробблен
					this.events.scrobbled.bind($.proxy(function(trackInfo)
					{
						this.redrawScrobbledIcon('play', trackInfo, true);
					}, this));
				};
			}
			else
			{
				this.log('не соединён с last.fm');
			}
			
		},
		
		/**********************
		 *      Last.fm
		 *********************/
		apiKey: 'bd51d4cc4ae2ce6be98e4008c6ba60e4',
		apiSecret: 'f1ce75e817a2a4e2701357aa47405d4e',
		// подключён к профилю  
		connected: false,
		
		// объект LastFM by Felix Bruns
		lastfm: null,
		
		// Таймер, по которому происходит скробблинг
		timer: null,
		// индикатор, что трек заскробблен
		scrobbled: false,
		
		/**
		 * Отключить от профиля last.fm 
		 */
		disconnect: function()
		{
			this.settings.token.set(null);
			this.settings.session.set(null);
			this.settings.username.set(null);
			this.connected = false;
		},
		
		/**
		 * Новый таймер скробблинга
		 * @param {Object} trackInfo
		 */
		scrobblerInitTimer: function(trackInfo)
		{
			this.scrobbled = false;
			
			// если таймер был уже создан, значит из предыдущего проигрывания
			if (this.timer) 
			{
				// он возможно ещё не сработал, поэтому сбрасываем его явно
				this.timer.stop();
			};
			
			if (trackInfo.duration > 30)	// длина трека должна быть дольше 30-ти секунд - требование last.fm
			{
				var delay = trackInfo.duration/2
				if (delay > 240) // максимальная граница скробблинга - через 240 секунд, независимо от длины трека
				{
					delay = 240;
				};
				
				// создаём новый таймер
				this.timer = new vkPatch.sys.timer(jQuery.proxy(function()
				{
					this.scrobble(trackInfo, this.getUTC());
					
				},this), delay*1000, false);
			};
		
		},
		
		/**
		 * Воспроизведение трека
		 */
		scrobblerPlay: function()
		{
			if (this.timer) 
			{
				this.timer.start();
			};
		},
		
		/**
		 * Трек преостановлен
		 */
		scrobblerPause: function()
		{
			if (this.timer) 
			{
				this.timer.pause();
			};
		},
		
		/**
		 * Получить кол-во секунд по UTC
		 */
		getUTC: function()
		{
			var d = new Date();
			//return Math.floor( d.getTime()/1000 + d.getTimezoneOffset() * 60 );
			return Math.floor(  d.getTime()/1000  );
		},
		
		/**
		 * Отправляет информацию о треке на last.fm
		 * @param {Object} trackInfo
		 * @param {integer} timestamp - время в миллисекундах, когда трек был включён
		 */
		scrobble: function(trackInfo, timestamp)
		{
			this.cleanInfo(trackInfo);
			var session = this.settings.session.get();
			
			// отправляем last.fm
			this.lastfm.track.scrobble({
				track: trackInfo.track,
				timestamp: timestamp,
				artist: trackInfo.artist,
				duration: trackInfo.duration
			},
			{
				key: session
			});
			
			this.scrobbled = true;
			this.events.scrobbled.raise(trackInfo, timestamp);
		},
		
		/**
		 * Обработчик нажатия кнопки
		 */
		connectButtonHandler: function() 
		{
			if (!this.connected) 
			{
				location.href = 'http://www.last.fm/api/auth/?api_key=' + this.apiKey + '&cb=' + encodeURIComponent('http://' + location.host + '/settings?show=vkpatch');
			}
			else
			{
				this.disconnect();
				vkPatch.plugins.settings.showMessage(this.lang.desconnectedMessage);
				this.setConnectStatus();
			}
		},
		
		/**
		 * Очистка текста от лишних символов
		 * @param {string} text
		 * @return {string}
		 */
		cleanText: function(text) 
		{
			return text;
		},
		
		/**
		 * Очистить информацию трека от лишних символом
		 * @param {vkPatch.audio.trackInfo} trackInfo
		 * @return {vkPatch.audio.trackInfo}
		 */
		cleanInfo: function(trackInfo) 
		{
			trackInfo.artist = this.cleanText(trackInfo.artist);
			trackInfo.track = this.cleanText(trackInfo.track);
		},
		
		/**
		 * Обновляет информацию "Сейчас проигрывается"
		 * @param {Object} trackInfo
		 */
		nowPlaying: function(trackInfo) 
		{
			this.cleanInfo(trackInfo);
			this.lastfm.track.updateNowPlaying({
				track: trackInfo.track,
				timestamp: this.getUTC(),
				artist: trackInfo.artist,
				duration: trackInfo.duration
			},
			{
				key: this.settings.session.get()
			});
		},
		
		/**********************
		 *    Интерфейс
		 *********************/
	
		// jQuery-объект, wrapper для иконок
		iconsContainer: null,
		
		// jQuery-объект содержащий img иконки при воспроизведении
		playingIconElement: null,
		// img иконки при паузе
		pausedIconElement: null,
		
		// img иконки при паузе
		scrobbledIconElement: null,
		
		// Номер кадра иконки, на котором остановилось проигрывание
		pausedIconFrame: null,
		
		// id контейнера, содержащего иконки
		iconsContainerOwnerId: null,
		
		/**
		 * Установить иконку проигрывания
		 * @param {state} type - состояние иконка
		 * @param {integer} frame - номер кадра, если иконка паузы
		 */
		setPlayingIcon: function(state, frame) 
		{
			switch (state)
			{
				case 'play':
					
					this.pausedIconElement.hide();
					
					this.playingIconElement.show();
					
					
				break;
				
				case 'pause':
				
					this.playingIconElement.hide();
					
					this.pausedIconElement.css('background-position',12*frame + 'px 0px').show();
					
				break;
						
			}
		},
		
		/**
		 * Обработчик события audioRedraw
		 * @param {string} state - состояние аудио
		 * @param {vkPatch.audio.trackInfo} track - информация о треке
		 */
		redrawPlayingIcon: function(state, track) 
		{
			if (!$('#vkpatch_playing_icon').length)
			{
				this.iconsContainer.prepend(this.playingIconElement);
				this.iconsContainer.prepend(this.pausedIconElement);
			};
			
			switch (state)
			{
				case 'stop':
				
					this.pausedIconFrame = null;
					
				break;
				
				case 'load':
				
					if (this.pausedIconFrame == null) 
					{
						this.setPlayingIcon('play');
					};
					
				break;
				
				case 'play':
					
					this.pausedIconFrame = null;
					this.setPlayingIcon('play');
					
				break;
				
				case 'pause':
					
					// выбираем случайно кадр, на котором остановили
					if (this.pausedIconFrame == null) 
					{
						this.pausedIconFrame = vkPatch.sys.random(10);
					};
					
					this.setPlayingIcon('pause', this.pausedIconFrame);
			
				break;
			};
			
			
			
		},
		
		/**
		* Меняет вкладку настроект в зависимости от статуса связи с last.fm
		*/
		setConnectStatus: function() 
		{
			
			var buttonElement = $('#' + this.settings.connectLastfmButton.name);
			if (this.connected) 
			{
				var username = this.settings.username.get();
				buttonElement.html(this.lang.settings.disconnectLastfmButton + username);
			}
			else
			{
				buttonElement.html(this.settings.connectLastfmButton.title = this.lang.settings.connectLastfmButton);
			};
		},
		
		/**
		 * Перерисовать иконку "заскроббен"
		 */
		redrawScrobbledIcon: function(state, trackInfo, animate) 
		{
			if (!$('#scrobbled_icon').length)
			{
				this.iconsContainer.prepend(this.scrobbledIconElement);
			};
			
			switch (state) 
			{
				case 'stop':
					
					this.scrobbledIconElement.stop().hide();
									
				break;
				
				default:
					
					if (this.scrobbled) 
					{							
						if (animate) 
						{
							this.scrobbledIconElement.hide();
							// пауза в три секунды чтобы успел отправиться запрос на lastfm
							// иначе анимация идёт рывками
							this.scrobbledIconElement.delay(3000).fadeIn(1500);
						}
						else
						{
							this.scrobbledIconElement.show();
						}
						
					}
			}
		},
		
		/**
		 * Расположить контейнер иконок
		 */
		redrawIconsContainer: function(state, trackInfo) 
		{
			if (state == 'stop' || state == 'load') 
			{
				this.scrobbled = false;
			};
			
			switch (state) 
			{
				case 'stop':
					this.iconsContainer.detach();
					this.scrobbled = false;
				break;
				
				default:
				
					// если иконок нет в DOM или надо изменить положение
					if (!$('#vkpatch_iconsContainer').length || trackInfo.aid != this.iconsContainerOwnerId) 
					{
						$('#audio'+trackInfo.aid).find('div.duration:first')
							.css('position','relative')
							.prepend(this.iconsContainer)
							
						this.iconsContainerOwnerId = trackInfo.aid;
					};
			};			
		}
});

vkPatch.init();