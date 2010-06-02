/*
 * devToolz 0.2
 * расширение объектов
 */
var devToolz = {
	/*
	 * Настройки alert'а
	 */
	maxAlerts: 5,
	alertTimeOut: 1000,
	
	
	lastAlertTime: 0,
	alertCount: 0,
	alertFreeze: false,
	alertFunc: alert,
	
	
	/*
	 * Алерт с предотвращением зацикливания
	 */
	replaceAlert: function() {
		window.alert = devToolz.alert;
		return this;
	},
	
	/*
	 * Расширение объектов методами
	 */
	 
	 extendObjects: function() {
	 	
	 	String.prototype.repeat = function(n) {return devToolz.repeat(this,n);};
	 	
		Object.prototype.like = 	function(obj) {return devToolz.compare(this,obj);};
		Object.prototype.exists = 	function(obj) {return devToolz.exists(this,obj);};
		Object.prototype.find = 	function(obj) {return devToolz.find(this,obj);};
		Object.prototype.subtract = function(obj) {return devToolz.subtract(this,obj);};
		Object.prototype.clone = 	function() {return devToolz.clone(this);};
		Object.prototype.remove = 	function(obj) {return devToolz.remove(this,obj);};
		Object.prototype.findAll = 	function(obj) {return devToolz.findAll(this,obj);};
		
		Object.prototype.isArray = 	function() {return devToolz.is.array(this);};
		Object.prototype.isNumber = function() {return devToolz.is.number(this);};
		Object.prototype.isString =	function() {return devToolz.is.string(this);};
		Object.prototype.isRegexp = function() {return devToolz.is.regexp(this);};
		Object.prototype.isFunc = 	function() {return devToolz.is.func(this);};

		Object.prototype.dump = 	function() {return devToolz.dump(this,0);};
		Array.prototype.dump = 		function() {return devToolz.dump(this,0);};
		
	 },
		
	/*
	 * Расширение string
	 */
	
	repeat: function(str,n) {
		//console.log('repeat');
		var s = '';
		while (n > 0) {
			s += str;
			n--;
		}
		return s;
	},
	
	/*
	 * Расширение Object
	 */
	
	compare: function(obj1,obj2) {
		//console.log('compare');
		if (typeof(obj1) == 'undefined' && typeof(obj2) == 'undefined')
			return true;
	
		if (typeof(obj1) == 'undefined' || typeof(obj2) == 'undefined')
			return false;
		
		if (typeof(obj1) !== typeof(obj2)) 
			return false;
		
		if ((typeof(obj1) == 'string' || typeof(obj1) == 'number' || typeof(obj1) == 'boolean') && obj1 == obj2)
			return true;
				
		if (obj1.length !== obj2.length)
			return false;
		
		return (obj1.toSource() == obj2.toSource());
		/*
		if (!obj1.toSource || !obj2.toSource)
			return false;
		
		return (obj1.toSource() == obj2.toSource());
		*/
		/*
		for (var i in obj1) {
			if(obj2[i] == undefined)
				return false;
			
			if(!this.compare(obj1[i],obj2[i]))
				return false;
		}
		
		if (obj1.toString() !== obj2.toString())
			return false;
		
		return true;
		*/
	},
	
	exists: function(obj,needle) {
		//console.log('exists');
		for (var i in obj) {
			if (devToolz.compare(obj[i],needle))
				return true;
		};
		return false;
	},
	
	find: function(obj,needle) {
		//console.log('find');
		for (var i in obj) {		
			if (devToolz.compare(obj[i],needle))
				return i;

		};
		
		return null;
	},
	
	findAll: function(obj,needle) {
		//console.log('findall');
		var result = [];
		for (var i in obj) {		
			if (devToolz.compare(obj[i],needle))
				result.push(i);

		};
		
		return result;
	},
	
	subtract: function(obj,subtr) {
		//console.log('subtract');
		var result;
		
		/*
		 * Вычитается строка из строки
		 */
		if (typeof(obj) == 'string' && typeof(subtr) == 'string')
			return result.replace(new RegExp(subtr,'g'),'');

		
		/*
		 * Вычитается число из числа
		 */
		if (typeof(obj) == 'number' && typeof(subtr) == 'number')
			return obj - subtr;

		/*
		 * Вычитается из массива массив
		 */
		if (typeof(obj) == 'object' && obj instanceof Array && typeof(subtr) == 'object' && subtr instanceof Array) {
			result = [];
			for (var i=0;i<obj.length;i++) {
				/*
				 * Если текущий елемент не существует в вычитаемом, 
				 * то добавляем его к результату
				 */
				if (!devToolz.exists(subtr,obj[i])) {
					result.push(obj[i]);
				};

			};
			return result;
		}
		 
		/*
		 * Вычитается из объекта объект
		 */
		result = devToolz.clone(obj);
		for (var i in obj) {
			if (typeof(subtr[i]) != 'undefined' && devToolz.compare(obj[i],subtr[i]))
				delete(result[i]);
		};
		
		return result;
	},
	
	remove: function(obj,element) {
		//console.log('remove');
		var result;
		/*
		 * Вычитается строка из строки
		 */
		if (typeof(obj) == 'string' && typeof(element) == 'string')
			return result.replace(new RegExp(element,'g'),'');

		
		/*
		 * Вычитается число из числа
		 */
		if (typeof(obj) == 'number' && typeof(element) == 'number')
			return obj - element;
		
		/*
		 * Вычитается объект из массива
		 */
		if (typeof(obj) == 'object' && obj instanceof Array) {
			result = [];
			for (var i=0;i<obj.length;i++) {
				/*
				 * Если текущий елемент не равен вычитаемому, 
				 * то добавляем его к результату
				 */
				if (!this.compare(element,obj[i])) {
					result.push(obj[i]);
				};
			};
			return result;
		};

		/*
		 * Вычитается из объекта объект
		 */
		result = devToolz.clone(obj);
		for (var i in obj) {
			if (devToolz.compare(obj[i],element))
				delete result[i];
		};
		
		return result;
	},
	
	dump: function(obj,level) {
		//console.log('toString');
		if (typeof(obj) == 'string' || typeof(obj) == 'number' || typeof(obj) == 'boolean')
			return obj;
			
		/*
		 * Функция для развёртывания вложенных элементов
		 */
		function formatNode(node) {
			switch(typeof(node)) {
				case 'string':
					node = "\u201C"+node+"\u201D";
					break;
				case 'function':
					// в опере нет toSource ?
					if (typeof(node.toSource) == 'undefined')
					{
						node = node.toString();
					}
					else
					{
						node = node.toSource();
					};
					break;
				case 'object':
					node = devToolz.dump(node,level+1);
					break;
				default:
					/*
					 * Ничего не делаем
					 */
					node = node;
			}
		
			return node;
		}
		
		level = level || 0;
		var result = '';
		var space = devToolz.repeat("\t",level);
		var node;

		if (typeof(obj) == 'object' && obj instanceof Array) {
			
			for(var i=0;i<obj.length;i++) 
				result += "\n"+ space +i+': ' + formatNode(obj[i]);	
							
		} else {
			for(var i in obj) {
				/*
				 * Не показываем методы, добавленные devToolz
				 */
				//if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					//continue;
				/*
				 * Не показывать методы, установленные prototype
				 */
				if(!obj.hasOwnProperty(i))
				{
					continue;
				};
				result += "\n"+ space + '['+i+']: ' + formatNode(obj[i]);
			};
		};
		
		if (level == 0) {
			result = result.substr(1);
		};
		
		return result;
	},
	
	clone: function(obj) {
		//console.log('clone');
		if (typeof(obj) == 'number' || typeof(obj) == 'string' || typeof(obj) == 'function' || typeof(obj) == 'boolean') 
			return obj;
		
		
		var result;
		if (devToolz.is.array(obj)) {
		
			result = [];
			for(var i=0;i<obj.length;i++) {
				if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					continue;
				result.push(devToolz.clone(obj[i]));
			};
			
		} else {
		
			result = {};
			for (var i in obj) {
				if (devToolz.is.func(obj[i]) && devToolz.exists(devToolz.protoMethods,obj[i]))
					continue;
				result[i] = devToolz.clone(obj[i]);
			};
			
		};
		
		return result;
	},
		
	date: {
		now: function() {return (new Date().getTime());	},
		elapsedTime: function(old,now) {
			now = now || devToolz.date.now();
			return (now - old);
		}
	},
	
	is: {
		array: function (obj) {
			return (typeof(obj) == 'object' && obj instanceof Array);
		},
		string: function (obj) {
			return (typeof(obj) == 'string');
		},
		number: function (obj) {
			return (typeof(obj) == 'number');
		},
		bool: function (obj) {
			return (typeof(obj) == 'boolean');
		},
		func: function (obj) {
			return (typeof(obj) == 'function');
		},
		regexp: function (obj) {
			return (typeof(obj) == 'object' && obj instanceof RegExp);
		}
	},
	
	alert: function(message) {
		/*
		 * Перевызов функции в контексте devToolz
		 */
		if (alert.caller !== alert) {
			devToolz.alert(devToolz.dump(message));
			return;
		};
			 
		if (this.date.elapsedTime(this.lastAlertTime) < this.alertTimeOut)
			devToolz.alertCount++;
		else {
			devToolz.alertCount = 0;
			devToolz.alertFreeze = false;
		};
		
		if (devToolz.alertFreeze) {devToolz.lastAlertTime = devToolz.date.now(); return;};
		
		if (devToolz.alertCount >= devToolz.maxAlerts) {
			if (!confirm('Продолжить показ всплывающих окон?')) {
				devToolz.alertFreeze = true;
			} else
				devToolz.alertCount = 0;
		};
		
		if (devToolz.alertCount < devToolz.maxAlerts) {
		
			/*
			 * Вызов стандартного alert в контексте window
			 */
			devToolz.alertFunc.call(window,message);

		};
		
		devToolz.lastAlertTime = devToolz.date.now();
	}
};