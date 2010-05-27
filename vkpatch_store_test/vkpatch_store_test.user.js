// ==UserScript==
// @name           vkPatch Store Test
// @namespace      http://klinifini.livejournal.com/
// @description    Тест vkPatch
// @include        http://vkontakte.ru/*
// ==/UserScript==

//alert('store test');
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

function init() 
{
	var storage = {
			set: function(){},
			get: function(){},
			remove: function(){}
	};
	if (typeof(localStorage) != 'undefined')
	{
		storage.get = function(name)
		{
			return localStorage[name];
		};
		
		storage.set = function(name,value)
		{
			localStorage[name] = value;
		};
		
		storage.remove = function(name)
		{
			delete localStorage[name];
		};
	}
	
	localStorage.setItem("height", "400");
	alert(localStorage.getItem("height"));
	//storage.set('testval','ope');
	//alert(storage.get('testval'));
}

jQuery_wait();