// ==UserScript==
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// @include http://vk.com/*
// @include http://*.vk.com/*
// ==/UserScript==

var include = ['settings', 'kikuyutoo'];
function executeScript(code)
{
	with (window) 
	{
		//eval(code);
		var script = window.document.createElement('script');
		script.text = code;
		window.document.head.appendChild(script);
	};
};

function scriptContent(plugin)
{
	// отправляем background.js сообщение, чтобы он вернул нам содержимое скрипта
	opera.extension.postMessage({
		action: 'scriptContent',
		plugin: plugin
	});
};

opera.extension.onmessage = function(event)
{
	/*
	 * Получено сообщение от background.js
	 */
	var data = event.data;
	//window.opera.postError(data);
	
	if (data.action) 
	{
		switch (data.action)
		{
			case 'execute':
				/*
				 * Опытным путём установлено, что нужно вынести в отдельную ф-ию выполнение скрипты
				 * Очевидно связано с контекстами
				 */
				executeScript(data.source);
			break;
		}
	}
	
	
};


window.addEventListener('DOMContentLoaded', function()
{
	/*
	 * DOM страницы готов
	 */
	scriptContent('core');
	
	for (var i=0; i<include.length; i++)
	{
		scriptContent( include[i] );
	};
	
}, false);
