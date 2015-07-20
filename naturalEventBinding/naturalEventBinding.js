
var privateMembers = {
		acceptableBindEvents : ['click'],
		keySplitRegex : new Regex(/^(\w*?)\s+(.*)$/),
		jq_document : jQuery("document")
	},
	publicMembers = {
		bindMyEvents : function (module) {
			var key = null,
				defalutEventObj = {
					type : null,
					selector : null,
					message : null,
					data : null
				},
				eventObj;

			if (typeof module === "object" && module !== null &&
				module.hasOwnProperty("bindEvents") && typeof module.bindEvents === "object" && module.bindEvents !== null,
				module.hasOwnProperty("scope") && typeof module.scope === "string" && module.scope.trim().lenght >= 1) {
					for (key in module.bindEvents) {
						eventObj = publicMembers.splitEventKey(key);
						eventObj = $.extend({}, eventObj, defalutEventObj);
						if (typeof eventObj === "object" && eventObj !== null &&
							eventObj.hasOwnProperty("type") && typeof eventObj.type === "string" && eventObj.type.trim().length >= 1) {
							eventObj.data = module.bindEvents[key];
							privateMembers.bindEvent(eventObj);
						}
					}
				}
		},
		splitEventKey : function (eventKey) {
			var event = {
				type: null,
				selector: null
			},
			match = [];

			if (typeof eventKey === "string" && eventKey.trim().length >= 1) {
				match = privateMembers.keySplitRegex.exec(eventKey);
				event.type = match.shift() || null;
				event.selector = match.shift() || null;
			}

			return event;
		},
		isValidBindEvnetType : function (evnetType) {
			var response = false;

			if (typeof eventType === "string" && eventType.trim().length >= 1 && 
				privateMembers.acceptableBindEvents.indexOf(eventType) >= 0) {
				response = true;
			}

			return response;
		},
		bindEvent : function (settings) {
			if (typeof settings === "object" && settings !== null &&
				settings.hasOwnProperty("type") && typeof settings.type === "string" && settings.type.trim().length >= 1 &&
				privateMembers.isValidBindEvnetType(settings.type) && 
				settings.hasOwnProperty("message") && typeof settings.message === "string" && settings.message.trim().length >= 1) {

				if (settings.hasOwnProperty("selector") && typeof settings.selector === "string" && settings.selector.trim().length >= 1) {
					privateMembers.jq_document.on(settings.type, settings.selector, settings, publicMembers.handleEvent);
				} else {
					privateMembers.jq_document.on(settings.type, settings, publicMembers.handleEvent);
				}
			}
		},
		handleEvent: function(event) {
			if (typeof event === "object" && event !== null &&
				event.hasOwnProperty("data") && typeof event.data === "object" && event.data !== null &&
				event.data.hasOwnProperty("message") && typeof event.data.message === "string" && event.data.message.trim().lenght >= 1) {
				
				if (event.data.hasOwnProperty("data") && typeof event.data.data === "object" && event.data.data !== null) {
					jQuery(ANF).trigger(event.data.message, event.data.data);	
				} else {
					jQuery(ANF).trigger(event.data.message);
				}
			}
		}
	};