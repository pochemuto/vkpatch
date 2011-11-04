vkPatch.plugins.add({
		/**
		 * Описания
		 */
		name: 'template',
		title: 'Шаблон модуля',
		desc: 'Описание модуля',
		
		/**
		 * Настройки
		 */
		settings:
		{
			display:       {def:true, category:'iface'},
		},
		
		lang:
		{
			settings: {},
			categories: {}
		},
		
		/**
		 * Ссылки на ресурсы, хранящиеся в resources/[имя плагина]/
		 */
		resources:
		{
			
		},
		
		/**
		 * Функции, привязанные к страницам
		 */
		pages: {},
		
		/**
		 * Инициализация плагина
		 */
		init: null
});