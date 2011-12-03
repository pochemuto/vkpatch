opera.extension.onconnect = function(event)  {
	// код выполняется при запуске loader.js
};

/**
 * Получить содержимое локального файла
 * @param {string} path - относительный путь к файлу из папки opera extension
 */
function getFileContents(path)
{
	// Try to get the contents of the file.
	var req = new XMLHttpRequest();
	req.open('GET', path, false);
	req.send();
	
	// Error check for reading the file.
	if (!req.responseText) 
	{
		opera.postError('ERROR: Can\'t read ' + path);
	}
	
	return req.responseText;
};
		
opera.extension.onmessage = function(event) {
	/*
	 * Получено сообщение от loader.js
	 */
	var data = event.data;
	if (data.action) 
	{
		switch (data.action)
		{
			case 'widgetUrl':
				
				// отправляем loader.js адрес текущего плагина в опере
				event.source.postMessage(document.location.host);
				
				break;
				
			case 'scriptContent':
				
				// отправляем loader.js содержимое файла скрипта
				if (data.plugin == 'core') 
				{
					var filepath = 'vkpatch.user.js';
				}
				else 
				{
					filepath = 'plugins/' + data.plugin + '.js';
				}
				event.source.postMessage({
					action: 'execute',
					source: getFileContents(filepath)
				});
				
				break;
		}
	};
	
};

