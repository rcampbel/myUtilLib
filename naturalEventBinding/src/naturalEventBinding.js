
var naturalEventPrivateMembers = {
		acceptableBindEvents : ['click'],
		keySplitRegex : new RegExp(/^\s*(\w*?)(\s+(.*))*$/),
		jq_document : $("document")
	},
	naturalEventBinding = {
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
						eventObj = naturalEventBinding.splitEventKey(key);
						eventObj = $.extend({}, eventObj, defalutEventObj);
						if (typeof eventObj === "object" && eventObj !== null &&
							eventObj.hasOwnProperty("type") && typeof eventObj.type === "string" && eventObj.type.trim().length >= 1) {
							eventObj.data = module.bindEvents[key];
							naturalEventPrivateMembers.bindEvent(eventObj);
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

				match = naturalEventPrivateMembers.keySplitRegex.exec(eventKey);
				if (typeof match !== "undefined" && match !== null && match instanceof Array && match.length >= 1) {
					match.shift(); //throw away the first since it is the full match and we just want the  first and second part
					event.type = match.shift() || null;
					match.shift(); //throw away the 3rd since it is a match that includes the space that we do not want
					event.selector = match.shift() || null;
				}
			}

			return event;
		},
		isValidBindEventType : function (evnetType) {
			var response = false;

			if (typeof eventType === "string" && eventType.trim().length >= 1 && 
				naturalEventPrivateMembers.acceptableBindEvents.indexOf(eventType) >= 0) {
				response = true;
			}

			return response;
		},
		bindEvent : function (settings) {
			if (typeof settings === "object" && settings !== null &&
				settings.hasOwnProperty("type") && typeof settings.type === "string" && settings.type.trim().length >= 1 &&
				naturalEventBinding.isValidBindEventType(settings.type) && 
				settings.hasOwnProperty("message") && typeof settings.message === "string" && settings.message.trim().length >= 1) {

				if (settings.hasOwnProperty("selector") && typeof settings.selector === "string" && settings.selector.trim().length >= 1) {
					naturalEventPrivateMembers.jq_document.on(settings.type, settings.selector, settings, naturalEventBinding.handleEvent);
				} else {
					naturalEventPrivateMembers.jq_document.on(settings.type, settings, naturalEventBinding.handleEvent);
				}
			}
		},
		handleEvent: function(event) {

			if (typeof event === "object" && event !== null &&
				event.hasOwnProperty("data") && typeof event.data === "object" && event.data !== null &&
				event.data.hasOwnProperty("message") && typeof event.data.message === "string" && event.data.message.trim().lenght >= 1) {
				
				if (event.data.hasOwnProperty("data") && (
					(typeof event.data.data === "object" && event.data.data !== null) ||
					(typeof event.data.data !== "undefined" && evnet.data.data !== null && event.data.data instanceof Array)
					))  {
					$(ANF).trigger(event.data.message, event.data.data);	
				} else {
					$(ANF).trigger(event.data.message);
				}
			}
		}
	};
