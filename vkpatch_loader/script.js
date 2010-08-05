// ==UserScript==
// @name           vkPatch loader
// @namespace      http://klinifini.livejournal.com/
// @description    Загрузчик vkPatch
// @include        http://vkontakte.ru/*
// ==/UserScript==


// Загрузка скрипта
var jQueryScript = document.createElement('script');
jQueryScript.src = 'http://localhost/vkpatch/vkpatch.user.js?' + Math.random();
jQueryScript.type = 'text/javascript';
window.document.getElementsByTagName('head')[0].appendChild(jQueryScript);
