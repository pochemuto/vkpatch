## Режим debug ##
### Влючение ###
```
javascript:
function setCookie(name, value, days) {
	if (days)
	{
		var expires_date = new Date( (new Date()).getTime() + (days * 24 * 60 * 60 * 1000) );
		var expires = "; expires=" + expires_date.toGMTString();
	}
	else
	{
		var expires = '';
	};
	document.cookie = name + "=" + escape(value) + expires
};
setCookie('vkpatch_debug','1',365);
```

### Отключение ###
```
javascript:
function delCookie(name) {
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
};
delCookie('vkpatch_debug');
```

### Отладка загрузчика в Firefox ###
в `about:config` Логический параметр
`extensions.vkpatch.DebugMode = true`