define([], function () {
	"use strict";

var privateMembers = {
		acceptableBindEvents : ['click'],
		keySplitRegex : new RegExp(/^\s*(\w*?)(\s+(.*))*$/),
		eventBus : $({})
	},
	publicMembers = {
		bindEvents : function (settings) {
			var key = null,
				keyValue = null,
				defalutEventObj = {
					"type" : null,
					"message" : null,
					"selector" : null,
					"scope" : null,
					"data" : {}
				},
				eventObj,
				response = false;

			if (typeof settings === "object" && settings !== null &&
			    settings.hasOwnProperty("module") && typeof settings.module === "object" && settings.module !== null &&
			    settings.module.hasOwnProperty("bindEvents") && typeof settings.module.bindEvents === "object" && settings.module.bindEvents !== null) {

				defalutEventObj.scope = $(settings.scope);

				for (key in settings.module.bindEvents) {
					if (settings.module.bindEvents.hasOwnProperty(key)) {

						eventObj = publicMembers.splitEventKey(key);
						keyValue = publicMembers.normalizeMessageObject(settings.module.bindEvents[key]);

						eventObj = $.extend({}, defalutEventObj, eventObj, keyValue);

						if (eventObj.hasOwnProperty("type") && typeof eventObj.type === "string" && eventObj.type.trim().length >= 1 &&
						    eventObj.hasOwnProperty("message") && typeof eventObj.message === "string" && eventObj.message.trim().length >= 1){
							publicMembers.bindEvent(eventObj);
						}

					}
				}

			}

			return response;
		},
		splitEventKey : function (eventKey) {
			var event = {
				type: null,
				selector: null
			},
			match = [];

			if (typeof eventKey === "string" && eventKey.trim().length >= 1) {

				match = privateMembers.keySplitRegex.exec(eventKey);
				if (typeof match !== "undefined" && match !== null && match instanceof Array && match.length >= 1) {
					match.shift(); //throw away the first since it is the full match and we just want the  first and second part
					event.type = match.shift() || null;
					match.shift(); //throw away the 3rd since it is a match that includes the space that we do not want
					event.selector = match.shift() || null;
				}
			}

			return event;
		},
		isValidBindEventType : function (eventType) {
			var response = false;

			if (typeof eventType === "string" && eventType.trim().length >= 1 &&
				privateMembers.acceptableBindEvents.indexOf(eventType) >= 0) {
				response = true;
			}

			return response;
		},
		bindEvent : function (settings) {

			var jq_scope = null,
				mySettings = {
					"type" : null,
					"message" : null,
					"selector" : null,
					"scope" : document,
					"data" : {}
				};

			$.extend(mySettings, settings);

			if (typeof mySettings.type === "string" && mySettings.type.trim().length >= 1 && publicMembers.isValidBindEventType(mySettings.type.trim()) &&
			    typeof mySettings.message === "string" && mySettings.message.trim().length >= 1) {

				if (typeof mySettings.data !== "object" || mySettings.data === null) {
					mySettings.data = {};
				}

				mySettings.data.message = mySettings.message;

				jq_scope = $(mySettings.scope);

				if (jq_scope.length >= 1){
					jq_scope.on(mySettings.type, mySettings.selector, mySettings.data, publicMembers.handleEvent);
				}
			}
		},
		handleEvent: function(event) {
			if (typeof event === "object" && event !== null && event instanceof jQuery.Event &&
			    event.hasOwnProperty("data") && typeof event.data === "object" && event.data !== null &&
			    event.data.hasOwnProperty("message") && typeof event.data.message === "string" && event.data.message.trim().length >= 1) {
				event.type = event.data.message.trim();
				privateMembers.eventBus.trigger(event);
			}
		},
		normalizeMessageObject : function (keyValue) {
			var response = {};

			if (typeof keyValue === "string" && keyValue.trim().length >=1) {
				response.message = keyValue.trim();
			} else if (typeof keyValue === "object" && keyValue !== null) {

			  	if (keyValue.hasOwnProperty("message") && typeof keyValue.message === "string" && keyValue.message.trim().length >= 1) {
					response.message = keyValue.message.trim();
				}

				if (keyValue.hasOwnProperty("data") && typeof keyValue.data !== "undefined") {
					response.data = keyValue.data;
				}
			}

			return response;
		}
	};

	return publicMembers;

});