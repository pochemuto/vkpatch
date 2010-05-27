// ==UserScript==
// @name           vkPatch Store Test Chrome loader
// @namespace      http://klinifini.livejournal.com/
// @description    Тест vkPatch
// @include        http://vkontakte.ru/*
// ==/UserScript==

console.log('store test script Chrome loader');

// Загрузка скрипта
var jQueryScript = document.createElement('script');
jQueryScript.src = 'http://localhost/vkpatch/sources/vkpatch_store_test/vkpatch_store_test.user.js';
jQueryScript.type = 'text/javascript';
window.document.getElementsByTagName('head')[0].appendChild(jQueryScript);
