define(["sections/helpers/naturalEventBinding"], function (module) {

	"use strict";

	describe('The Section Helper naturalEventBinding', function() {
		var settings = null,
			expectedResponse = null,
			defalutSettings = null,
			response = null;

		beforeEach(function() {
			settings = {};
			response = null;
		});

		it('which is defined', function() {
			expect(module).toBeDefined();
		});

		it('which is an object', function() {
			expect(module).toEqual(jasmine.any(Object));
		});

		describe('that contains the property', function() {
			describe('handleEvent', function() {

				it('which is defined', function() {
					expect(module.handleEvent).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.handleEvent).toEqual(jasmine.any(Function));
				});

				describe('which is pass an event', function() {
					describe('that is undefined', function() {
						beforeEach(function() {
							settings = undefined;
						});

						it('which does not uses jQuery to trigger an event', function() {
							spyOn($.fn, 'trigger');
							module.handleEvent(settings);
							expect($.fn.trigger).not.toHaveBeenCalled();
						});
					});

					describe('that is null', function() {
						beforeEach(function() {
							settings = null;
						});

						it('which does not uses jQuery to trigger an event', function() {
							spyOn($.fn, 'trigger');
							module.handleEvent(settings);
							expect($.fn.trigger).not.toHaveBeenCalled();
						});
					});

					describe('that is not a jquery event', function() {
						beforeEach(function() {
							settings = {};
						});

						it('which does not uses jQuery to trigger an event', function() {
							spyOn($.fn, 'trigger');
							module.handleEvent(settings);
							expect($.fn.trigger).not.toHaveBeenCalled();
						});
					});

					describe('that is a jquery event', function() {
						beforeEach(function() {
							settings = jQuery.Event("SomeEvent");
						});

						describe('that has the property data', function() {
							describe('which is undefined', function() {
								beforeEach(function() {
									settings.data = undefined;
								});

								it('which does not uses jQuery to trigger an event', function() {
									spyOn($.fn, 'trigger');
									module.handleEvent(settings);
									expect($.fn.trigger).not.toHaveBeenCalled();
								});
							});

							describe('which is null', function() {
								beforeEach(function() {
									settings.data = null;
								});

								it('which does not uses jQuery to trigger an event', function() {
									spyOn($.fn, 'trigger');
									module.handleEvent(settings);
									expect($.fn.trigger).not.toHaveBeenCalled();
								});
							});

							describe('which is not an object', function() {
								beforeEach(function() {
									settings.data = "Monkey was injected into the data";
								});

								it('which does not uses jQuery to trigger an event', function() {
									spyOn($.fn, 'trigger');
									module.handleEvent(settings);
									expect($.fn.trigger).not.toHaveBeenCalled();
								});
							});

							describe('which is an object', function() {
								beforeEach(function() {
									settings.data = {};
								});

								describe('that has the property', function() {
									describe('message', function() {
										describe('that is undefined', function() {
											beforeEach(function() {
												settings.data.message = undefined;
											});

											it('which does not uses jQuery to trigger an event', function() {
												spyOn($.fn, 'trigger');
												module.handleEvent(settings);
												expect($.fn.trigger).not.toHaveBeenCalled();
											});
										});

										describe('that is null', function() {
											beforeEach(function() {
												settings.data.message = null;
											});

											it('which does not uses jQuery to trigger an event', function() {
												spyOn($.fn, 'trigger');
												module.handleEvent(settings);
												expect($.fn.trigger).not.toHaveBeenCalled();
											});
										});

										describe('that is not a string', function() {
											beforeEach(function() {
												settings.data.message = {};
											});

											it('which does not uses jQuery to trigger an event', function() {
												spyOn($.fn, 'trigger');
												module.handleEvent(settings);
												expect($.fn.trigger).not.toHaveBeenCalled();
											});
										});

										describe('that is a string', function() {
											describe('that is empty', function() {
												beforeEach(function() {
													settings.data.message = "";
												});

												it('which does not uses jQuery to trigger an event', function() {
													spyOn($.fn, 'trigger');
													module.handleEvent(settings);
													expect($.fn.trigger).not.toHaveBeenCalled();
												});
											});

											describe('that is just whitespace', function() {
												beforeEach(function() {
													settings.data.message = " 	";
												});

												it('which does not uses jQuery to trigger an event', function() {
													spyOn($.fn, 'trigger');
													module.handleEvent(settings);
													expect($.fn.trigger).not.toHaveBeenCalled();
												});
											});

											describe('that is not empty and not just whitespace', function() {
												beforeEach(function() {
													settings.data.message = "Monkey:Jumps";
													expectedResponse	= jQuery.extend({}, settings);
													expectedResponse.type = settings.data.message;
												});

												it('which uses jQuery to trigger an event', function() {
													spyOn($.fn, 'trigger');
													module.handleEvent(settings);
													expect($.fn.trigger).toHaveBeenCalled();
												});

												it('which uses jQuery to trigger an event with an event', function() {
													spyOn($.fn, 'trigger');
													module.handleEvent(settings);
													expect($.fn.trigger).toHaveBeenCalledWith(expectedResponse);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});

			describe('bindEvent', function() {

				beforeEach(function() {
					defalutSettings = {
						"type" : null,
						"message" : null,
						"selector" : null,
						"scope" : document,
						"data" : {}
					};

					settings = {
						"type" : "click",
						"message" : "click:Inject",
						"selector" : null
					};

					spyOn($.fn, 'on');
				});

				it('which is defined', function() {
					expect(module.bindEvent).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.bindEvent).toEqual(jasmine.any(Function));
				});

				it('which extends the supplied settings with the defalut values', function() {
					spyOn($, 'extend').andReturn({});
					module.bindEvent(settings);
					expect($.extend).toHaveBeenCalledWith(defalutSettings, settings);
				});

				describe('which does not call jQuery to bind an event', function() {
					describe('when the settings.type', function() {
						it('is null', function() {
							settings.type = null;
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is undeifned', function() {
							settings.type = undefined;
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is an empty string', function() {
							settings.type = "";
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is a string containg just whitespace', function() {
							settings.type = "	";
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is not a valid bine event type', function() {
							spyOn(module, 'isValidBindEventType').andReturn(false);
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});
					});

					describe('when the settings.message', function() {
						beforeEach(function() {
							spyOn(module, 'isValidBindEventType').andReturn(true);
						});

						it('is null', function() {
							settings.message = null;
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is undeifned', function() {
							settings.message = undefined;
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is an empty string', function() {
							settings.message = "";
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});

						it('is a string containg just whitespace', function() {
							settings.message = "	";
							module.bindEvent(settings);
							expect($.fn.on).not.toHaveBeenCalled();
						});
					});

					it('when the settings.scope is not found', function() {
						var mockElement = $();
						spyOn(module, 'isValidBindEventType').andReturn(true);
						spyOn($.fn, 'init').andReturn(mockElement);
						module.bindEvent(settings);
						expect($.fn.on).not.toHaveBeenCalled();
					});
				});

				describe('which uses jQuery to bind an event', function() {

					var mockElement = null;

					beforeEach(function() {
						mockElement = $("<a></a>");
						spyOn(module, 'isValidBindEventType').andReturn(true);
						spyOn($.fn, 'init').andReturn(mockElement);
					});

					it('to the scope passed in the settings', function() {
						settings.scope = "InjectedTest";
						module.bindEvent(settings);
						expect($.fn.init).toHaveBeenCalledWith(settings.scope, undefined, jasmine.any(Object));
					});


					describe('with the data that contiains the key message', function() {
						it('when the settings data is null', function() {
							settings.data = null;
							expectedResponse = {
								"message": settings.message
							};
							module.bindEvent(settings);
							expect($.fn.on).toHaveBeenCalledWith(settings.type, settings.selector, expectedResponse, module.handleEvent);
						});

						it('when the settings data is a string', function() {
							settings.data = "";
							expectedResponse = {
								"message": settings.message
							};
							module.bindEvent(settings);
							expect($.fn.on).toHaveBeenCalledWith(settings.type, settings.selector, expectedResponse, module.handleEvent);
						});

						it('when the settings data is an object that does not have the message key', function() {
							settings.data = {
								"a": "Injected"
							};
							expectedResponse = {
								"a": "Injected",
								"message": settings.message
							};
							module.bindEvent(settings);
							expect($.fn.on).toHaveBeenCalledWith(settings.type, settings.selector, expectedResponse, module.handleEvent);
						});

						it('when the settings data is an object that has the message key', function() {
							settings.data = {
								"message": "Injected"
							};
							expectedResponse = {
								"message": settings.message
							};
							module.bindEvent(settings);
							expect($.fn.on).toHaveBeenCalledWith(settings.type, settings.selector, expectedResponse, module.handleEvent);
						});
					});
				});
			});

			describe("isValidBindEventType", function() {
				var acceptableBindEvents;

				beforeEach(function() {
					response = null;
					acceptableBindEvents = ['click'];
				});

				it('which is defined', function() {
					expect(module.isValidBindEventType).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.isValidBindEventType).toEqual(jasmine.any(Function));
				});

				it('which returns a boolean', function() {
					response = module.isValidBindEventType();
					expect(typeof response).toEqual("boolean");
				});

				describe('which retuns false when passed in eventType', function() {
					it('is undefined', function() {
						response = module.isValidBindEventType(undefined);
						expect(response).toBe(false);
					});

					it('is null', function() {
						response = module.isValidBindEventType(null);
						expect(response).toBe(false);
					});

					it('is not a string', function() {
						response = module.isValidBindEventType("I'm not a string");
						expect(response).toBe(false);
					});
				});

				describe('which retruns true when the passed in eventType', function() {
					it('is click', function() {
						response = module.isValidBindEventType("click");
						expect(response).toBe(true);
					});
				});
			});

			describe("splitEventKey", function() {

				beforeEach(function() {
					expectedResponse = {
						type: null,
						selector: null
					};
				});

				it('which is defined', function() {
					expect(module.splitEventKey).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.splitEventKey).toEqual(jasmine.any(Function));
				});

				it('which returns an object', function() {
					response = module.splitEventKey(undefined);
					expect(response).toEqual(jasmine.any(Object));
				});

				describe('when supplied an eventKey', function() {
					it('that is undfeind, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;

						response = module.splitEventKey(undefined);
						expect(response).toEqual(expectedResponse);
					});

					it('that is null, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;

						response = module.splitEventKey(null);
						expect(response).toEqual(expectedResponse);
					});

					it('that is not a string, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;

						response = module.splitEventKey([]);
						expect(response).toEqual(expectedResponse);
					});

					describe('that is a string', function() {
						it('which is empty, it returns an object with the properties type and selector that is null', function() {
							expectedResponse.type = null;
							expectedResponse.selector = null;

							response = module.splitEventKey("");
							expect(response).toEqual(expectedResponse);
						});

						it('which is just whitespace, it returns an object with the properties type and selector that is null', function() {
							expectedResponse.type = null;
							expectedResponse.selector = null;

							response = module.splitEventKey(" 	 ");
							expect(response).toEqual(expectedResponse);
						});

						it('which contains just the event name, it returns an object with the property type with the value set to the event name and selector which is null', function() {
							expectedResponse.type = "Injected";
							expectedResponse.selector = null;

							response = module.splitEventKey("Injected");
							expect(response).toEqual(expectedResponse);
						});


						it('which contains an event name and selector, it returns an object with the property type with the value set to the event name and selector which is supplied selector', function() {
							expectedResponse.type = "Injected";
							expectedResponse.selector = "monkey";

							response = module.splitEventKey("Injected monkey");
							expect(response).toEqual(expectedResponse);
						});
					});
				});
			});

			describe("bindEvents", function() {

				beforeEach(function() {
					expectedResponse = {
						type: null,
						selector: null
					};

					defalutSettings = {
						"type" : null,
						"message" : null,
						"selector" : null,
						"scope" : document,
						"data" : {}
					};

					settings = {
						"module" : {
							"bindEvents" : {
								"Inject Test": "test:b"
							}
						},
						"scope" : $("<a></a>")
					};
				});

				it('which is defined', function() {
					expect(module.bindEvents).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.bindEvents).toEqual(jasmine.any(Function));
				});

				describe('which does not call bindEvent', function() {
					beforeEach(function() {
						spyOn(module, 'bindEvent');
					});

					describe('the supplied settings', function() {
						it('is undefined', function() {
							settings = undefined;
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});

						it('is null', function() {
							settings = null;
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});

						it('is not an object', function() {
							settings = "not an object";
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});

						describe('is an object that contains the property module', function() {
							it('is undefined', function() {
								settings = {
									"module" : undefined
								};
								module.bindEvents(settings);
								expect(module.bindEvent).not.toHaveBeenCalled();
							});

							it('is null', function() {
								settings = {
									"module" : null
								};
								module.bindEvents(settings);
								expect(module.bindEvent).not.toHaveBeenCalled();
							});

							it('is not an object', function() {
								settings = {
									"module" : "not an object"
								};
								module.bindEvents(settings);
								expect(module.bindEvent).not.toHaveBeenCalled();
							});

							it('is is an empty object', function() {
								settings = {
									"module" : {}
								};
								module.bindEvents(settings);
								expect(module.bindEvent).not.toHaveBeenCalled();
							});

							describe('that is an object that contains the property bindEvents', function() {
								beforeEach(function() {
									settings = {
										"module": {}
									};
								});

								it('is undefined', function() {
									settings.module.bindEvents = undefined;
									module.bindEvents(settings);
									expect(module.bindEvent).not.toHaveBeenCalled();
								});

								it('is null', function() {
									settings.module.bindEvents = null;
									module.bindEvents(settings);
									expect(module.bindEvent).not.toHaveBeenCalled();
								});

								it('is not an object', function() {
									settings.module.bindEvents = "not an object";
									module.bindEvents(settings);
									expect(module.bindEvent).not.toHaveBeenCalled();
								});

								it('is is an empty object', function() {
									settings.module.bindEvents = {};
									module.bindEvents(settings);
									expect(module.bindEvent).not.toHaveBeenCalled();
								});
							});
						});
					});

					describe('when event object type', function() {
						beforeEach(function() {
							expectedResponse = {
								"type" : "Injected",
								"message" : "inj:msg"
							};
						});

						it("is undefined", function() {
							expectedResponse.type = undefined;
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is null", function() {
							expectedResponse.type = null;
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is an empty string", function() {
							expectedResponse.type = "";
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is a string of whitespaces", function() {
							expectedResponse.type = " 	";
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
					});

					describe('when event object message', function() {
						beforeEach(function() {
							expectedResponse = {
								"type" : "Injected",
								"message" : "inj:msg"
							};
						});

						it("is undefined", function() {
							expectedResponse.message = undefined;
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is null", function() {
							expectedResponse.message = null;
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is an empty string", function() {
							expectedResponse.message = "";
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
						it("is a string of whitespaces", function() {
							expectedResponse.message = " 	";
							spyOn($, 'extend').andReturn(expectedResponse);
							module.bindEvents(settings);
							expect(module.bindEvent).not.toHaveBeenCalled();
						});
					});
				});

				describe('which does not call splitEventKey', function() {
					beforeEach(function() {
						spyOn(module, 'splitEventKey');
					});

					describe('the supplied settings', function() {
						it('is undefined', function() {
							settings = undefined;
							module.bindEvents(settings);
							expect(module.splitEventKey).not.toHaveBeenCalled();
						});

						it('is null', function() {
							settings = null;
							module.bindEvents(settings);
							expect(module.splitEventKey).not.toHaveBeenCalled();
						});

						it('is not an object', function() {
							settings = "not an object";
							module.bindEvents(settings);
							expect(module.splitEventKey).not.toHaveBeenCalled();
						});

						describe('is an object that contains the property module', function() {
							it('is undefined', function() {
								settings = {
									"module" : undefined
								};
								module.bindEvents(settings);
								expect(module.splitEventKey).not.toHaveBeenCalled();
							});

							it('is null', function() {
								settings = {
									"module" : null
								};
								module.bindEvents(settings);
								expect(module.splitEventKey).not.toHaveBeenCalled();
							});

							it('is not an object', function() {
								settings = {
									"module" : "not an object"
								};
								module.bindEvents(settings);
								expect(module.splitEventKey).not.toHaveBeenCalled();
							});

							it('is is an empty object', function() {
								settings = {
									"module" : {}
								};
								module.bindEvents(settings);
								expect(module.splitEventKey).not.toHaveBeenCalled();
							});

							describe('that is an object that contains the property bindEvents', function() {
								beforeEach(function() {
									settings = {
										"module": {}
									};
								});

								it('is undefined', function() {
									settings.module.bindEvents = undefined;
									module.bindEvents(settings);
									expect(module.splitEventKey).not.toHaveBeenCalled();
								});

								it('is null', function() {
									settings.module.bindEvents = null;
									module.bindEvents(settings);
									expect(module.splitEventKey).not.toHaveBeenCalled();
								});

								it('is not an object', function() {
									settings.module.bindEvents = "not an object";
									module.bindEvents(settings);
									expect(module.splitEventKey).not.toHaveBeenCalled();
								});

								it('is is an empty object', function() {
									settings.module.bindEvents = {};
									module.bindEvents(settings);
									expect(module.splitEventKey).not.toHaveBeenCalled();
								});
							});
						});
					});
				});

				describe('which does not call jQuery\'s extend', function() {
					beforeEach(function() {
						spyOn($, 'extend').andReturn({});
					});

					describe('the supplied settings', function() {
						it('is undefined', function() {
							settings = undefined;
							module.bindEvents(settings);
							expect($.extend).not.toHaveBeenCalled();
						});

						it('is null', function() {
							settings = null;
							module.bindEvents(settings);
							expect($.extend).not.toHaveBeenCalled();
						});

						it('is not an object', function() {
							settings = "not an object";
							module.bindEvents(settings);
							expect($.extend).not.toHaveBeenCalled();
						});

						describe('is an object that contains the property module', function() {
							it('is undefined', function() {
								settings = {
									"module" : undefined
								};
								module.bindEvents(settings);
								expect($.extend).not.toHaveBeenCalled();
							});

							it('is null', function() {
								settings = {
									"module" : null
								};
								module.bindEvents(settings);
								expect($.extend).not.toHaveBeenCalled();
							});

							it('is not an object', function() {
								settings = {
									"module" : "not an object"
								};
								module.bindEvents(settings);
								expect($.extend).not.toHaveBeenCalled();
							});

							it('is is an empty object', function() {
								settings = {
									"module" : {}
								};
								module.bindEvents(settings);
								expect($.extend).not.toHaveBeenCalled();
							});

							describe('that is an object that contains the property bindEvents', function() {
								beforeEach(function() {
									settings = {
										"module": {}
									};
								});

								it('is undefined', function() {
									settings.module.bindEvents = undefined;
									module.bindEvents(settings);
									expect($.extend).not.toHaveBeenCalled();
								});

								it('is null', function() {
									settings.module.bindEvents = null;
									module.bindEvents(settings);
									expect($.extend).not.toHaveBeenCalled();
								});

								it('is not an object', function() {
									settings.module.bindEvents = "not an object";
									module.bindEvents(settings);
									expect($.extend).not.toHaveBeenCalled();
								});

								it('is is an empty object', function() {
									settings.module.bindEvents = {};
									module.bindEvents(settings);
									expect($.extend).not.toHaveBeenCalled();
								});
							});
						});
					});
				});

				describe('which does not call normalizeMessageObject', function() {
					beforeEach(function() {
						spyOn(module, 'normalizeMessageObject');
					});

					describe('the supplied settings', function() {
						it('is undefined', function() {
							settings = undefined;
							module.bindEvents(settings);
							expect(module.normalizeMessageObject).not.toHaveBeenCalled();
						});

						it('is null', function() {
							settings = null;
							module.bindEvents(settings);
							expect(module.normalizeMessageObject).not.toHaveBeenCalled();
						});

						it('is not an object', function() {
							settings = "not an object";
							module.bindEvents(settings);
							expect(module.normalizeMessageObject).not.toHaveBeenCalled();
						});

						describe('is an object that contains the property module', function() {
							it('is undefined', function() {
								settings = {
									"module" : undefined
								};
								module.bindEvents(settings);
								expect(module.normalizeMessageObject).not.toHaveBeenCalled();
							});

							it('is null', function() {
								settings = {
									"module" : null
								};
								module.bindEvents(settings);
								expect(module.normalizeMessageObject).not.toHaveBeenCalled();
							});

							it('is not an object', function() {
								settings = {
									"module" : "not an object"
								};
								module.bindEvents(settings);
								expect(module.normalizeMessageObject).not.toHaveBeenCalled();
							});

							it('is is an empty object', function() {
								settings = {
									"module" : {}
								};
								module.bindEvents(settings);
								expect(module.normalizeMessageObject).not.toHaveBeenCalled();
							});

							describe('that is an object that contains the property bindEvents', function() {
								beforeEach(function() {
									settings = {
										"module": {}
									};
								});

								it('is undefined', function() {
									settings.module.bindEvents = undefined;
									module.bindEvents(settings);
									expect(module.normalizeMessageObject).not.toHaveBeenCalled();
								});

								it('is null', function() {
									settings.module.bindEvents = null;
									module.bindEvents(settings);
									expect(module.normalizeMessageObject).not.toHaveBeenCalled();
								});

								it('is not an object', function() {
									settings.module.bindEvents = "not an object";
									module.bindEvents(settings);
									expect(module.normalizeMessageObject).not.toHaveBeenCalled();
								});

								it('is is an empty object', function() {
									settings.module.bindEvents = {};
									module.bindEvents(settings);
									expect(module.normalizeMessageObject).not.toHaveBeenCalled();
								});
							});
						});
					});
				});

				it('which calls splitEventKey', function() {
					settings = {
						"module" : {
							"bindEvents" : {}
						}
					};
					expectedResponse = "Injected Key";
					settings.module.bindEvents[expectedResponse] = "InjectedKey";
					spyOn(module, 'splitEventKey');
					module.bindEvents(settings);
					expect(module.splitEventKey).toHaveBeenCalledWith(expectedResponse);
				});

				it('which calls normalizeMessageObject', function() {
					expectedResponse = "Injected Value";
					settings.module.bindEvents["Injected Key"] = expectedResponse;
					spyOn(module, 'normalizeMessageObject');
					module.bindEvents(settings);
					expect(module.normalizeMessageObject).toHaveBeenCalledWith(expectedResponse);
				});

				it('which extends the defalut event object with the results of splitEventKey and normalizeMessageObject', function() {
					var splitEventKeyResponse = "splitEventKey Injection",
						normalizeMessageObjectResponse = "normalizeMessageObject Injection";

					spyOn(module, 'splitEventKey').andReturn(splitEventKeyResponse);
					spyOn(module, 'normalizeMessageObject').andReturn(normalizeMessageObjectResponse);
					spyOn($, 'extend').andReturn({});
					defalutSettings.scope = settings.scope;
					module.bindEvents(settings);
					expect($.extend).toHaveBeenCalledWith({}, defalutSettings, splitEventKeyResponse, normalizeMessageObjectResponse);
				});

				it('which calls bindEvent with the combined event object', function() {
					expectedResponse = {
						"type": "injected type",
						"message" : "injected message",
						"selector" : null,
						"scope" : null,
						"data" : {}
					};
					spyOn($, 'extend').andReturn(expectedResponse);
					spyOn(module, 'bindEvent');
					defalutSettings.scope = settings.scope;
					module.bindEvents(settings);
					expect(module.bindEvent).toHaveBeenCalledWith(expectedResponse);
				});
			});

			describe('normalizeMessageObject', function() {
				it('which is defined', function() {
					expect(module.normalizeMessageObject).toBeDefined();
				});

				it('which is a function', function() {
					expect(module.normalizeMessageObject).toEqual(jasmine.any(Function));
				});

				describe('which returns an empty object', function() {
					it('when the supplied value is null', function() {
						response = module.normalizeMessageObject(null);
						expect(response).toEqual({});
					});

					it('when the supplied value is undefined', function() {
						response = module.normalizeMessageObject(undefined);
						expect(response).toEqual({});
					});


					it('when the supplied value is an empty string', function() {
						response = module.normalizeMessageObject("");
						expect(response).toEqual({});
					});

					it('when the supplied value is a string of whitespace', function() {
						response = module.normalizeMessageObject(" 	");
						expect(response).toEqual({});
					});

					it('when the supplied value is an object that is empty', function() {
						response = module.normalizeMessageObject({});
						expect(response).toEqual({});
					});

					it('when the supplied value is an object that has the keys message is null and data is undefined', function() {
						settings = {
							"message" : null,
							"data" : undefined
						};
						response = module.normalizeMessageObject(settings);
						expect(response).toEqual({});
					});

					it('when the supplied value is an object that has the keys message which is a blank string and data is undefined', function() {
						settings = {
							"message" : "",
							"data" : undefined
						};
						response = module.normalizeMessageObject(settings);
						expect(response).toEqual({});
					});

					it('when the supplied value is an object that has the keys message which is a string of whitespace aand data is undefined', function() {
						settings = {
							"message" : " 	",
							"data" : undefined
						};
						response = module.normalizeMessageObject(settings);
						expect(response).toEqual({});
					});
				});

				it('returns an object with the key message equal to the value passed in when it is a string that is not empty and not just whitespace', function() {
					settings = "Injected test";
					expectedResponse = {
						"message": settings
					};

					expect(module.normalizeMessageObject(settings)).toEqual(expectedResponse);
				});

				it('returns an object with the key message equal to the the value.message', function() {
					settings = {
						"message" : "Injected test"
					};
					expectedResponse = {
						"message": settings.message
					};

					expect(module.normalizeMessageObject(settings)).toEqual(expectedResponse);
				});

				it('returns an object with the key data equal to the the value.data', function() {
					settings = {
						"data" : "Injected test"
					};
					expectedResponse = {
						"data": settings.data
					};

					expect(module.normalizeMessageObject(settings)).toEqual(expectedResponse);
				});
			});
		});
	});
});