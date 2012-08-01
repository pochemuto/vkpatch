(function(){
var plugin = {
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
			playingIcon: 'data:image/gif;base64,R0lGODlhDAAMALMPAIOLkmmQr3uas2iPrqesrniYsk2ApXSVrba2tqenp52dna+vr5WVlf///42Njf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTZCMTNDQjdENDIyMTFFMUEyODlENTIyNEU4QUI4RTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTZCMTNDQjhENDIyMTFFMUEyODlENTIyNEU4QUI4RTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NkIxM0NCNUQ0MjIxMUUxQTI4OUQ1MjI0RThBQjhFMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NkIxM0NCNkQ0MjIxMUUxQTI4OUQ1MjI0RThBQjhFMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUFAA8ALAAAAAAMAAwAAAQ80AREKx1GkMUpX0mRjB83jkqqJE2jpkzMKK0cO0ytN07vtD8e0Acs8ojCZI/ha/oYB4DTBzgYDkwn1BABACH5BAUFAA8ALAIAAwAIAAMAAAQK8MmU5GvN6s1YBAAh+QQFBQAPACwCAAMACAAEAAAEDPDJ1uRjzFqsu3VOBAAh+QQFBQAPACwCAAIACAAFAAAEC/DJ1qS9OGPq3KURACH5BAUFAA8ALAIAAgAIAAUAAAQL8Mm1pL04Y8ZayxEAIfkEBQUADwAsAgADAAgABAAABAvwyZSkvbI1zJ9zEQAh+QQFBQAPACwCAAQACAADAAAECbC1p9S7OOsrIwAh+QQFBQAPACwCAAMACAADAAAECrC1R6ulsjL2ZAQAIfkEBQUADwAsAgADAAgAAwAABAlQqUerpYzdlyMAIfkEBQUADwAsBQAFAAUAAQAABASwtScjACH5BAUFAA8ALAIABAAIAAIAAAQIkDHVmrys3ggAOw==',
			
			// Кадры иконки проигрывания
			playingIconFrames: 'data:image/gif;base64,R0lGODlhhAAMALMAAIKMkmKNrHSYsaOrrWWOramurnmZsk2ApXOVrJ2fnbW3ta2wraWopZWXlfv+/IyPjSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MUUwODI5MEQ0MjMxMUUxQTI4OUQ1MjI0RThBQjhFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MUUwODI5MUQ0MjMxMUUxQTI4OUQ1MjI0RThBQjhFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2QjEzQ0I5RDQyMjExRTFBMjg5RDUyMjRFOEFCOEUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk2QjEzQ0JBRDQyMjExRTFBMjg5RDUyMjRFOEFCOEUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAIQADAAABP/wEEUrDecEa7HmlbcpCydWZZiN4Akqbru+8PzG5mEUy8JQPp9AMOiljIxhsQfsJYlGIEMIZZKcyuiVujxiq16uFpllGsW+ppDBPvvY8Ok5DnfT2wuH40233+VOd359Tnxxg4dnCYJzcAmPi3qQkA2PjpWTlQySlZgJmpKTj6AOo6KLbJ+qq5eZeo6imHCepqgMp6qtow28CXq8DQ/Akr+8wsCVxcjAvg7Ax8zK0L3KyKGfxsOlo3rQnNjB2pTZyM3PwQ/d6g4P7ens3cbuxvHu7eHr9vTs8u356O7+AXx3jGBAfuEG5us2L1g8hfAi2lvI7qBBexMlWsy3sSJGihmLCTL0J3GkSI0kT4bkmJKlSpMgO1586ZHmSpQ2ZcIsWTNmS5w+c/6cGbQoz5tEj+qsOBBjQacNoUaV+lRqP6hXnWbFuFVfU65f9SEAIBUAgrFlz5KFahYtW7Vp3Tptu3Yu3LdyMdKNW1cvggMIvjb4C1gw4cBaDxvOgJir4sSMFxeGPNlxZMqNxR6IAAA7',
			
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
			var document = window.document;
			var _this = this;								
			this.lastfm = new LastFM(
				{
					apiKey: this.apiKey,
					apiSecret: this.apiSecret,
					log: function(message) 
					{
						_this.log(' API :' + message);
					},
					debug: vkPatch.debug,
					md5: function(string){ return vkPatch.sys.md5( vkPatch.sys.encoder.utf8Encode(string) ) }
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
};

vkPatch.plugins.add(plugin);
})();