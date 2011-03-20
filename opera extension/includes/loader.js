// ==UserScript==
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// ==/UserScript==

function executeScript(code)
{
	with(window)
	{
		eval(code);
	};
};

opera.extension.onmessage = function(event)
{
	/*
	 * Получено сообщение от background.js
	 */
	var data = event.data;
	//window.opera.postError(data);
	
	/*
	 * Опытным путём установлено, что нужно вынести в отдельную ф-ию выполнение скрипты
	 * Очевидно связано с контекстами
	 */
	executeScript(data);
};

window.addEventListener('DOMContentLoaded', function() 
{
	/*
	 * DOM страницы готов
	 */
	// отправляем background.js сообщение, чтобы он вернул нам содержимое скрипта
	opera.extension.postMessage('getScriptContent');
	
}, false);
