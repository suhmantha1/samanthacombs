/*
		Apostrophe-forms
*/

$(function(){
	/* Text Area auto-resize as text is added */
	var autosize = require('autosize');
	
	var $textarea = $('[data-forms-field-name]');
	autosize($textarea);
});