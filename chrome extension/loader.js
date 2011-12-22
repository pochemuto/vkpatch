var pluginsFolder = "plugins/";

read( getUrl( pluginsFolder + 'list.txt' ), function(list)
{
	var pluginsNames = list.content.split(/[\n\r]+/);
	inject('vkpatch.user.js');
	for (var i = 0; i < pluginsNames.length; i++) 
	{
		inject( pluginsFolder + pluginsNames[i] + '.js');
	};
});

function getUrl(path) 
{
	return chrome.extension.getURL(path);
};

function inject(url) 
{
	loadScript( getUrl( url ), false, url );
};

function read(url, callback) 
{
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.onreadystatechange = function() 
	{
		try 
		{ 
			if (req.readyState == 4) 
			{
				if (req.status == 200) 
				{
					callback({
						content: req.responseText,
						url: url
					});
				}
				else 
				{
					//TODO: обработка ошибок 
				}
			}
		} 
		catch (e) 
		{
		}
	};
	
	req.send(null);
};

/**
 * Подключение кода
 * @param {scting} src - url к внешнему скрипту
 * @param {string} code - код
 */
function loadScript(src, code, scriptUrl)
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
	if (scriptUrl) 
	{
		script.setAttribute("data-source", scriptUrl); 
	};
	window.document.getElementsByTagName('head')[0].appendChild(script);
};
