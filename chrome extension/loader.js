// Подгружаем на страницу ссылка на скрипт, чтобы обращаться к картинкам
var url = chrome.extension.getURL('');
loadScript(null,'var vkpatchUrl = "' + url+'";');

// подгружаем сам скрипт
var ver = '0.1';
loadScript(chrome.extension.getURL('vkpatch.user.js?'+Math.random()));

/**
 * Подключение кода
 * @param {scting} src - url к внешнему скрипту
 * @param {string} code - код
 */
function loadScript(src, code)
{
	var script = document.createElement('script');
	if (code)
	{
		script.innerHTML = code;
	}
	else
	{
		script.src = src;
	}
	script.type = 'text/javascript';
	script.charset = 'utf-8';
	window.document.getElementsByTagName('head')[0].appendChild(script);
};
