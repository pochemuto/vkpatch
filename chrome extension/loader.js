// Подгружаем на страницу ссылка на скрипт, чтобы обращаться к картинкам
var url = chrome.extension.getURL('');
loadScript(null,'var vkpatchUrl = "' + url+'";');

// подгружаем сам скрипт
loadScript(chrome.extension.getURL('vkpatch.user.js'));

var include = [];
for (var i=0; i<include.length; i++)
{
	loadScript( chrome.extension.getURL( 'plugins/' + include[i] + '.js' ) );
};

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
