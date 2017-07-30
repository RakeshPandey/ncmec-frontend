/*  mkForm jquery plugin */
(function($, FRAMEWORK){
	
	var   PLUGIN_NAME = "mkForm"
		, ui = FRAMEWORK.app
		, mkConfig = FRAMEWORK.config
		, DEFER = $.Deferred()  // this is a Promise for when all js assets are ready
		, OPTIONS = {
			personTitle : ['','Mr.','Ms.','Mrs.','Miss.','Dr.'],
			formStateField : mkConfig.STATES,
			formCountryField : null
		  }
		, mp = { // the public methods object, externally accessible via $.mkForm('foo', 'bar')
				init : function() { 			
					return this.each(function() { 
						var $form = $(this);
						if ( typeof $form.data(PLUGIN_NAME) == 'undefined' ) 
							DEFER.done(function() { initForm($form); });					
					});
				},
				initFields : function(domElement, doValidation) {
											
					doValidation = typeof doValidation == "boolean" ? doValidation : true;
											
					return this.each(function() { 
						var $form = $(this);
						domElement = domElement || $form;
						initFields($form,domElement, doValidation); 
					});
				},
				resetForm : function() {
					return this.each(function() {
						var $form = $(this);
						
						// clear the form
						$form.find('input:text, input:password, input:file, select, textarea').val('');
						$form.find('input:radio, input:checkbox')
							 .removeAttr('checked')
							 .removeAttr('selected');
						$form.mkForm('validate');				
					});  // return
				},
				validate : function() {
					return this.each(function() {
						var validator = this.validate();
										
						// this is a hack to make sure that the validation error labels don't reappear
						// don't know why but it seems to work  2-26-13
						setTimeout(function() { validator.resetForm();},250);
					});
				}						
			} // mp
		;  
	
	/*********************   MAIN PRIVATE FUNCTIONS   ************************/
		
	function initForm ($form) {		
		
		// attach a data object with namespace "mkForm" to the <form> tag
		$form.data(PLUGIN_NAME, { 
			servlet : mkConfig.URI.jsonServlet,
			action : null,
			options : {customFormFn:false, showPrintButton : true, confirmationUrl : false},
			special : {
				$form : $form,
				execute : function(fn, param) {
					param = param || null;
					if ( typeof this[fn] === 'function' ) return this[fn](param);
					else return true;
				},
				beforeInit : null,
				beforeValidate : null,
				beforeSubmit : null,
				onSubmitSuccess : function(beResponse) {  // this is used by default for all forms
					showConfirmation(this.$form, beResponse.messages[0]);
				},
				onValidationError : null,
				onSubmitError : function(msgHtml) {
						msgHtml = msgHtml || '';
						if ( msgHtml.length ) ui.popupMessage(msgHtml);
						scrollToNode(this.$form);
				}
			}
		});
		
		var D = $form.data(PLUGIN_NAME);
		
		// get the form options, if any, from the form element's data-json attribute and override D.options		
		if ( typeof $form.attr('data-json') != 'undefined' )
			if ( ui.isValidJson($form.attr('data-json')) ) D.options = $.extend(D.options,$form.data('json'))
			else { alert('Invalid json string in form data-json attribute : \n'+$form.data('json')); return;}
			
			
		// determine the action as follows : 1) form data-json action property, 2) form action attribute, 3) form id attribute
		// for backward compatibility we check all of these however
		// the preferred place to put it is in the data-json attribute or the action attribute
		if ( D.options.action  ) D.action = D.options.action;
		else if ( $form.attr('action') ) D.action =  $form.attr('action');
		else if ( $form.attr('id') ) D.action = $form.attr('id');  // for backward compatibility
		else {
				alert('An mkForm requires an action attribute.')
				return;
		}
													
		// SUBMIT event binding
		// OR forms that are going to post directly ( i.e. no AJAX like the 911Form) must have attribute ajax=false 
		// so that form.submit() behaves like a normal post
		$form.on("submit", function(e) {
			
			var   $form = $(e.target)
				, D = $form.data(PLUGIN_NAME)
				, useAJAX =  (!$form.attr('ajax') || $form.attr('ajax').toLowerCase() == 'true' ) ? true : false
				, useTraditional = !useAJAX
				;
							
			D.special.execute('beforeValidate');
			
			if ( useAJAX ) {
				e.preventDefault();
				// initialize the AJAX returnMessage container
				var $msgContainer = $form.find('>div.returnMessage')
				if ( $msgContainer.length == 0 ) $msgContainer = $('<div class="returnMessage"/>').prependTo($form);
				$msgContainer.empty().hide();
			}
			
			if ( $form.validate().form() ) {
				D.special.execute('beforeSubmit');
				if ( D.action == 'sendEmailReport' || D.action == 'taUserSignup') new mkCaptchaObject($form, ajaxSubmit);
				else if ( useAJAX ) ajaxSubmit($form);
				else if ( useTraditional ) { // by default the form will submit in a traditional (i.e. non AJAX ) way
					//e.preventDefault();
					//alert('traditional');
				}
			}
			else {
				ui.popupMessage('<p>Your form cannot be submitted until the errors are fixed.</p>');
				D.special.execute('onValidationError');
			}
		});		
		
		// disable enter key for the form EXCEPT in TEXTAREA fields
		$form.keypress(function (e) {
		  if(e.which == 13 && e.target.nodeName != "TEXTAREA") return false;
		});
					
		if ( D.options.customFormFn ) loadCustomFormFn($form);
		else initFields($form);																	
	}  // initForm
		
	
	// initializes the fields of the form that reside in $node of the form
	// then revalidates the form
	// used to initialize the whole form or just a $node section of the form that was dynamically added
	function initFields($form, $node, doValidation) {
		
		$node = $node || $form;
		doValidation = typeof doValidation == "boolean" ? doValidation : true;
		
		// initialize smartButton fields
		$form.find('.smartButton').smartButton();
		
		if ( $node.hasClass('wrapFields') && $.fn.wrapFields ) {
			var autoNumber = typeof $node.data('numberfields')=='boolean' ? $node.data('numberfields') : false;
			$node.wrapFields(autoNumber);
		}
		
		// if the form does not have a submit button then append one to the form
		if ( $form.find('input[type=submit]').length == 0 && $form.data('includesubmit') != false )
			$('<div><input type="submit" class="btn btn-submit prevent_doubleclick" value="Submit"></div>').appendTo($form);
		
		// e.g. load option elements for : select.formStateField, select.personTitle, select.formCountryField
		loadSelectOptions.call($node);
				
		// mark the <label required> elements on a form with an asterisk
		$node.find('label[required]').each(function() { $(this).html('<em>*&nbsp;</em>'+$(this).text()) });
		
		// add a hidden fromAddress field to forms with action=sendEmailReport if there is none
		// otherwise it will fail in the backend
		if ( $form.data(PLUGIN_NAME).action == "sendEmailReport" && $form.find('input[name=fromAddress]').length==0)
			$('<input type="hidden" name="fromAddress" value="servlet@ncmec.org">').prependTo($form);
									
		// turn on validation
		// the otherAmount rule is for donation forms
		// tmpRegion belongs to the form on the poster partners page ( i.e. /posters )
		if ( doValidation ) $form.validate({
			ignore : '.ignore',
			rules : {
				otherAmount: { min: 25 }
			},
			other : null
		});
	}
	
	// submit the form via an AJAX call
	function ajaxSubmit($form) { 
	
		var   D = $form.data(PLUGIN_NAME)			
			, $msgContainer = $form.find('>div.returnMessage')
			;
			
		ui.showBusy();

		// submit the form
		ui.jsonRequest({
				servlet : D.servlet,
				paramString : 'action='+D.action+'&'+$form.serialize(),
				type : 'POST',
				callback : function(R) {
					ui.hideBusy();
					
					// log the form submission in Analytics
					var status = R.success ? 'success' : 'error-'+R.resultCode;
					ui.googleEvent(['_trackEvent', 'Form', status, ui.page.id]);
																								
					if ( R.success ) {
						
						if ( D.options.confirmationUrl && D.options.confirmationUrl.length ) window.location = D.options.confirmationUrl;													
						else {
							// we are going to display a confirmation message so empty the pageContextMenu from the view
							ui.page.$contextMenu.html('<p>&nbsp;</p>');
							D.special.execute('onSubmitSuccess',R.json);
							scrollTo(0,0);
						}
					}
					else if ( R.resultCode == 5 ) {  // backend provided an error message
						D.special.execute('onSubmitError');
						$(R.messageHtml()).appendTo($msgContainer).parent().show();
					}
					else D.special.execute('onSubmitError',	'<p>For some reason the system is unable to process your form at this time.</p><p>Please try again later.</p>');
				}
		});
	
	}
				
		
	/*********************   UTILITY FUNCTIONS   ************************/
	
	function loadCustomFormFn($form) {
		var   D = $form.data(PLUGIN_NAME)
			, specialFn = D.options.customFormFn
			;
		mkRequire(mkConfig.URI.js+'/customFormFunctions/'+specialFn+'.js', function() { 
				D.special = $.extend(D.special, ui.specialFunctions.form[specialFn]);
							
				var result = D.special.execute('beforeInit');
								
				if ( result== undefined || result===true ) initFields($form);
				// else beforeInit returned false which probably means it is loading something so we should wait
				// in this case the custom form function is responsible for executing $form.mkForm('initFields)
		});
	}
		
	
	// this function loads the option elements for <select> elements that have a class in OPTIONS
	function loadSelectOptions() {
		var $form = $(this);
		$.each(OPTIONS, function(prop,list) {
			$form.find('select.'+prop).each(function() {
				var $select = $(this);
				if ( prop == 'formCountryField') ui.loadCountrySelectField($select);  // needs to load countries
				else  // load from OPTIONS
					$.each(list, function(i,option) {
						var   label = $.isArray(option) ? option[1] : option
							, value = $.isArray(option) ? option[0] : option
							;
						$('<option  value="'+value+'">'+label+'</option>').appendTo($select);
					});
				
			});
		});
	}
				
	function showConfirmation($form, message) {
		var   $content = ui.page.$content
			, printButtonHtml = '<br/><br/><input type="button" class="btn no-print" onclick="window.print()" value="Print"/>'
			;
		printButtonHtml = $form.data(PLUGIN_NAME).options.showPrintButton ? printButtonHtml : '';
		$content.html('<h1>Confirmation</h1>'+message+printButtonHtml);
	}
	
	function scrollToNode($node) { $('html, body').animate({scrollTop: $node.offset().top}, 500); }	
	
	
	/*********************   MAIN   ************************/
	
	// add the plugin to jQuery
    $.fn[PLUGIN_NAME] = function(method)
    {
        if (mp[method]) // map $('foo').myplugin('bar', 'baz') to mp.bar('baz')
        {
            return mp[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || ! method)
        {
            return mp.init.apply(this, arguments); // if called without arguments, init
        }
        else
        {
            $.error('Method ' +  method + ' does not exist on $.fn.'+PLUGIN_NAME);
        }
    };
		
	
	// load the jquery.validate plugin
	mkRequire([
				mkConfig.URI.js+'/wrapField.jquery.js', 
				mkConfig.URI.js+'/smartButton.jquery.js', 
				mkConfig.URI.validatePlugin, 
				], function() { 
					// add some addiitonal validation methods
					jQuery.validator.addMethod("stateAbbrev", function(value, element) {
						return this.optional(element) || /^[A-Z]{2}$/.test(value);
					}, "Please select a state.");
													
					jQuery.validator.addMethod("zipcodeUS", function(value, element) {
						return this.optional(element) || /\d{5}-\d{4}$|^\d{5}$/.test(value)
					}, "The specified US ZIP Code is invalid");

					jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
						phone_number = phone_number.replace(/\s+/g, "");
						return this.optional(element) || phone_number.length > 9 &&
							phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
					}, "Please specify a valid phone number");					
					
					DEFER.resolve();
	});	
	
})(jQuery, mkFramework);