	var privateMembers = {
		acceptableBindEvents : ['click'],
		keySplitRegex : new RegExp(/^\s*(\w*?)(\s+(.*))?$/)
	};

	describe('naturalEventBinding', function() {
		it('is defined', function() {
			expect(naturalEventBinding).toBeDefined();
		});

		it('is an object', function() {
			expect(naturalEventBinding).toEqual(jasmine.any(Object));
		});

		describe('that has the properties', function() {
			describe("bindMyEvents", function() {
				it("which is a function", function(){
					expect(naturalEventBinding.bindMyEvents).toEqual(jasmine.any(Function));
				});
			});

			describe("splitEventKey", function() {
				var expectedResponse = null,
					responseTest = function (testSettings, testExpectedResponse) {
						var response = naturalEventBinding.splitEventKey(testSettings);
						expect(response).toEqual(testExpectedResponse);
					};

				beforeEach(function() {
					expectedResponse = {
						type: null,
						selector: null
					};
				});

				it("which is a function", function(){
					expect(naturalEventBinding.splitEventKey).toEqual(jasmine.any(Function));
				});

				it('which returns an object', function() {
					responseTest(undefined, jasmine.any(Object));
				});

				describe('when supplied an eventKey', function() {
					it('that is undfeind, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;
						responseTest(undefined, expectedResponse);
					});
					
					it('that is null, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;
						responseTest(null, expectedResponse);
					});

					it('that is not a string, it returns an object with the properties type and selector that is null', function() {
						expectedResponse.type = null;
						expectedResponse.selector = null;
						responseTest([], expectedResponse);
					});

					describe('that is a string', function() {
						it('which is empty, it returns an object with the properties type and selector that is null', function() {
							expectedResponse.type = null;
							expectedResponse.selector = null;
							responseTest("", expectedResponse);
						});	

						it('which is just whitespace, it returns an object with the properties type and selector that is null', function() {
							expectedResponse.type = null;
							expectedResponse.selector = null;
							responseTest(" 	 ", expectedResponse);
						});	

						it('which contains just the event name, it returns an object with the property type with the value set to the event name and selector which is null', function() {
							expectedResponse.type = "Injected";
							expectedResponse.selector = null;
							responseTest("Injected", expectedResponse);							
						});


						it('which contains an event name and selector, it returns an object with the property type with the value set to the event name and selector which is supplied selector', function() {
							expectedResponse.type = "Injected";
							expectedResponse.selector = "monkey";
							responseTest("Injected monkey", expectedResponse);							
						});						
					});
				});
			});

			describe("isValidBindEventType", function() {
				var falseExpected = function (testSettings){
						var resp = naturalEventBinding.isValidBindEventType(testSettings);
						expect(resp).toBe(false);
					},
					trueExpected = function (testSettings){
						it('is '+ testSettings, function() {
							var resp = naturalEventBinding.isValidBindEventType(testSettings);
							expect(resp).toBe(true);
						});
					},
					response = null;

				beforeEach(function() {
					response = null;
				});
				
				it("which is a function", function(){
					expect(naturalEventBinding.isValidBindEventType).toEqual(jasmine.any(Function));
				});

				it('which returns a boolean', function() {
					response = naturalEventBinding.isValidBindEventType();
					expect(response).toEqual(jasmine.any(Boolean));	
				});

				describe('which retuns false when passed in eventType', function() {
					it('is undefined', function() {
						falseExpected(undefined);
					});

					it('is null', function() {
						falseExpected(null);
					});

					it('is not a string', function() {
						falseExpected("I'm not a string");
					});

					for (var i = privateMembers.acceptableBindEvents.length - 1; i >= 0; i--) {
						it('is not in the acceptableBindEvents', function() {
							falseExpected(privateMembers.acceptableBindEvents[i] + "" + i);
						});
					};
				});

				describe('which retruns true when the passed in eventType', function() {
					for (var i = privateMembers.acceptableBindEvents.length; i >= 0; i--) {
						it('is '+ privateMembers.acceptableBindEvents[i], function() {
							trueExpected(privateMembers.acceptableBindEvents[i]);
						});
					};
				});
			});

			describe("bindEvent", function() {

				var settings = null,
					onNotCalled = null
					onCalledWithThree = null,
					onCalledWithFour = null,
					onNotCalledWithFour = null;

				beforeEach(function() {
					settings = null;
					spyOn(jQuery.fn,"on");
					onNotCalled = function(testSettings) {
						naturalEventBinding.bindEvent(testSettings);
						expect(jQuery.fn.on).not.toHaveBeenCalled();
					};
					onNotCalledWithFour = function(testSettings){
						naturalEventBinding.bindEvent(testSettings);
						expect(jQuery.fn.on).not.toHaveBeenCalledWith(testSettings.type, testSettings.selector, testSettings, naturalEventBinding.handleEvent);
					};
					onCalledWithThree = function(testSettings){
						naturalEventBinding.bindEvent(testSettings);
						expect(jQuery.fn.on).toHaveBeenCalledWith(testSettings.type, testSettings, naturalEventBinding.handleEvent);
					};
					onCalledWithFour = function(testSettings){
						naturalEventBinding.bindEvent(testSettings);
						expect(jQuery.fn.on).toHaveBeenCalledWith(testSettings.type, testSettings.selector, testSettings, naturalEventBinding.handleEvent);
					};
				});


				it("which is a function", function(){
					expect(naturalEventBinding.bindEvent).toEqual(jasmine.any(Function));
				});

				describe('when passed settings that', function() {
					it('is undefined, then jQuery does not bind the event', function() {
						onNotCalled(undefined);
					})
					it('is null, then jQuery does not bind the event', function() {
						onNotCalled(null);
					})
					it('is not an object, then jQuery does not bind the event', function() {
						onNotCalled("string");
					})

					describe('is an object', function() {
						beforeEach(function() {
							settings = {};
						});

						describe('that has the property type', function() {
							it('which is undefined', function() {
								settings.type = undefined;
								onNotCalled(settings);
							});

							it('which is null', function() {
								settings.type = null;
								onNotCalled(settings);
							});

							it('which is not a string', function() {
								settings.type = "not a string";
								onNotCalled(settings);
							});
							
							describe('is a string', function() {
								beforeEach(function() {
									settings.type = "My Test Monkey";
								});

								it('then isValidBindEventType is called to check the type', function() {
									naturalEventBinding.bindEvent(settings);
									spyOn(naturalEventBinding, "isValidBindEventType").and.returnValue(false);
									expect().toHaveBeenCalledWith(settings.type); 
								});

								it('that is not an invalid event type, then jQuery does not bind the event', function() {
									spyOn(naturalEventBinding, "isValidBindEventType").and.returnValue(false);
									onNotCalled(settings);
								});
								
								describe('that is a valid event type', function() {
									beforeEach(function() {
										spyOn(naturalEventBinding, "isValidBindEventType").and.returnValue(true);
									});

									describe('and settings.message', function() {
										it('that is undefined, then jQuery does not bind the event', function() {
											settings.message = undefined;
											onNotCalled(settings);
										});

										it('that is null, then jQuery does not bind the event', function() {
											settings.message = null;
											onNotCalled(settings);
										});

										it('that is not a string, then jQuery does not bind the event', function() {
											settings.message = [];
											onNotCalled(settings);
										});

										describe('that is a string', function () {
											it('which is empty, then jQuery does not bind the event', function() {
												settings.message = "";
												onNotCalled(settings);
											});

											it('which is only whitespace, then jQuery does not bind the event', function() {
												settings.message = "  	  ";
												onNotCalled(settings);
											});

											describe('which is not empty and not just whitespace', function() {
												beforeEach(function() {
													settings.message = "monkey:wrench";
												});
												describe('settings.selector', function() {
													describe("that is undefined", function () {
														beforeEach(function() {
															settings.selector = undefined;
														});

														it('then jQurey binds the event with three paramaters', function() {
															onCalledWithThree(settings);
														});
													});
													describe('that is null', function() {
														beforeEach(function() {
															settings.selector = null;
														});

														it('then jQurey binds the event with three paramaters', function() {
															onCalledWithThree(settings);
														});
													});

													describe('that is not a string', function() {
														beforeEach(function() {
															settings.selector = {};
														});

														it('then jQurey binds the event with three paramaters', function() {
															onCalledWithThree(settings);
														});
													});

													describe('is a string', function() {
														it('that is empty, then jQurey binds the event with three paramaters', function() {
															settings.selector = "";
															onCalledWithThree(settings);
														});

														it('that is only whitespace, then jQurey binds the event with three paramaters', function() {
															settings.selector = " 	 ";
															onCalledWithThree(settings);
														});

														it('that is not empty and not only whitespace', function() {
															settings.selector = "Maned Monkey Moon Mission";
															onCalledWithFour(settings);
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
				});
			});

			xdescribe("handleEvent", function() {
				it("which is a function", function(){
					expect(naturalEventBinding.handleEvent).toEqual(jasmine.any(Function));
				});

				describe('when event', function() {

					var settings = null,
						triggerCalledWithOne = null,
						triggerCalledWithTwo = null,
						triggerNotCalled = null,
						triggerNotCalledWithTow = null;

					beforeEach(function() {
						spyOn(jQuery.fn, "trigger");
						settings = null;
						triggerNotCalled = function(testSettings) {
							naturalEventBinding.handleEvent(testSettings);
							expect(jQuery.fn.trigger).not.toHaveBeenCalled();
						};
						triggerCalledWithOne = function(testSettings) {
							naturalEventBinding.handleEvent(testSettings);
							expect(jQuery.fn.trigger).toHaveBeenCalledWith(testSettings.data.message);
						};
						triggerCalledWithTwo = function(testSettings) {
							naturalEventBinding.handleEvent(testSettings);
							expect(jQuery.fn.trigger).toHaveBeenCalledWith(testSettings.data.message, testSettings.data.data);
						};
						triggerNotCalledWithTow = function(testSettings) {
							naturalEventBinding.handleEvent(testSettings);
							expect(jQuery.fn.trigger).not.toHaveBeenCalledWith(testSettings.data.message, testSettings.data.data);	
						}
					});

					it('is undefined, then jquery does not trigger an event', function() {
						triggerNotCalled(undefined);
					});

					it('is null, then jquery does not trigger an event', function() {
						triggerNotCalled(null);
					});

					it('is not an object, then jquery does not trigger an event', function() {
						triggerNotCalled("No Event");
					});

					describe('is an object', function() {
						beforeEach(function() {
							settings = {};
						});
						describe('that has the property data', function() {
							it('that is undefined', function() {
								settings.data = undefined;
								triggerNotCalled(settings);
							});

							it('that is null', function() {
								settings.data = null;
								triggerNotCalled(settings);
							});
						
							it('that is not an object', function() {
								settings.data = "Still not an object";
								triggerNotCalled(settings);
							});

							describe('that is a object', function() {
								beforeEach(function() {
									settings.data = {};
								});
								describe('that has the property', function() {
									describe('message', function() {
										it("that is undefined, then jquery does not trigger an event", function() {
											settings.data.message = undefined;
											triggerNotCalled(settings);
										});

										it("that is null, then jquery does not trigger an event", function() {
											settings.data.message = null;
											triggerNotCalled(settings);
										});

										it("that is not an string, then jquery does not trigger an event", function() {
											settings.data.message = [];
											triggerNotCalled(settings);
										});

										describe('that is a string', function() {
											it('that is empty, then jquery does not trigger an event', function() {
												settings.data.message = "";
												triggerNotCalled(settings);
											});

											it('that is nothing but white space, then jquery does not trigger an event', function() {
												settings.data.message = "  	";
												triggerNotCalled(settings);
											});

											describe('that is not empty and not just whitespace', function() {
												it('then jquery triggers an event', function() {
													settings.data.message = "monkey";
													naturalEventBinding.handleEvent(settings);
													expect(jQuery.fn.trigger).toHaveBeenCalled();
												});

												it('then jQuery triggers an event with the supplied meassage', function() {
													settings.data.message = "monkey";
													triggerCalledWithOne(settings);
												});

												describe('and the event.data.data', function() {
													
													beforeEach(function() {
														settings.data.message = "monkey";
													});

													describe("is undefined", function() {
														beforeEach(function() {
															settings.data.data = undefined;
														});

														it('then jQuery triggers event with just the message', function() {
															triggerCalledWithOne(settings);
														});

														it('then jQuery does not trigger an event with the data', function() {
															triggerNotCalledWithTow(settings);
														});
													});

													describe("is null", function() {
														beforeEach(function() {
															settings.data.data = null;
														});

														it('then jQuery triggers event with just the message', function() {
															triggerCalledWithOne(settings);
														});

														it('then jQuery does not trigger an event with the data', function() {
															triggerNotCalledWithTow(settings);
														});
													});

													describe("is not an object", function() {
														beforeEach(function() {
															settings.data.data = null
														});

														it('then jQuery triggers event with just the message', function() {
															triggerCalledWithOne(settings);
														});

														it('then jQuery does not trigger an event with the data', function() {
															triggerNotCalledWithTow(settings);
														});
													});

													describe('is an object', function() {
														beforeEach(function() {
															settings.data.data = {
																"a" : "test"
															};
														});

														it('then jQuery triggers an event with the message and the data', function() {
															triggerCalledWithTwo(settings);
														});
													});

													describe('is an array', function() {
														beforeEach(function() {
															settings.data.data = ["Why do we have a monkey?"];
														});

														it('then jQuery triggers an event with the message and the data', function() {
															triggerCalledWithTwo(settings);
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
				});
			});

		});
	});
