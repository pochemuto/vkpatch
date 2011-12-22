// ==UserScript==
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// @include http://vk.com/*
// @include http://*.vk.com/*
// ==/UserScript==
var log = widget.preferences.debugMode ? debug : function(){};

function debug(message) 
{
	var messagePrefix = "vkpatch :: ";
	console.log(messagePrefix + message);
};

function createScript(scriptContent, scriptUrl)
{
	var script = window.document.createElement('script');
	script.text = scriptContent;
	script.setAttribute("data-source", scriptUrl); 
	window.document.head.appendChild(script);
};

function ready(url)
{
	log('ready : ' + url);
	// отправляем background.js сообщение, что страница готова для инъекции
	opera.extension.postMessage({
		action: 'ready',
		url: url
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
			case 'createScript':
				/*
				 * Опытным путём установлено, что нужно вынести в отдельную ф-ию выполнение скрипты
				 * Очевидно связано с контекстами
				 */
				createScript(data.content, data.scriptUrl);
			break;
		}
	}
	
	
};


window.addEventListener('DOMContentLoaded', function()
{
	/*
	 * DOM страницы готов
	 */
	var hasBody = !!window.document.getElementById('page_body');
	if (hasBody)
	{
		ready(window.location.href);
	}
	
}, false);
