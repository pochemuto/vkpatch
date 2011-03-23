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
			vkPatch.page.requireScript('http://code.jquery.com/jquery-1.4.2.min.js',vkPatch.load.step1);
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
			 * Кодирование/декодирование строк из/в html
			 * htmlEncode(string) - кодирование
			 * htmlDecode(string) - декодирование
			 * http://www.strictly-software.com/htmlencode
			 */
			vkPatch.encoder={EncodeType:"entity",isEmpty:function(val){if(val){return((val===null)||val.length==0||/^\s+$/.test(val))}else{return true}},HTML2Numerical:function(s){var arr1=new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&Oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');var arr2=new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;');return this.swapArrayVals(s,arr1,arr2)},NumericalToHTML:function(s){var arr1=new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;');var arr2=new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&Oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');return this.swapArrayVals(s,arr1,arr2)},numEncode:function(s){if(this.isEmpty(s))return"";var e="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c<" "||c>"~"){c="&#"+c.charCodeAt()+";"}e+=c}return e},htmlDecode:function(s){var c,m,d=s;if(this.isEmpty(d))return"";d=this.HTML2Numerical(d);arr=d.match(/&#[0-9]{1,5};/g);if(arr!=null){for(var x=0;x<arr.length;x++){m=arr[x];c=m.substring(2,m.length-1);if(c>=-32768&&c<=65535){d=d.replace(m,String.fromCharCode(c))}else{d=d.replace(m,"")}}}return d},htmlEncode:function(s,dbl){if(this.isEmpty(s))return"";dbl=dbl|false;if(dbl){if(this.EncodeType=="numerical"){s=s.replace(/&/g,"&#38;")}else{s=s.replace(/&/g,"&amp;")}}s=this.XSSEncode(s,false);if(this.EncodeType=="numerical"||!dbl){s=this.HTML2Numerical(s)}s=this.numEncode(s);if(!dbl){s=s.replace(/&#/g,"##AMPHASH##");if(this.EncodeType=="numerical"){s=s.replace(/&/g,"&#38;")}else{s=s.replace(/&/g,"&amp;")}s=s.replace(/##AMPHASH##/g,"&#")}s=s.replace(/&#\d*([^\d;]|$)/g,"$1");if(!dbl){s=this.correctEncoding(s)}if(this.EncodeType=="entity"){s=this.NumericalToHTML(s)}return s},XSSEncode:function(s,en){if(!this.isEmpty(s)){en=en||true;if(en){s=s.replace(/\'/g,"&#39;");s=s.replace(/\"/g,"&quot;");s=s.replace(/</g,"&lt;");s=s.replace(/>/g,"&gt;")}else{s=s.replace(/\'/g,"&#39;");s=s.replace(/\"/g,"&#34;");s=s.replace(/</g,"&#60;");s=s.replace(/>/g,"&#62;")}return s}else{return""}},hasEncoded:function(s){if(/&#[0-9]{1,5};/g.test(s)){return true}else if(/&[A-Z]{2,6};/gi.test(s)){return true}else{return false}},stripUnicode:function(s){return s.replace(/[^\x20-\x7E]/g,"")},correctEncoding:function(s){return s.replace(/(&amp;)(amp;)+/,"$1")},swapArrayVals:function(s,arr1,arr2){if(this.isEmpty(s))return"";var re;if(arr1&&arr2){if(arr1.length==arr2.length){for(var x=0,i=arr1.length;x<i;x++){re=new RegExp(arr1[x],'g');s=s.replace(re,arr2[x])}}}return s},inArray:function(item,arr){for(var i=0,x=arr.length;i<x;i++){if(arr[i]===item){return i}}return-1}};
			
			vkPatch.load.step2();
		},
		
		/**
		 * Инициализация модулей vkPatch и выполнение
		 */
		step2: function()
		{
			// Определение браузера и задание специфичный параметров
			vkPatch.browser.determine();
			
			// объявление событий
			vkPatch.events = _.map(vkPatch.events, function(item, name)
			{
				return new vkPatch.event(name);
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
				
				vkPatch.browser.console = opera;
				vkPatch.browser.log = opera.postError;
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
				}
				vkPatch.events.pageChanged.raise(loc.split('?')[0]);
			});
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
					vkPatch.log('load script: ');

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
			
		}
		
	},
	
	/**
	 * Системные методы
	 */
	sys: 
	{
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
		 * @param {Object} after - функция выполняемая после оригинальной
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

			return vkPatch.sys.extend(property, function(original) 
			{
				return function() 
				{
					var args = before.apply(context, arguments);
					// если ф-ия не вернула новые аргументы, то используем оригинальные
					if (!args) 
					{
						args = arguments;
					};

					original.apply(this, args);
					
					after.apply(context, args);
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
		}
	},

	/**
	 * Конструктор события vkPatch
	 * @param {string} name - имя события
	 */
	event: function(name)
	{
		// обработчики
		var handlers = [];
		
		var name = name;
		
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
			vkPatch.log(name + ' raised: '+[].join.call(arguments,', '));
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
					vkPatch.events.audioPlay.raise(trackInfo);
				}
			});

			vkPatch.sys.handleLazy('new_player.js/audioPlayer.stop', function()
			{
				vkPatch.events.audioStop.raise( vkPatch.audio.currentTrackInfo() );
			});
			
			vkPatch.sys.handleLazy('new_player.js/audioPlayer.setGraphics', function(state) 	// смена страницы
			{
				var trackInfo = vkPatch.audio.currentTrackInfo();

				vkPatch.events.audioRedraw.raise(state, trackInfo);
			});
		},
		
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
			var artist = this.artist = vkPatch.encoder.htmlDecode(arr[5]);
			// название трека
			var title = this.title = vkPatch.encoder.htmlDecode(arr[6]);
			
			this.toString = function() 
			{
				return artist + ' - ' + title + ' (' + dur + ')';
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
			 * @param {function} handler - действие, которое будет выполнено при нажатии
			 */
			this.button = function(handler)
			{
				node.buttonHandler = handler;
				return this;
			};
			
			/**
			 * Тип параметра - панель. Просто выводится на настройках
			 * @param {string,function} html - код или функция, котора его возвращает
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
							vkPatch.plugins.pages[p].push(func);
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
				};
				
				/*
				 * Выполнение собственных функции инициализации в плагинах
				 */
				oldHandler = _window.onerror;
				_window.onerror = vkPatch.plugins.errorHandler;
				vkPatch.plugins.current = plugin;
				try
				{
					plugin.init.call(plugin);
				}
				catch (err)
				{
					vkPatch.plugins.errorHandler(err.name + ': ' + err.message, null, 'exception',null);
				}
				_window.onerror = oldHandler
				
			};
		},
			
		pageChangedHandler: function(page) 
		{
			if (vkPatch.plugins.pages[page])
			{
				_.each(vkPatch.plugins.pages[page], function(func) 
				{
					func();	// выполняем фукнцию, связанную с этой страницей
				});
			};
		},
		
		errorHandler: function(desc,page,line,chr)
		{
			vkPatch.log('Error. Plugin ' + vkPatch.plugins.current.name + '. ' + desc + ', line: ' + line);
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
			return $('<div id="messageWrap"><div style="margin: 0px;" class="msg">'+message+'</div></div>');
		},
		
		/*
		 * Рамка с сообщением об ошибке
		 * @return jQuery-объект
		 */
		inlineError: function(message)
		{
			return $('<div id="messageWrap"><div style="margin: 0px;" id="error">'+message+'</div></div>');
		},
		
		/**
		 * Привязать подсказку к элементу
		 * @param {object} element - элемент DOM
		 * @param {string} message - текст подсказки
		 */
		tooltip: function(element, message) 
		{
			element = $(element).get(0);
			
			// настройки для простого тултипа - копипаст с settings.php
			var tooltip = function aboutTooltip(target, options)
			{
				return new BaseTooltip(target, extend({
					className: 'base_tooltip tt_no_footer',
					shift: [0, 10, 0, 1, 15],
					contentTemplate: '<div class="tt_content" style="padding: 10px;">{text}</div>'
				}, options));
			}
			
			
			// вешаем тултип
			$(element).mouseover( jQuery.proxy(_window, function() 
			{
				_window.showTT($(element).get(0), tooltip, '', {
			  		params: {text: message}
				})
			}));
		}
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
					_timeLeft = +new Date - _startTime;
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
		
		if (autostart) 
		{
			_start();
		}
	},
	
	console_browser: function(){},
	log: function(mess) {
		// вызываем в контексте консоли
		vkPatch.browser.log.call( vkPatch.browser.console, mess );
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

	},
	
	resources: 
	{
		tabIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBElEQVR4nHWSa0iTYRTH/+/zbm6+28plS0OXNS276C4GlYhFXr5U3uhKVBQVBUVB0AWKDAqxL32R6CLdPkVElKJ0EZdOKbJlK8t1WTedkbm1ze3Vxd73efpQFpr+4cDhcPgdzjl/YAIVF+ZpAcCSlUEKli3WTNTHj1d01J2oObjDdn1A1N/dWJK+smqfya5JMH1tdrxyTQgoW7VcqD668YBal/Qhz6rbMGNazGzOIIWWDLpKUA5O6nz707k4Jy20pSK94ns4sdPr7WMAwI0Abl4+eHhNUVJ1RAyFhLhhLWEiDyrid0QgDg2F1XxETRBR7D+XWVxzsaEZAMgIoK7Jcy0S/h7SxgUmE9nPQ/IDku9P+KFRDOh45lM63/BdX76hY9QK7bf31OTbVBuMhmEzR0MENAj3p+EPt1pIbfdn+syYODA7nv8hQA5BrRB5S1rQajNnJjW2fO3A0rwcbbR71xB7t4kxdwVjr4tZd2OBp7ysxDgyZcfmIstwuyDSx3GMtquZ7IhnT67MclqtVgUAYOfW8pwvLSves1f5jL20sXOnCqvHXvts5aL9cls8k1sF9uBspn3t6pI5AECy588gBTniQn28T/93X1VEPRZgNvrnQSJgEsFMvZg8NzliBAA+w5QmnN4t2gVlYBJoEKCDSNX7Z4fJ0vtO18d+ALhw3Lau1NpTBZlwkHkkqGMGTRxd4PSmXuYAoOpI0TaNKpqyvfD5IUEZ04FyiP5UDrl7Ex1alaRLnzqYC8oRUILXfXqP/W3K1d6AtutM7b36vz44tneJpXK96ykBlKAEoBwYJYDM/cspB+8Pbc+BW9nW23WNgVE+MBqkXEKJwumZ/tIfEnxM4gGJgMkETObR3TfF4/XrevSqWFJyAmf+z8reoKHT7ctuu9NhOGlJjVin66Lz7e7Uh0zmowmqmOFGp+nMeUfK9o6+lKZHrt62/v5+BgCKEYDL9YK6XC+aAWCFJbeVSvzMS+3pu02JYWPpgm+nvUFNV33D3QCA1rEfGldZWVmK8fKx+gVkCk2ZX8BevgAAAABJRU5ErkJggg=='
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
	
	pages: 
	{
		'settings': function()
		{
			var tabImg = $('<img>').attr('src',this.resources.tabIcon).css('margin','-2px 0px -4px 0px').css('height','16px');
			this.tab = vkPatch.iface.addTab(tabImg, $('#content > div.tBar:eq(0) > ul'),this.settingsHash).click(jQuery.proxy(this.tabClickHandler,this));
			// Если в адресе есть #vkpath, то активируем вкладку
			this.checkHash();
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
		// отменяем обработчик события поумолчанию
		// чтобы IE не брал страницу из кеша
		e.preventDefault();
		location.hash = this.settingsHash;
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
		this.tabContainer = $('#content > div.editorPanel').nextAll().remove().end().empty().append('<form mathod="get" action="#" name="vkPatchSettings" id="vkPatchSettings"></form>').find('form');
		
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
				this.categoryContainer = $('<div class="settingsPanel"></div>');
				this.categoryContainer.append('<h4 style="margin-top: 10px;">'+(vkPatch.lang.categories[categoryName]||categoryName)+'</h4>');
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
			
			
			
		};
		
		if (nothingShow) 	/* нет параметров для отображения */
		{
			vkPatch.iface.inlineMessage(this.lang.nothingShow).insertBefore('#content > div.editorPanel');
		}
		else
		{
			// Кнопка "сохранить"
			this.button('Сохранить', jQuery.proxy(this.save,this));	
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
		vkPatch.iface.inlineMessage(this.lang.saved).insertBefore('#content > div.editorPanel')
		
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
		var desc = option.desc || '';
		
		var label = $('<div style="display: inline-block; width: 200px;">'+title+':</div>');
		var input = $('<div style="display: inline-block;"><input type="text" class="inputText" id="'+option.name+'" name="'+option.name+'" value="'+option.get()+'" /></div>');
		
		this.categoryContainer.append(
				$('<div style="margin: 4px 0px"></div>').append(label).append(input)
			);
		
		// вешаем подсказку
		if (option.desc) 
		{
			vkPatch.iface.tooltip(label, option.desc);
		};
		
	},
	
	/*
	 * Булевский параметр
	 */
	booleanParam: function(option)
	{
		
		// Добавляем строку параметра
		var wrapperId = option.name + '_wrapper';
		this.categoryContainer.append('<div id="'+wrapperId+'"><input type="hidden" id="'+option.name+'" name="'+option.name+'" /></div>');
		
		
		var input = _window.ge(option.name);
		
		// Функцией ВКонтакте, преобразуем флажок
		new _window.Checkbox(input, {checked: option.get(), label: option.title,  onChange: function() { }});
		
		if (option.desc)
		{
			vkPatch.iface.tooltip( $('#' + wrapperId + ' > *:first'), option.desc);
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
	

		this.categoryContainer.append('<div style="margin: 4px 0px"><div style="display: inline-block; width: 200px">'+option.title+':</div><div style="display: inline-block;padding: 4px;"><a id="pp_'+option.name+'" style="cursor: pointer;" onclick="ppShow(\''+option.name+'\');">'+selected_title+'</a><span id="pp_custom_'+option.name+'"></span></div><input type="hidden" id="'+option.name+'" name="'+option.name+'" /></div>');
		_window.pp_options[option.name] = desc;
		_window.pp_selected[option.name] = selected_index;

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
			vkPatch.iface.tooltip(button, desc);
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
			playingIcon: vkPatch.settings.create().def(true).category('iface').done(),
			connectLastfm: vkPatch.settings.create().button(function(){}).category('iface').done()
		},
		
		lang:
		{
			settings: 
			{
				playingIcon: ['Иконка при прослушивании аудио','Показывать иконку напротив аудиозаписи при её проигрывании'],
				connectLastfm: 'Связать с аккаунтом Last.fm',
				disconnectLastfm: 'Отключить от <b></b>'
			},
			categories: {}
		},
		
		resources: 
		{
			playingIcon: 'data:image/gif;base64,R0lGODlhDAAMALMAAP///9bW1s7Ozr29vbW1ta2traWlpZycnJSUlIyMjAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQEBQD/ACwAAAAADAAMAAAEORAEQisNQJRdKDeCIXKbKB7oYQBAiiIwcrAxnCB0DiR8wvq7X+9H3A2DSB6ix+whBs3mADBYNp+ACAAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIXKbKB7oYaYoggDAAbt08gJ3nexw0vc7H0BIDP6GQERwGUQMmMwBYKBkOgERACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS70AfQEgE9o7DW3B5GzCDA8AAwUREIwAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIW4AUIjioR5GuapIjBylHCd2XSZ8n+y7HhDwIwqJQx7Cx8QNmr4BYLBkIqQRACH5BAQFAP8ALAAAAAAMAAwAAAQ4EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS9zsfQEgM/oZARHAZRAyYzAFgoGQ6AREAIfkEBAUA/wAsAAAAAAwADAAABDgQBEIrDUCUXSg3giFymyge6GGmKOIiBwC8boLI91wnvJz4vOAPMCwGfUiiTci0DZrCAWCAaCKkEQAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYoggBA6s7JC9h0osMJz+s9QHAI9Al/CKASiBgslwPAILlsAiIAIfkEBAUA/wAsAAAAAAwADAAABDYQBEIrDUCUXSg3giFymygeBwCYaIsgqqu+CQy8r5rsie4DvB7wFyTqasFkbaAMDgADhBLxjAAAIfkEBAUA/wAsAAAAAAwADAAABDcQBEIrDUCUXSg3giFymyge6GGmKIIAQOrOyQvMdKLDCc/rPUBwCPQJfwigEogYLJcDwCC5bAIiACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhpiiCAEDqzskL2HaiJzAP+Dtgr7cb/oiIoLI2WAYHgEFSiYBGAAAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYo4iIHALxuQstvoicyD/g7YK+3G/6IiKDSNlgGB4BBUomARgAAOw=='
		},
		
		pages: {},
		

		init: function()
		{
			if (this.settings.playingIcon.get())
			{
				// показывать иконку при воспроизведении
				this.playingIconElement = $('<img style="margin-bottom: -2px; margin-right: 4px; margin-left: -16px; z-index: 99999; position: relative;">')
				// вешаем обработчик на событие
				vkPatch.events.audioRedraw.bind($.proxy(this.redrawPlayingIcon,this));
			};			
		},
		
		/**
		 * jQuery-объект содержащий img иконки при воспроизведении
		 */
		playingIconElement: null,
		
		/**
		 * Обработчик события audioRedraw
		 * @param {string} state - состояние аудио
		 * @param {vkPatch.audio.trackInfo} track - информация о треке
		 */
		redrawPlayingIcon: function(state, track) 
		{
			switch (state)
			{
				case 'load':
					
					this.playingIconElement.attr('src',this.resources.playingIcon);
					
					$('#audio'+track.aid).find('div.duration:first')
					.prepend(this.playingIconElement);
					
				break;
			}
		}
});

vkPatch.init();