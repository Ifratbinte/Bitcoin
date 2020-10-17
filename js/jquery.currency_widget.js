/**
 * Currency widget  v1.0
 * Tested with jQuery 1.3.x and 1.4.x.
 * Released under CC-BY-SA http://creativecommons.org/licenses/by-sa/3.0/
 * 
 * Usage: 	$('#currency_widget_holder').currency_widget(); // currency widget with default options
 *			$('#currency_widget_holder').currency_widget({ editable_amount: false }); // don't let the visitor change the amount to convert
 *			$('#currency_widget_holder').currency_widget({ amount: '10' }); // preset the amount
 *			$('#currency_widget_holder').currency_widget({ source_currency: 'EUR', target_currency: 'USD' }); // preset the source and target currencies
 *			$('#currency_widget_holder').currency_widget({ editable_source_currency: false, editable_target_currency: false }); // don't let the visitor change currencies
 *			$('#currency_widget_holder').currency_widget({ 
 *				 source_currencies: { 'USD': 'US Dollar ($)', 'EUR': 'Euro (€)', 'SEK': 'Svenska kronor (kr)' }
 *				,target_currencies: { 'USD': 'US Dollar ($)', 'EUR': 'Euro (€)', 'SEK': 'Svenska kronor (kr)' }
 *			); // set the available currencies
 *			$('#currency_widget_holder').currency_widget({ header: true, header_text: 'Currency converter' }); // set the header
 *			$('#currency_widget_holder').currency_widget({ url: 'currency_widget/ajax.php' }); // set the url to the serversite converter
 *			$('#currency_widget_holder').currency_widget({ 
 *				 show_labels: true
 *				,labels: {
 *					 amount: 'Amount:'
 *					,from: 'From:'
 *					,to: 'To:'
 *					,convert: 'Convert!'
 *					,price: 'Price:'
 *				}
 *			}); // Whether to show labels and the labels themselves
 *			
 *			// you can also set these options globally, e.g.
 *			$.currency_widget.defaults.amount = '10';
 *			$('#currency_widget_holder').currency_widget(); // amount will be set to 10
 * 
 */

(function($) {
	
	$.currency_widget = function(elem, options) { 
		var t = $(elem);
		
		// build html
		var s = '';
		s += '<div class="currency_widget_wrapper ui-widget">';
		if (options.header) {
			s += '<div class="currency_widget_header ui-widget-header ui-corner-top">';
			s += options.header_text;
			s += '</div>';
		}
		s += '<div class="currency_widget_content ui-widget-content '+(options.header?'ui-corner-bottom':'ui-corner-all')+'">';
		s += '<form action="#" method="get">';
		s += '<ul><li>';
		if (options.show_labels) {
			s += '<span class="currency_widget_float">'+options.labels.amount+'</span>';
		}
		if (options.editable_amount) {
			s += '<input class="currency_widget_float" type="text" name="amount" value="'+options.amount+'" />';
		} else {
			s += '<input class="currency_widget_float" type="hidden" name="amount" value="'+options.amount+'" />'+options.amount;
		}
		s += '</li><li>';
		if (options.show_labels) {
			s += '<span class="currency_widget_float">'+options.labels.from+'</span>';
		}
		if (options.editable_source_currency) {
			s += '<select class="currency_widget_float" name="source_currency">';
			for (var i in options.source_currencies) {
				s += '<option value="'+i+'"';
				if (i == options.source_currency) {
					s += ' selected="selected"';
				}
				s += '>'+options.source_currencies[i]+'</option>';
			}
			s += '</select>';
		} else {
			s += '<input class="currency_widget_float" type="hidden" name="source_currency" value="'+options.source_currency+'" />'+options.source_currency;
		}
		s += '</li><li>';
		if (options.show_labels) {
			s += '<span class="currency_widget_float">'+options.labels.to+'</span>';
		}
		if (options.editable_target_currency) {
			s += '<select class="currency_widget_float" name="target_currency">';
			for (var i in options.target_currencies) {
				s += '<option value="'+i+'"';
				if (i == options.target_currency) {
					s += ' selected="selected"';
				}
				s += '>'+options.target_currencies[i]+'</option>';
			}
			s += '</select>';
		} else {
			s += '<input class="currency_widget_float" type="hidden" name="target_currency" value="'+options.target_currency+'" />'+options.target_currency;
		}
		s += '</li><li>';
		if (options.show_labels) {
			s += '<span class="currency_widget_float">&nbsp;</span>';
		}
		s += '<input type="submit" value="'+options.labels.convert+'" />';
		s += '</li><li>';
		if (options.show_labels) {
			s += '<span class="currency_widget_float">'+options.labels.price+'</span>';
		}
		s += '<span class="currency_widget_float currency_widget_result">&nbsp;</span>';
		s += '</li>';
		s += '</ul>';
		s += '<div class="currency_widget_ex_rate_source">Exchange rates from <a href="http://finance.yahoo.com/currency-converter/">Yahoo</a></div>';
		s += '</form>';
		s += '</div>';
		s += '</div>';
		
		// append html
		t.html(s);
		// ajax functionality
		$('form', t).submit(function() {
			var t = $(this);
			var a = parseFloat($('input[name=amount]', t).val()) || 0;
			if (a == 0) {
				$('.currency_widget_result', t).text('0');
				return false;
			}
			var sc, tc;
			if (!(sc = $('input[name=source_currency]').val())) {
				sc = $('option:selected', $('select[name=source_currency]', t)).val();
			}
			if (!(tc = $('input[name=target_currency]').val())) {
				tc = $('option:selected', $('select[name=target_currency]', t)).val();
			}
			if (sc == tc) {
				$('.currency_widget_result', t).text(a);
				return false;
			}
			var query = {
				 amount: a
				,source_currency: sc
				,target_currency: tc
			};
			$.get(
				options.url,
				query,
				function(data) {
					$('.currency_widget_result', t).text(data);
				},
				'text'
			);
			return false;
		});
	};
	$.currency_widget.version = 1.0;
	$.currency_widget.defaults = {
		 editable_amount: true
		,amount: ''
		,source_currency: 'USD'
		,target_currency: 'EUR'
		,editable_source_currency: true
		,editable_target_currency: true
		,source_currencies: { 
			 'USD': 'US Dollar ($)'
			,'EUR': 'Euro (€)'
			,'GBP': 'British Pound (£)'
			,'JPY': 'Yen (¥)'
			,'CAD': 'Canadian Dollar (C$)'
			,'AUD': 'Australian Dollar (A$)'
			,'SEK': 'Swedish krona (kr)'
		}
		,target_currencies: { 
			 'USD': 'US Dollar ($)'
			,'EUR': 'Euro (€)'
			,'GBP': 'British Pound (£)'
			,'JPY': 'Yen (¥)'
			,'CAD': 'Canadian Dollar (C$)'
			,'AUD': 'Australian Dollar (A$)'
			,'SEK': 'Swedish krona (kr)'
		}
		,header: true
		,header_text: 'Currency converter'
		,url: 'currency_widget/ajax.php'
		,show_labels: true
		,labels: {
			 amount: 'Amount:'
			,from: 'From:'
			,to: 'To:'
			,convert: 'Convert!'
			,price: 'Price:'
		}
	};
	
	$.fn.currency_widget = function(options) {
		options = $.extend({}, $.currency_widget.defaults, options || {});
		return this.each(function() {
			new $.currency_widget(this, options);
		});
	};
})(jQuery);