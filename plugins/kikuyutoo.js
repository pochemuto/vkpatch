vkPatch.plugins.add({
		/**
		 * Kikuyutoo
		 */
		name: 'kikuyutoo',
		title: 'Скробблер Last.fm',
		desc: 'Скробблит ваши прослушивания, и обновляет информацию "Сейчас играет" в вашем профиле на Last.fm',
		
		settings: 
		{
			scrobbler:           {def:true, category:'kikuyutoo'},
			nowPlaying:          {def:true, category:'kikuyutoo'},
			playingIcon:         {def:true, category:'kikuyutoo'},
			scrobbledIcon:       {def:true, category:'kikuyutoo'},
			connectLastfmButton: {buttonHandler: 'connectButtonHandler', category:'kikuyutoo'},
			
			/*
			 * Скрытые
			 */
			token:      {def:null},
			session:    {def:null},
			username:   {def:null},
			connected:  {def:false}
		},
		
		lang:
		{
			settings: 
			{
				playingIcon: ['Иконка при прослушивании аудио','Показывать иконку напротив аудиозаписи при её проигрывании'],
				scrobbler: ['Скробблить аудиозаписи','Когда песня "скробблится" это означает, что ты слушаешь песню, после чего ее название отправляется на <a href="http://www.lastfm.ru" target="_blank">Last.fm</a> и добавляется в твой музыкальный профиль'],
				nowPlaying: ['Обновлять «Cейчас проигрывается» на Last.fm','Аудиозапись, которую Вы сейчас слушаете, будет отображаться в вашем профиле Last.fm. Эта опция не влияет на скробблинг'],
				scrobbledIcon: ['Иконка у заскроббленной аудиозаписи','Когда аудиозапись будет заскробблена, напротив неё появится иконка'],
				connectLastfmButton: 'Связать с аккаунтом Last.fm',
				disconnectLastfmButton: 'Отключить от <b>{username}</b>'
			},
			
			connectSuccessMessage: 'Kikuyutoo подключён к {username}',
			connectErrorMessage: 'Ошибка подключения к last.fm: ',
			desconnectedMessage: 'Kikuyutoo отключён от профиля last.fm',
			scrobbledIconTooltip: 'Трек заскробблен',
			categories: 
			{
				kikuyutoo: 'Kikuyutoo'
			}
		},
		
		resources: 
		{
			playingIcon: 'data:image/gif;base64,R0lGODlhDAAMALMAAP///9bW1s7Ozr29vbW1ta2traWlpZycnJSUlIyMjAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQEBQD/ACwAAAAADAAMAAAEORAEQisNQJRdKDeCIXKbKB7oYQBAiiIwcrAxnCB0DiR8wvq7X+9H3A2DSB6ix+whBs3mADBYNp+ACAAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIXKbKB7oYaYoggDAAbt08gJ3nexw0vc7H0BIDP6GQERwGUQMmMwBYKBkOgERACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS70AfQEgE9o7DW3B5GzCDA8AAwUREIwAh+QQEBQD/ACwAAAAADAAMAAAEOBAEQisNQJRdKDeCIW4AUIjioR5GuapIjBylHCd2XSZ8n+y7HhDwIwqJQx7Cx8QNmr4BYLBkIqQRACH5BAQFAP8ALAAAAAAMAAwAAAQ4EARCKw1AlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS9zsfQEgM/oZARHAZRAyYzAFgoGQ6AREAIfkEBAUA/wAsAAAAAAwADAAABDgQBEIrDUCUXSg3giFymyge6GGmKOIiBwC8boLI91wnvJz4vOAPMCwGfUiiTci0DZrCAWCAaCKkEQAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYoggBA6s7JC9h0osMJz+s9QHAI9Al/CKASiBgslwPAILlsAiIAIfkEBAUA/wAsAAAAAAwADAAABDYQBEIrDUCUXSg3giFymygeBwCYaIsgqqu+CQy8r5rsie4DvB7wFyTqasFkbaAMDgADhBLxjAAAIfkEBAUA/wAsAAAAAAwADAAABDcQBEIrDUCUXSg3giFymyge6GGmKIIAQOrOyQvMdKLDCc/rPUBwCPQJfwigEogYLJcDwCC5bAIiACH5BAQFAP8ALAAAAAAMAAwAAAQ3EARCKw1AlF0oN4IhcpsoHuhhpiiCAEDqzskL2HaiJzAP+Dtgr7cb/oiIoLI2WAYHgEFSiYBGAAAh+QQEBQD/ACwAAAAADAAMAAAENxAEQisNQJRdKDeCIXKbKB7oYaYo4iIHALxuQstvoicyD/g7YK+3G/6IiKDSNlgGB4BBUomARgAAOw==',
			
			// Кадры иконки проигрывания
			playingIconFrames: 'data:image/gif;base64,R0lGODlhhAAMAPcAAIyOjJSWlJyenKSmpKyurLS2tLy+vMzOzNTW1Pz+/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAhAAMAAAI/wATIChAsCBBBAkEGjSIUOHCgwkHFiCwsKHEiQwjPoTo8KHFjQU+bhTpUePIBAcIqBxAkMAAlwdSqqQ4cWXMmTRnDrg5s+XLnTJVtrQZNCdRnENhFk0KFGlNpUhxNl3J9MCAqzhdXt36UipXrF6/qkyoVWxYsyu/dtWpVmdZrlnVrlUpoO1ZAXjrJsybNwDerQL88vU7YK9fwYH1JuDbVzFexHkBH37892rivgkBMxa8FfJlzZvrWkYcoLTfhKYBmN6LurRq06cTwJ4toHWA16Zry3ZN2zbsvY95lwYeOCFuw4GFByCeuvfu27cBGJ+eAIB16dWNu77uWvt169Cpf8PvXn27dfHRr6NPj/11e/XlobMXb5z7be3zs+v/Tr86/Pff8bfff+IR6F+A/QnYXn3n7cfgggM2CKGCBUpY4YQPJmgggBge2CGFEX64YYYOeqihhSGeKCKKHKroYokgtgjjiP6xF6B7N9qXo4474rijeTkCeaOQARI5no1FIjmeAT0CYACTPT7ZpJRRQrkjlVdamSOWW2p5I5dfehmgAQkYgGQAZJZ5ZppmDsnmmgm1WeSbbsYJp5p14jmnnXnKuWQCAQEAOw==',
			
			// прозрачный однопиксельный png
			blank: 'data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7',
			
			// трек заскробблен
			scrobbled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNpi+v//PwMpmGXnjnUMhMCd7/v+q3A6MYLYTMQo1la0AdMgPgshxZryFgyW2j5A5/xjuPZg338mZEl0xepyxgwmGk4MRy6tASo+xgB0ViMTTFJDzhSuCexmGV0GA1UrhhNXtzLceHQGrBgo1cACklSV02FQUxVn+PpHnOHOs33/pSWFGRSU2BlO3FjP8PDpE7hisB9AnNuP9tX//veZQU1ZikFJSZCBmZGV4dbd5wyPnj5FUQwLpQaQ4IMnDxnu3HvNwMEsxHD33nusipFDCaSJ4c7TffUsTDwYzkAGyPEAtunu4xs4FWOLB7BNuBSDAECAAQBd15kZmJataAAAAABJRU5ErkJggg=='
		},
		
		pages: 
		{
			'settings': function()
			{
				
			}
		},
		
		events:
		{
			/*
			 * Трек заскробблен
			 * function(trackInfo, [время начала воспроизведения])
			 */
			scrobbled: null
		},

		init: function()
		{
			// md5 для LastFM
			var md5 = function(string){ return vkPatch.sys.md5( vkPatch.sys.utf8_encode(string) ) };
			var document = _window.document;
			/*
			 *
			 * Copyright (c) 2008-2010, Felix Bruns <felixbruns@web.de>
			 * https://github.com/fxb/javascript-last.fm-api/
			 */
			function LastFM(options){var apiKey=options.apiKey||'';var apiSecret=options.apiSecret||'';var apiUrl=options.apiUrl||'http://ws.audioscrobbler.com/2.0/';var cache=options.cache||undefined;var debug=typeof(options.debug)=='undefined'?false:options.debug;this.setApiKey=function(_apiKey){apiKey=_apiKey};this.setApiSecret=function(_apiSecret){apiSecret=_apiSecret};this.setApiUrl=function(_apiUrl){apiUrl=_apiUrl};this.setCache=function(_cache){cache=_cache};var internalCall=function(params,callbacks,requestMethod){if(requestMethod=='POST'){var html=document.getElementsByTagName('html')[0];var frameName='lastfmFrame_'+new Date().getTime();var iframe=document.createElement('iframe');html.appendChild(iframe);iframe.contentWindow.name=frameName;iframe.style.display="none";var doc;var formState='init';iframe.width=1;iframe.height=1;iframe.style.border='none';iframe.onload=function(){if(formState=='sent'){if(!debug){setTimeout(function(){html.removeChild(iframe);html.removeChild(form)},1500)}};formState='done';if(typeof(callbacks.success)!='undefined'){callbacks.success()}};var form=document.createElement('form');form.target=frameName;form.action=apiUrl;form.method="POST";form.acceptCharset="UTF-8";html.appendChild(form);for(var param in params){var input=document.createElement("input");input.type="hidden";input.name=param;input.value=params[param];form.appendChild(input)};formState='sent';form.submit()}else{var jsonp='jsonp'+new Date().getTime();var hash=auth.getApiSignature(params);if(typeof(cache)!='undefined'&&cache.contains(hash)&&!cache.isExpired(hash)){if(typeof(callbacks.success)!='undefined'){callbacks.success(cache.load(hash))}return}params.callback=jsonp;params.format='json';window[jsonp]=function(data){if(typeof(cache)!='undefined'){var expiration=cache.getExpirationTime(params);if(expiration>0){cache.store(hash,data,expiration)}}if(typeof(data.error)!='undefined'){if(typeof(callbacks.error)!='undefined'){callbacks.error(data.error,data.message)}}else if(typeof(callbacks.success)!='undefined'){callbacks.success(data)}window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)}};var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");var array=[];for(var param in params){array.push(encodeURIComponent(param)+"="+encodeURIComponent(params[param]))}script.src=apiUrl+'?'+array.join('&').replace(/%20/g,'+');head.appendChild(script)}};var call=function(method,params,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;internalCall(params,callbacks,requestMethod)};var signedCall=function(method,params,session,callbacks,requestMethod){params=params||{};callbacks=callbacks||{};requestMethod=requestMethod||'GET';params.method=method;params.api_key=apiKey;if(session&&typeof(session.key)!='undefined'){params.sk=session.key}params.api_sig=auth.getApiSignature(params);internalCall(params,callbacks,requestMethod)};this.album={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',')}signedCall('album.addTags',params,session,callbacks,'POST')},getBuylinks:function(params,callbacks){call('album.getBuylinks',params,callbacks)},getInfo:function(params,callbacks){call('album.getInfo',params,callbacks)},getTags:function(params,session,callbacks){signedCall('album.getTags',params,session,callbacks)},removeTag:function(params,session,callbacks){signedCall('album.removeTag',params,session,callbacks,'POST')},search:function(params,callbacks){call('album.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('album.share',params,callbacks)}};this.artist={addTags:function(params,session,callbacks){if(typeof(params.tags)=='object'){params.tags=params.tags.join(',')}signedCall('artist.addTags',params,session,callbacks,'POST')},getCorrection:function(params,callbacks){call('artist.getCorrection',params,callbacks)},getEvents:function(params,callbacks){call('artist.getEvents',params,callbacks)},getImages:function(params,callbacks){call('artist.getImages',params,callbacks)},getInfo:function(params,callbacks){call('artist.getInfo',params,callbacks)},getPastEvents:function(params,callbacks){call('artist.getPastEvents',params,callbacks)},getPodcast:function(params,callbacks){call('artist.getPodcast',params,callbacks)},getShouts:function(params,callbacks){call('artist.getShouts',params,callbacks)},getSimilar:function(params,callbacks){call('artist.getSimilar',params,callbacks)},getTags:function(params,session,callbacks){signedCall('artist.getTags',params,session,callbacks)},getTopAlbums:function(params,callbacks){call('artist.getTopAlbums',params,callbacks)},getTopFans:function(params,callbacks){call('artist.getTopFans',params,callbacks)},getTopTags:function(params,callbacks){call('artist.getTopTags',params,callbacks)},getTopTracks:function(params,callbacks){call('artist.getTopTracks',params,callbacks)},removeTag:function(params,session,callbacks){signedCall('artist.removeTag',params,session,callbacks,'POST')},search:function(params,callbacks){call('artist.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('artist.share',params,session,callbacks,'POST')},shout:function(params,session,callbacks){signedCall('artist.shout',params,session,callbacks,'POST')}};this.auth={getMobileSession:function(params,callbacks){params={username:params.username,authToken:md5(params.username+md5(params.password))};signedCall('auth.getMobileSession',params,null,callbacks)},getSession:function(params,callbacks){signedCall('auth.getSession',params,null,callbacks)},getToken:function(callbacks){signedCall('auth.getToken',null,null,callbacks)},getWebSession:function(callbacks){var previuousApiUrl=apiUrl;apiUrl='http://ext.last.fm/2.0/';signedCall('auth.getWebSession',null,null,callbacks);apiUrl=previuousApiUrl}};this.chart={getHypedArtists:function(params,session,callbacks){call('chart.getHypedArtists',params,callbacks)},getHypedTracks:function(params,session,callbacks){call('chart.getHypedTracks',params,callbacks)},getLovedTracks:function(params,session,callbacks){call('chart.getLovedTracks',params,callbacks)},getTopArtists:function(params,session,callbacks){call('chart.getTopArtists',params,callbacks)},getTopTags:function(params,session,callbacks){call('chart.getTopTags',params,callbacks)},getTopTracks:function(params,session,callbacks){call('chart.getTopTracks',params,callbacks)}};this.event={attend:function(params,session,callbacks){signedCall('event.attend',params,session,callbacks,'POST')},getAttendees:function(params,session,callbacks){call('event.getAttendees',params,callbacks)},getInfo:function(params,callbacks){call('event.getInfo',params,callbacks)},getShouts:function(params,callbacks){call('event.getShouts',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('event.share',params,session,callbacks,'POST')},shout:function(params,session,callbacks){signedCall('event.shout',params,session,callbacks,'POST')}};this.geo={getEvents:function(params,callbacks){call('geo.getEvents',params,callbacks)},getMetroArtistChart:function(params,callbacks){call('geo.getMetroArtistChart',params,callbacks)},getMetroHypeArtistChart:function(params,callbacks){call('geo.getMetroHypeArtistChart',params,callbacks)},getMetroHypeTrackChart:function(params,callbacks){call('geo.getMetroHypeTrackChart',params,callbacks)},getMetroTrackChart:function(params,callbacks){call('geo.getMetroTrackChart',params,callbacks)},getMetroUniqueArtistChart:function(params,callbacks){call('geo.getMetroUniqueArtistChart',params,callbacks)},getMetroUniqueTrackChart:function(params,callbacks){call('geo.getMetroUniqueTrackChart',params,callbacks)},getMetroWeeklyChartlist:function(params,callbacks){call('geo.getMetroWeeklyChartlist',params,callbacks)},getMetros:function(params,callbacks){call('geo.getMetros',params,callbacks)},getTopArtists:function(params,callbacks){call('geo.getTopArtists',params,callbacks)},getTopTracks:function(params,callbacks){call('geo.getTopTracks',params,callbacks)}};this.group={getHype:function(params,callbacks){call('group.getHype',params,callbacks)},getMembers:function(params,callbacks){call('group.getMembers',params,callbacks)},getWeeklyAlbumChart:function(params,callbacks){call('group.getWeeklyAlbumChart',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('group.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('group.getWeeklyChartList',params,callbacks)},getWeeklyTrackChart:function(params,callbacks){call('group.getWeeklyTrackChart',params,callbacks)}};this.library={addAlbum:function(params,session,callbacks){signedCall('library.addAlbum',params,session,callbacks,'POST')},addArtist:function(params,session,callbacks){signedCall('library.addArtist',params,session,callbacks,'POST')},addTrack:function(params,session,callbacks){signedCall('library.addTrack',params,session,callbacks,'POST')},getAlbums:function(params,callbacks){call('library.getAlbums',params,callbacks)},getArtists:function(params,callbacks){call('library.getArtists',params,callbacks)},getTracks:function(params,callbacks){call('library.getTracks',params,callbacks)}};this.playlist={addTrack:function(params,session,callbacks){signedCall('playlist.addTrack',params,session,callbacks,'POST')},create:function(params,session,callbacks){signedCall('playlist.create',params,session,callbacks,'POST')},fetch:function(params,callbacks){call('playlist.fetch',params,callbacks)}};this.radio={getPlaylist:function(params,session,callbacks){signedCall('radio.getPlaylist',params,session,callbacks)},search:function(params,session,callbacks){signedCall('radio.search',params,session,callbacks)},tune:function(params,session,callbacks){signedCall('radio.tune',params,session,callbacks)}};this.tag={getInfo:function(params,callbacks){call('tag.getInfo',params,callbacks)},getSimilar:function(params,callbacks){call('tag.getSimilar',params,callbacks)},getTopAlbums:function(params,callbacks){call('tag.getTopAlbums',params,callbacks)},getTopArtists:function(params,callbacks){call('tag.getTopArtists',params,callbacks)},getTopTags:function(callbacks){call('tag.getTopTags',null,callbacks)},getTopTracks:function(params,callbacks){call('tag.getTopTracks',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('tag.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('tag.getWeeklyChartList',params,callbacks)},search:function(params,callbacks){call('tag.search',params,callbacks)}};this.tasteometer={compare:function(params,callbacks){call('tasteometer.compare',params,callbacks)},compareGroup:function(params,callbacks){call('tasteometer.compareGroup',params,callbacks)}};this.track={addTags:function(params,session,callbacks){signedCall('track.addTags',params,session,callbacks,'POST')},ban:function(params,session,callbacks){signedCall('track.ban',params,session,callbacks,'POST')},getBuylinks:function(params,callbacks){call('track.getBuylinks',params,callbacks)},getCorrection:function(params,callbacks){call('track.getCorrection',params,callbacks)},getFingerprintMetadata:function(params,callbacks){call('track.getFingerprintMetadata',params,callbacks)},getInfo:function(params,callbacks){call('track.getInfo',params,callbacks)},getShouts:function(params,callbacks){call('track.getShouts',params,callbacks)},getSimilar:function(params,callbacks){call('track.getSimilar',params,callbacks)},getTags:function(params,session,callbacks){signedCall('track.getTags',params,session,callbacks)},getTopFans:function(params,callbacks){call('track.getTopFans',params,callbacks)},getTopTags:function(params,callbacks){call('track.getTopTags',params,callbacks)},love:function(params,session,callbacks){signedCall('track.love',params,session,callbacks,'POST')},removeTag:function(params,session,callbacks){signedCall('track.removeTag',params,session,callbacks,'POST')},scrobble:function(params,session,callbacks){if(params.constructor.toString().indexOf("Array")!=-1){var p={};for(i in params){for(j in params[i]){p[j+'['+i+']']=params[i][j]}}params=p}signedCall('track.scrobble',params,session,callbacks,'POST')},search:function(params,callbacks){call('track.search',params,callbacks)},share:function(params,session,callbacks){if(typeof(params.recipient)=='object'){params.recipient=params.recipient.join(',')}signedCall('track.share',params,session,callbacks,'POST')},unban:function(params,session,callbacks){signedCall('track.unban',params,session,callbacks,'POST')},unlove:function(params,session,callbacks){signedCall('track.unlove',params,session,callbacks,'POST')},updateNowPlaying:function(params,session,callbacks){signedCall('track.updateNowPlaying',params,session,callbacks,'POST')}};this.user={getArtistTracks:function(params,callbacks){call('user.getArtistTracks',params,callbacks)},getBannedTracks:function(params,callbacks){call('user.getBannedTracks',params,callbacks)},getEvents:function(params,callbacks){call('user.getEvents',params,callbacks)},getFriends:function(params,callbacks){call('user.getFriends',params,callbacks)},getInfo:function(params,callbacks){call('user.getInfo',params,callbacks)},getLovedTracks:function(params,callbacks){call('user.getLovedTracks',params,callbacks)},getNeighbours:function(params,callbacks){call('user.getNeighbours',params,callbacks)},getNewReleases:function(params,callbacks){call('user.getNewReleases',params,callbacks)},getPastEvents:function(params,callbacks){call('user.getPastEvents',params,callbacks)},getPersonalTracks:function(params,callbacks){call('user.getPersonalTracks',params,callbacks)},getPlaylists:function(params,callbacks){call('user.getPlaylists',params,callbacks)},getRecentStations:function(params,session,callbacks){signedCall('user.getRecentStations',params,session,callbacks)},getRecentTracks:function(params,callbacks){call('user.getRecentTracks',params,callbacks)},getRecommendedArtists:function(params,session,callbacks){signedCall('user.getRecommendedArtists',params,session,callbacks)},getRecommendedEvents:function(params,session,callbacks){signedCall('user.getRecommendedEvents',params,session,callbacks)},getShouts:function(params,callbacks){call('user.getShouts',params,callbacks)},getTopAlbums:function(params,callbacks){call('user.getTopAlbums',params,callbacks)},getTopArtists:function(params,callbacks){call('user.getTopArtists',params,callbacks)},getTopTags:function(params,callbacks){call('user.getTopTags',params,callbacks)},getTopTracks:function(params,callbacks){call('user.getTopTracks',params,callbacks)},getWeeklyAlbumChart:function(params,callbacks){call('user.getWeeklyAlbumChart',params,callbacks)},getWeeklyArtistChart:function(params,callbacks){call('user.getWeeklyArtistChart',params,callbacks)},getWeeklyChartList:function(params,callbacks){call('user.getWeeklyChartList',params,callbacks)},getWeeklyTrackChart:function(params,callbacks){call('user.getWeeklyTrackChart',params,callbacks)},shout:function(params,session,callbacks){signedCall('user.shout',params,session,callbacks,'POST')}};this.venue={getEvents:function(params,callbacks){call('venue.getEvents',params,callbacks)},getPastEvents:function(params,callbacks){call('venue.getPastEvents',params,callbacks)},search:function(params,callbacks){call('venue.search',params,callbacks)}};var auth={getApiSignature:function(params){var keys=[];var string='';for(var key in params){keys.push(key)}keys.sort();for(var index in keys){var key=keys[index];string+=key+params[key]}string+=apiSecret;return md5(string)}}}
												
			this.lastfm = new LastFM(
				{
					apiKey: this.apiKey,
					apiSecret: this.apiSecret,
					debug: vkPatch.debug
				});
			
			/*
			 * Обновление вкладки настроек, в зависимости от связи с lastfm
			 */
			vkPatch.plugins.settings.events.tabActivated.bind(this.setConnectStatus, this);
			
			
			this.iconsContainer = $('<div class="duration" style="border: 0px; z-index: 2; right: 28px; position: absolute; text-align: right; width: 72px; height: 12px;"></div>');
			this.iconsContainer.attr('id','vkpatch_iconsContainer');
			
			// иконка напротив трека
			var icon = this.iconTemplate = $('<img style="border: 0px; width: 12px; height: 12px; margin-left: 2px; margin-right: 2px;">').css('display', 'inline-block');
			vkPatch.events.audioRedraw.bind(this.redrawIconsContainer, this);

			this.settings.nowPlaying.onchange(this.nowPlayingChange, this);
			this.settings.scrobbler.onchange(this.scrobblerChange, this);
			this.settings.scrobbledIcon.onchange(this.scrobbledIconChange, this);
			this.settings.connected.onchange(function(value)
			{
				this.nowPlayingChange();
				this.scrobblerChange();	
				this.scrobbledIconChange();
				this.setConnectStatus();
				this.log(value ? 'соединён' : 'не соединён с last.fm');
			}, this);
			
			this.settings.session.onchange(function(value)
			{
				this.settings.connected.set(!!value);
			}, this);

			/*
			 * Иконка при воспроизведении и паузе
			 */
			this.settings.playingIcon.onchange(function(value)
			{
				if (value)
				{
					this.playingIconElement = this.playingIconElement || icon.clone().data('position', 1).attr('src',this.resources.playingIcon).attr('id','vkpatch_playing_icon');
					this.pausedIconElement = this.pausedIconElement || icon.clone().data('position', 1).attr('src',this.resources.blank).css('background-image','url("'+this.resources.playingIconFrames+'")');
					vkPatch.events.audioRedraw.bind(this.redrawPlayingIcon, this, true);
				}
				else
				{
					vkPatch.events.audioRedraw.unbind(this.redrawPlayingIcon, this);
					this.setPlayingIcon('hide');
				}
			}, this);
			
			/*
			 * Получен токен для авторизации
			 */
			if (vkPatch.page.params.token) 
			{
				this.log('получен токен');
				this.settings.token.set(vkPatch.page.params.token);
				
				// ожидаем, когда оба события произойдут - появится таб настроек и свяжется с lastfm
				var tabActivated = false, message = null, delay, type;
				
				var showMessage = jQuery.proxy(function() 
				{
					// сообщение - флаг результата связи с lastfm
					if (!!message && tabActivated) 
					{
						vkPatch.plugins.settings.showMessage(message, type, delay);
						
						// меняем текст кнопки
						this.setConnectStatus();
					}
				},this);
				
				// когда активирована вкладка настроект vkPatch
				vkPatch.plugins.settings.events.tabActivated.bind(function()
				{
					
					tabActivated = true;
					showMessage.call(this);
					
				}, this);
				
				// делаем запрос сессии
				this.lastfm.auth.getSession(
				{
					token: vkPatch.page.params.token
				},
				{
					success: jQuery.proxy(function(data)
					{
						/*
						 * Успешно
						 */
						// сохраняем имя и сессию в память
						this.settings.username.set(data.session.name);
						this.settings.session.set(data.session.key);
						
						this.log('получена сессия');
						
						// выводим сообщение
						message = jQuery.nano(this.lang.connectSuccessMessage, {username: this.settings.username.get()});
						delay = 15000;
						showMessage();
						
					},this),
					error: jQuery.proxy(function(code, text)
					{
						/*
						 * Ошибка
						 */						
						message = this.lang.connectErrorMessage + text;
						type = 'error';
						showMessage();
						
					},this)
				});

			};
			
		},
		
		/**********************
		 *      Last.fm
		 *********************/
		apiKey: 'bd51d4cc4ae2ce6be98e4008c6ba60e4',
		apiSecret: 'f1ce75e817a2a4e2701357aa47405d4e',
		
		// объект LastFM by Felix Bruns
		lastfm: null,
		
		// Таймер, по которому происходит скробблинг
		timer: null,
		// индикатор, что трек заскробблен
		scrobbled: false,
		
		/**
		 * Отключить от профиля last.fm 
		 */
		disconnect: function()
		{
			this.settings.token.set(null);
			this.settings.session.set(null);
			this.settings.username.set(null);
		},
		
		/**
		 * Новый таймер скробблинга
		 * @param {Object} trackInfo
		 */
		scrobblerInitTimer: function(trackInfo)
		{
			this.scrobbled = false;
			
			// если таймер был уже создан, значит из предыдущего проигрывания
			if (this.timer) 
			{
				// он возможно ещё не сработал, поэтому сбрасываем его явно
				this.timer.stop();
			};
			
			if (trackInfo.duration > 30)	// длина трека должна быть дольше 30-ти секунд - требование last.fm
			{
				var delay = trackInfo.duration/2
				if (delay > 240) // максимальная граница скробблинга - через 240 секунд, независимо от длины трека
				{
					delay = 240;
				};
				
				// создаём новый таймер
				this.timer = new vkPatch.sys.timer(jQuery.proxy(function()
				{
					this.scrobble(trackInfo, this.getUTC());
					
				},this), delay*1000, false);
			};
		
		},
		
		/**
		 * Воспроизведение трека
		 */
		scrobblerPlay: function()
		{
			if (this.timer) 
			{
				this.timer.start();
			};
		},
		
		/**
		 * Трек преостановлен
		 */
		scrobblerPause: function()
		{
			if (this.timer) 
			{
				this.timer.pause();
			};
		},
		
		/**
		 * Получить кол-во секунд по UTC
		 */
		getUTC: function()
		{
			var d = new Date();
			//return Math.floor( d.getTime()/1000 + d.getTimezoneOffset() * 60 );
			return Math.floor(  d.getTime()/1000  );
		},
		
		/**
		 * Отправляет информацию о треке на last.fm
		 * @param {Object} trackInfo
		 * @param {integer} timestamp - время в миллисекундах, когда трек был включён
		 */
		scrobble: function(trackInfo, timestamp)
		{
			this.cleanInfo(trackInfo);
			var session = this.settings.session.get();
			
			// отправляем last.fm
			this.lastfm.track.scrobble({
				track: trackInfo.track,
				timestamp: timestamp,
				artist: trackInfo.artist,
				duration: trackInfo.duration
			},
			{
				key: session
			});
			
			this.scrobbled = true;
			this.events.scrobbled.raise(trackInfo, timestamp);
		},
		
		/**
		 * Обработка изменения настройки Сейчас проигрывается
		 */
		nowPlayingChange: function()
		{
			if (this.settings.nowPlaying.get() && this.settings.connected.get()) 
			{
				vkPatch.events.audioStart.bind(this.nowPlaying, this);
			}
			else
			{
				vkPatch.events.audioStart.unbind(this.nowPlaying, this);
			}
		},
		
		/**
		 * Обработка изменения настроки Скробблить
		 */
		scrobblerChange: function()
		{
			if (this.settings.scrobbler.get() && this.settings.connected.get()) 
			{
				vkPatch.events.audioStart.bind(this.scrobblerInitTimer, this);
				vkPatch.events.audioPlay.bind(this.scrobblerPlay, this);
				vkPatch.events.audioPause.bind(this.scrobblerPause, this);
			}
			else
			{
				if (this.timer) 
				{
					this.timer.stop();
				};
				vkPatch.events.audioStart.unbind(this.scrobblerInitTimer, this);
				vkPatch.events.audioPlay.unbind(this.scrobblerPlay, this);
				vkPatch.events.audioPause.unbind(this.scrobblerPause, this);
			}
		},
		
		/**
		 * Обработка изменения настроки Иконка после скробблинка
		 */
		scrobbledIconChange: function()
		{
			if (this.settings.scrobbledIcon.get() && this.settings.connected.get())
			{

				this.scrobbledIconElement = this.scrobbledIconElement || this.iconTemplate.clone().data('position', 0).attr('id','scrobbled_icon').attr('src',this.resources.scrobbled);
				vkPatch.iface.tooltip('simple', this.scrobbledIconElement, this.lang.scrobbledIconTooltip);

				// перерисовка
				vkPatch.events.audioRedraw.bind(this.redrawScrobbledIcon, this, true);
				
				// когда заскробблен
				this.events.scrobbled.bind(this.scrobbledIconHandler, this);
			}
			else
			{
				if (this.scrobbledIconElement)
				{
					this.scrobbledIconElement.detach();
				};
				vkPatch.events.audioRedraw.unbind(this.redrawScrobbledIcon, this);
				this.events.scrobbled.unbind(this.scrobbledIconHandler, this);
			};
		},
		
		/**
		 * Обработчик нажатия кнопки
		 */
		connectButtonHandler: function() 
		{
			if (!this.settings.connected.get()) 
			{
				location.href = 'http://www.last.fm/api/auth/?api_key=' + this.apiKey + '&cb=' + encodeURIComponent('http://' + location.host + '/settings?show=vkpatch');
			}
			else
			{
				this.disconnect();
				vkPatch.plugins.settings.showMessage(this.lang.desconnectedMessage);
				this.setConnectStatus();
			}
		},
		
		/**
		 * Очистка текста от лишних символов
		 * @param {string} text
		 * @return {string}
		 */
		cleanText: function(text) 
		{
			return text;
		},
		
		/**
		 * Очистить информацию трека от лишних символом
		 * @param {vkPatch.audio.trackInfo} trackInfo
		 * @return {vkPatch.audio.trackInfo}
		 */
		cleanInfo: function(trackInfo) 
		{
			trackInfo.artist = this.cleanText(trackInfo.artist);
			trackInfo.track = this.cleanText(trackInfo.track);
		},
		
		/**
		 * Обновляет информацию "Сейчас проигрывается"
		 * @param {Object} trackInfo
		 */
		nowPlaying: function(trackInfo) 
		{
			this.cleanInfo(trackInfo);
			this.lastfm.track.updateNowPlaying({
				track: trackInfo.track,
				timestamp: this.getUTC(),
				artist: trackInfo.artist,
				duration: trackInfo.duration
			},
			{
				key: this.settings.session.get()
			});
		},
		
		/**********************
		 *    Интерфейс
		 *********************/
	
		// jQuery-объект, wrapper для иконок
		iconsContainer: null,
		
		// jQuery-объект содержащий img иконки при воспроизведении
		playingIconElement: null,
		// img иконки при паузе
		pausedIconElement: null,
		
		// img иконки при паузе
		scrobbledIconElement: null,
		
		// Номер кадра иконки, на котором остановилось проигрывание
		pausedIconFrame: null,
		
		// id контейнера, содержащего иконки
		iconsContainerOwnerId: null,
		
		// иконка напротив трека
		iconTemplate: null,
		
		/**
		 * Установить иконку проигрывания
		 * @param {state} type - состояние иконка
		 * @param {integer} frame - номер кадра, если иконка паузы
		 */
		setPlayingIcon: function(state, frame) 
		{
			switch (state)
			{
				case 'play':
					
					this.pausedIconElement.hide();
					
					this.playingIconElement.show();
					
					
				break;
				
				case 'pause':
				
					this.playingIconElement.hide();
					
					this.pausedIconElement.css('background-position',12*frame + 'px 0px').show();
					
				break;
						
				case 'hide':
					this.playingIconElement ? this.playingIconElement.detach() : null;
					this.pausedIconElement ? this.pausedIconElement.detach() : null;
				break;
			}
		},
		
		/**
		 * Обработчик события audioRedraw
		 * @param {string} state - состояние аудио
		 * @param {vkPatch.audio.trackInfo} track - информация о треке
		 */
		redrawPlayingIcon: function(state, track) 
		{
			if (!$('#vkpatch_playing_icon').length)
			{
				this.placeIcon(this.playingIconElement);
				this.placeIcon(this.pausedIconElement);
			};
			
			switch (state)
			{
				case 'stop':
				
					this.pausedIconFrame = null;
					
				break;
				
				case 'load':
				
					if (this.pausedIconFrame == null) 
					{
						this.setPlayingIcon('play');
					};
					
				break;
				
				case 'play':
					
					this.pausedIconFrame = null;
					this.setPlayingIcon('play');
					
				break;
				
				case 'pause':
					
					// выбираем случайно кадр, на котором остановили
					if (this.pausedIconFrame == null) 
					{
						this.pausedIconFrame = vkPatch.sys.random(10);
					};
					
					this.setPlayingIcon('pause', this.pausedIconFrame);
			
				break;
			};
			
			
			
		},
		
		/**
		* Меняет вкладку настроект в зависимости от статуса связи с last.fm
		*/
		setConnectStatus: function() 
		{
			
			var buttonElement = $('#' + this.settings.connectLastfmButton.name);
			if (this.settings.connected.get()) 
			{
				var username = this.settings.username.get();
				buttonElement.html(jQuery.nano(this.lang.settings.disconnectLastfmButton, {username: username}));
			}
			else
			{
				buttonElement.html(this.settings.connectLastfmButton.title = this.lang.settings.connectLastfmButton);
			};
		},
		
		/**
		 * Перерисовать иконку "заскроббен"
		 */
		redrawScrobbledIcon: function(state, trackInfo, animate) 
		{
			if (!$('#scrobbled_icon').length)
			{
				this.placeIcon(this.scrobbledIconElement);
			};
			
			if (state == 'stop')
			{
				this.scrobbled = false;
			};
						
			if (this.scrobbled) 
			{							
				if (animate) 
				{
					// пауза в три секунды чтобы успел отправиться запрос на lastfm
					// иначе анимация идёт рывками
					this.scrobbledIconElement.delay(3000).fadeIn(1500);
				}
				else
				{
					this.scrobbledIconElement.show();
				}
			}
			else
			{
				this.scrobbledIconElement.stop().hide();
			}
		},
		
		/**
		 * Устанавливаем иконку заскробблено при событии scrobbled
		 */
		scrobbledIconHandler: function(trackInfo)
		{
			this.redrawScrobbledIcon('play', trackInfo, true);
		},
		
		/**
		 * Расположить контейнер иконок
		 */
		redrawIconsContainer: function(state, trackInfo) 
		{
		
			switch (state) 
			{
				case 'stop':
					this.iconsContainer.detach();
				break;
				
				default:
				
					// если иконок нет в DOM или надо изменить положение
					if (!$('#vkpatch_iconsContainer').length || trackInfo.aid != this.iconsContainerOwnerId) 
					{
						
						var parent = $('#audio'+trackInfo.aid).find('div.duration:first')
							.after(this.iconsContainer)
							.parent();
							
							
						if (parent.size() && parent.get(0).tagName.toLowerCase() == 'td') 
						{
							/*
							 * Оборачивание содержимого <td> в новый слой с position:relative
							 * необходимо для FF, т.к. position:relative не влияет на td
							 */
							var div = $('<div>').css('position', 'relative');;
							parent.children().wrapAll(div);
						}
						else
						{
							parent.css('position', 'relative');
						};
						
						
						this.iconsContainerOwnerId = trackInfo.aid;
					};
			};			
		},
		
		/**
		 * Располагает иконку в контейнере. Учитывает позицию, которая задаётся в data-параметре элемента position
		 * @param {Object} elem
		 */
		placeIcon: function(elem)
		{
			var before = null;
			var dataName = 'position';
			var position = elem.data(dataName);
			this.iconsContainer.children().each(function()
			{
				var childPos = $(this).data(dataName);
				if (childPos > position) 
				{
					before = this;
					return false;
				}
			});
				
			
			if (before) 
			{
				elem.insertBefore(before);
			}
			else 
			{
				elem.appendTo(this.iconsContainer);	// не один элемент "страше" не найдет - добавляем в конец
			};
		}
});