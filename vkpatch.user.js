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
			
			vkPatch.events.pageChanged.bind(function()
			{
				vkPatch.page.parseGet();
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
				vkPatch.events.audioStop.raise( vkPatch.audio.currentTrackInfo() );
			});
			
			vkPatch.sys.handleLazy('new_player.js/audioPlayer.setGraphics', function(state) 	// смена страницы
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
		// временный фикс для вкладки Приватность - сильное отличие в подключённых скриптах/стилях и самой страницы от других вкладок
		if (vkPatch.page.params.act == 'privacy')
		{
			location.href = 'http://vkontakte.ru/settings.php'+this.settingsHash;
			return false;
		};
		
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

		$('#messageWrap').remove();	// удаляем старое
		switch (type)
		{
			case 'error':
				var messageElement = vkPatch.iface.inlineError(message);
			break;
			
			case 'normal':
			default:
				var messageElement = vkPatch.iface.inlineMessage(message);
		}
		
		messageElement.insertBefore('#content > div.editorPanel');
		
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
			scrobbler: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			nowPlaying: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
			playingIcon: vkPatch.settings.create().def(true).category('kikuyutoo').done(),
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
				connectLastfmButton: 'Связать с аккаунтом Last.fm',
				disconnectLastfmButton: 'Отключить от '
			},
			
			connectSuccessMessage: 'Kikuyutoo подключён к ',
			connectErrorMessage: 'Ошибка подключения к last.fm: ',
			desconnectedMessage: 'Kikuyutoo отключён от профиля last.fm',
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
			blank: 'data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7'
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
			onScrobble: null
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
			function LastFM(options){var apiKey=options.apiKey||'';var apiSecret=options.apiSecret||'';var apiUrl=options.apiUrl||'http://ws.audioscrobbler.com/2.0/';var cache=options.cache||undefined;this.setApiKey=function(_apiKey){apiKey=_apiKey;};this.setApiSecret=function(_apiSecret){apiSecret=_apiSecret;};this.setApiUrl=function(_apiUrl){apiUrl=_apiUrl;};this.setCache=function(_cache){cache=_cache;};var internalCall=function(params,callbacks,requestMethod){if(requestMethod=='POST'){var html=document.getElementsByTagName('html')[0];var iframe=document.createElement('iframe');var doc;iframe.width=1;iframe.height=1;iframe.style.border='none';iframe.onload=function(){if(typeof(callbacks.success)!='undefined'){callbacks.success();}};html.appendChild(iframe);if(typeof(iframe.contentWindow)!='undefined'){doc=iframe.contentWindow.document;}else if(typeof(iframe.contentDocument.document)!='undefined'){doc=iframe.contentDocument.document.document;}else{doc=iframe.contentDocument.document;}doc.open();doc.clear();doc.write('<form method="post" action="'+apiUrl+'" id="form" accept-charset="UTF-8">');for(var param in params){doc.write('<input type="text" name="'+param+'" value="'+params[param]+'">');}doc.write('</form>');doc.write('<script type="application/x-javascript">');doc.write('document.getElementById("form").submit();');doc.write('</script>');doc.close();}else{var jsonp='jsonp'+new Date().getTime();var hash=auth.getApiSignature(params);if(typeof(cache)!='undefined'&&cache.contains(hash)&&!cache.isExpired(hash)){if(typeof(callbacks.success)!='undefined'){callbacks.success(cache.load(hash));}return;}params.callback=jsonp;params.format='json';window[jsonp]=function(data){if(typeof(cache)!='undefined'){var expiration=cache.getExpirationTime(params);if(expiration>0){cache.store(hash,data,expiration);}}if(typeof(data.error)!='undefined'){if(typeof(callbacks.error)!='undefined'){callbacks.error(data.error,data.message);}}else if(typeof(callbacks.success)!='undefined'){callbacks.success(data);}window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head){head.removeChild(script);}};var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");var array=[];for(var param in params){array.push(encodeURIComponent(param)+"="+encodeURIComponent(params[param]));}script.src=apiUrl+'?'+array.join('&').replace(/%20/g,'+');head.appendChild(script);}};var call=function(method,params,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;internalCall(params,callbacks,requestMethod);};var signedCall=function(method,params,session,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;if(session&&typeof(session.key)!='undefined'){params.sk=session.key;}params.api_sig=auth.getApiSignature(params);internalCall(params,callbacks,requestMethod);};this.album={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',');}signedCall('album.addTags',params,session,callbacks,'POST');},getBuylinks:function(params,callbacks){call('album.getBuylinks',params,callbacks);},getInfo:function(params,callbacks){call('album.getInfo',params,callbacks);},getTags:function(params,session,callbacks){signedCall('album.getTags',params,session,callbacks);},removeTag:function(params,session,callbacks){signedCall('album.removeTag',params,session,callbacks,'POST');},search:function(params,callbacks){call('album.search',params,callbacks);},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',');}signedCall('album.share',params,callbacks);}};this.artist={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',');}signedCall('artist.addTags',params,session,callbacks,'POST');},getCorrection:function(params,callbacks){call('artist.getCorrection',params,callbacks);},getEvents:function(params,callbacks){call('artist.getEvents',params,callbacks);},getImages:function(params,callbacks){call('artist.getImages',params,callbacks);},getInfo:function(params,callbacks){call('artist.getInfo',params,callbacks);},getPastEvents:function(params,callbacks){call('artist.getPastEvents',params,callbacks);},getPodcast:function(params,callbacks){call('artist.getPodcast',params,callbacks);},getShouts:function(params,callbacks){call('artist.getShouts',params,callbacks);},getSimilar:function(params,callbacks){call('artist.getSimilar',params,callbacks);},getTags:function(params,session,callbacks){signedCall('artist.getTags',params,session,callbacks);},getTopAlbums:function(params,callbacks){call('artist.getTopAlbums',params,callbacks);},getTopFans:function(params,callbacks){call('artist.getTopFans',params,callbacks);},getTopTags:function(params,callbacks){call('artist.getTopTags',params,callbacks);},getTopTracks:function(params,callbacks){call('artist.getTopTracks',params,callbacks);},removeTag:function(params,session,callbacks){signedCall('artist.removeTag',params,session,callbacks,'POST');},search:function(params,callbacks){call('artist.search',params,callbacks);},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',');}signedCall('artist.share',params,session,callbacks,'POST');},shout:function(params,session,callbacks){signedCall('artist.shout',params,session,callbacks,'POST');}};this.auth={getMobileSession:function(params,callbacks){params={username:params.username,authToken:md5(params.username+md5(params.password))};signedCall('auth.getMobileSession',params,null,callbacks);},getSession:function(params,callbacks){signedCall('auth.getSession',params,null,callbacks);},getToken:function(callbacks){signedCall('auth.getToken',null,null,callbacks);},getWebSession:function(callbacks){var previuousApiUrl=apiUrl;apiUrl='http://ext.last.fm/2.0/';signedCall('auth.getWebSession',null,null,callbacks);apiUrl=previuousApiUrl;}};this.chart={getHypedArtists:function(params,session,callbacks){call('chart.getHypedArtists',params,callbacks);},getHypedTracks:function(params,session,callbacks){call('chart.getHypedTracks',params,callbacks);},getLovedTracks:function(params,session,callbacks){call('chart.getLovedTracks',params,callbacks);},getTopArtists:function(params,session,callbacks){call('chart.getTopArtists',params,callbacks);},getTopTags:function(params,session,callbacks){call('chart.getTopTags',params,callbacks);},getTopTracks:function(params,session,callbacks){call('chart.getTopTracks',params,callbacks);}};this.event={attend:function(params,session,callbacks){signedCall('event.attend',params,session,callbacks,'POST');},getAttendees:function(params,session,callbacks){call('event.getAttendees',params,callbacks);},getInfo:function(params,callbacks){call('event.getInfo',params,callbacks);},getShouts:function(params,callbacks){call('event.getShouts',params,callbacks);},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',');}signedCall('event.share',params,session,callbacks,'POST');},shout:function(params,session,callbacks){signedCall('event.shout',params,session,callbacks,'POST');}};this.geo={getEvents:function(params,callbacks){call('geo.getEvents',params,callbacks);},getMetroArtistChart:function(params,callbacks){call('geo.getMetroArtistChart',params,callbacks);},getMetroHypeArtistChart:function(params,callbacks){call('geo.getMetroHypeArtistChart',params,callbacks);},getMetroHypeTrackChart:function(params,callbacks){call('geo.getMetroHypeTrackChart',params,callbacks);},getMetroTrackChart:function(params,callbacks){call('geo.getMetroTrackChart',params,callbacks);},getMetroUniqueArtistChart:function(params,callbacks){call('geo.getMetroUniqueArtistChart',params,callbacks);},getMetroUniqueTrackChart:function(params,callbacks){call('geo.getMetroUniqueTrackChart',params,callbacks);},getMetroWeeklyChartlist:function(params,callbacks){call('geo.getMetroWeeklyChartlist',params,callbacks);},getMetros:function(params,callbacks){call('geo.getMetros',params,callbacks);},getTopArtists:function(params,callbacks){call('geo.getTopArtists',params,callbacks);},getTopTracks:function(params,callbacks){call('geo.getTopTracks',params,callbacks);}};this.group={getHype:function(params,callbacks){call('group.getHype',params,callbacks);},getMembers:function(params,callbacks){call('group.getMembers',params,callbacks);},getWeeklyAlbumChart:function(params,callbacks){call('group.getWeeklyAlbumChart',params,callbacks);},getWeeklyArtistChart:function(params,callbacks){call('group.getWeeklyArtistChart',params,callbacks);},getWeeklyChartList:function(params,callbacks){call('group.getWeeklyChartList',params,callbacks);},getWeeklyTrackChart:function(params,callbacks){call('group.getWeeklyTrackChart',params,callbacks);}};this.library={addAlbum:function(params,session,callbacks){signedCall('library.addAlbum',params,session,callbacks,'POST');},addArtist:function(params,session,callbacks){signedCall('library.addArtist',params,session,callbacks,'POST');},addTrack:function(params,session,callbacks){signedCall('library.addTrack',params,session,callbacks,'POST');},getAlbums:function(params,callbacks){call('library.getAlbums',params,callbacks);},getArtists:function(params,callbacks){call('library.getArtists',params,callbacks);},getTracks:function(params,callbacks){call('library.getTracks',params,callbacks);}};this.playlist={addTrack:function(params,session,callbacks){signedCall('playlist.addTrack',params,session,callbacks,'POST');},create:function(params,session,callbacks){signedCall('playlist.create',params,session,callbacks,'POST');},fetch:function(params,callbacks){call('playlist.fetch',params,callbacks);}};this.radio={getPlaylist:function(params,session,callbacks){signedCall('radio.getPlaylist',params,session,callbacks);},search:function(params,session,callbacks){signedCall('radio.search',params,session,callbacks);},tune:function(params,session,callbacks){signedCall('radio.tune',params,session,callbacks);}};this.tag={getInfo:function(params,callbacks){call('tag.getInfo',params,callbacks);},getSimilar:function(params,callbacks){call('tag.getSimilar',params,callbacks);},getTopAlbums:function(params,callbacks){call('tag.getTopAlbums',params,callbacks);},getTopArtists:function(params,callbacks){call('tag.getTopArtists',params,callbacks);},getTopTags:function(callbacks){call('tag.getTopTags',null,callbacks);},getTopTracks:function(params,callbacks){call('tag.getTopTracks',params,callbacks);},getWeeklyArtistChart:function(params,callbacks){call('tag.getWeeklyArtistChart',params,callbacks);},getWeeklyChartList:function(params,callbacks){call('tag.getWeeklyChartList',params,callbacks);},search:function(params,callbacks){call('tag.search',params,callbacks);}};this.tasteometer={compare:function(params,callbacks){call('tasteometer.compare',params,callbacks);},compareGroup:function(params,callbacks){call('tasteometer.compareGroup',params,callbacks);}};this.track={addTags:function(params,session,callbacks){signedCall('track.addTags',params,session,callbacks,'POST');},ban:function(params,session,callbacks){signedCall('track.ban',params,session,callbacks,'POST');},getBuylinks:function(params,callbacks){call('track.getBuylinks',params,callbacks);},getCorrection:function(params,callbacks){call('track.getCorrection',params,callbacks);},getFingerprintMetadata:function(params,callbacks){call('track.getFingerprintMetadata',params,callbacks);},getInfo:function(params,callbacks){call('track.getInfo',params,callbacks);},getShouts:function(params,callbacks){call('track.getShouts',params,callbacks);},getSimilar:function(params,callbacks){call('track.getSimilar',params,callbacks);},getTags:function(params,session,callbacks){signedCall('track.getTags',params,session,callbacks);},getTopFans:function(params,callbacks){call('track.getTopFans',params,callbacks);},getTopTags:function(params,callbacks){call('track.getTopTags',params,callbacks);},love:function(params,session,callbacks){signedCall('track.love',params,session,callbacks,'POST');},removeTag:function(params,session,callbacks){signedCall('track.removeTag',params,session,callbacks,'POST');},scrobble:function(params,session,callbacks){if(params.constructor.toString().indexOf("Array")!=-1){var p={};for(i in params){for(j in params[i]){p[j+'['+i+']']=params[i][j];}}params=p;}signedCall('track.scrobble',params,session,callbacks,'POST');},search:function(params,callbacks){call('track.search',params,callbacks);},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',');}signedCall('track.share',params,session,callbacks,'POST');},unban:function(params,session,callbacks){signedCall('track.unban',params,session,callbacks,'POST');},unlove:function(params,session,callbacks){signedCall('track.unlove',params,session,callbacks,'POST');},updateNowPlaying:function(params,session,callbacks){signedCall('track.updateNowPlaying',params,session,callbacks,'POST');}};this.user={getArtistTracks:function(params,callbacks){call('user.getArtistTracks',params,callbacks);},getBannedTracks:function(params,callbacks){call('user.getBannedTracks',params,callbacks);},getEvents:function(params,callbacks){call('user.getEvents',params,callbacks);},getFriends:function(params,callbacks){call('user.getFriends',params,callbacks);},getInfo:function(params,callbacks){call('user.getInfo',params,callbacks);},getLovedTracks:function(params,callbacks){call('user.getLovedTracks',params,callbacks);},getNeighbours:function(params,callbacks){call('user.getNeighbours',params,callbacks);},getNewReleases:function(params,callbacks){call('user.getNewReleases',params,callbacks);},getPastEvents:function(params,callbacks){call('user.getPastEvents',params,callbacks);},getPersonalTracks:function(params,callbacks){call('user.getPersonalTracks',params,callbacks);},getPlaylists:function(params,callbacks){call('user.getPlaylists',params,callbacks);},getRecentStations:function(params,session,callbacks){signedCall('user.getRecentStations',params,session,callbacks);},getRecentTracks:function(params,callbacks){call('user.getRecentTracks',params,callbacks);},getRecommendedArtists:function(params,session,callbacks){signedCall('user.getRecommendedArtists',params,session,callbacks);},getRecommendedEvents:function(params,session,callbacks){signedCall('user.getRecommendedEvents',params,session,callbacks);},getShouts:function(params,callbacks){call('user.getShouts',params,callbacks);},getTopAlbums:function(params,callbacks){call('user.getTopAlbums',params,callbacks);},getTopArtists:function(params,callbacks){call('user.getTopArtists',params,callbacks);},getTopTags:function(params,callbacks){call('user.getTopTags',params,callbacks);},getTopTracks:function(params,callbacks){call('user.getTopTracks',params,callbacks);},getWeeklyAlbumChart:function(params,callbacks){call('user.getWeeklyAlbumChart',params,callbacks);},getWeeklyArtistChart:function(params,callbacks){call('user.getWeeklyArtistChart',params,callbacks);},getWeeklyChartList:function(params,callbacks){call('user.getWeeklyChartList',params,callbacks);},getWeeklyTrackChart:function(params,callbacks){call('user.getWeeklyTrackChart',params,callbacks);},shout:function(params,session,callbacks){signedCall('user.shout',params,session,callbacks,'POST');}};this.venue={getEvents:function(params,callbacks){call('venue.getEvents',params,callbacks);},getPastEvents:function(params,callbacks){call('venue.getPastEvents',params,callbacks);},search:function(params,callbacks){call('venue.search',params,callbacks);}};var auth={getApiSignature:function(params){var keys=[];var string='';for(var key in params){keys.push(key);}keys.sort();for(var index in keys){var key=keys[index];string+=key+params[key];}string+=apiSecret;return md5(string);}};}
			
			this.lastfm = new LastFM(
				{
					apiKey: this.apiKey,
					apiSecret: this.apiSecret
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
			
			/*
			 * Иконка при воспроизведении и паузе
			 */
			if (this.settings.playingIcon.get())
			{
				var icon = $('<img style="border: 0px; margin-bottom: -2px; margin-right: 4px; margin-left: -16px; z-index: 99999; position: relative; width: 12px; height: 12px;">');
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
			
			
			this.events.onScrobble.raise(trackInfo, timestamp);
		},
		
		/**
		 * Обработчик нажатия кнопки
		 */
		connectButtonHandler: function() 
		{
			if (!this.connected) 
			{
				location.href = 'http://www.last.fm/api/auth/?api_key=' + this.apiKey + '&cb=http://vkontakte.ru/settings.php?show=vkpatch';
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
	
		// jQuery-объект содержащий img иконки при воспроизведении
		playingIconElement: null,
		
		// Номер кадра иконки, на котором остановилось проигрывание
		pausedIconFrame: null,
		
		// id контейнера, содержащего иконку
		playingIconContainerId: null,
		
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
			
			// если иконок нет в DOM или надо изменить положение
			if (!$('#vkpatch_playing_icon').length || track.aid != this.playingIconContainerId) 
			{
				$('#audio'+track.aid).find('div.duration:first')
					.prepend(this.playingIconElement)
					.prepend(this.pausedIconElement);
					
				this.playingIconContainerId = track.aid;
			}
			
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
		}
});

vkPatch.init();