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
	switch (event.data)
	{
		case 'getWidgetUrl':
		
			// отправляем loader.js адрес текущего плагина в опере
			event.source.postMessage(document.location.host);
			
		break;
		
		case 'getScriptContent':
		
			// отправляем loader.js содержимое файла скрипта
			event.source.postMessage(getFileContents('vkpatch.user.js'));

		break;
	}
};

