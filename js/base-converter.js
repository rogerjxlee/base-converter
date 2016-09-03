$(function() {
	$('.bottom').height(function(index, height) {
    	return $(document).height() - $(this).offset().top - parseInt($(this).css('padding-top'));
    });
	$(window).on('resize', function() {
		$('.bottom').height(function(index, height) {
    		return $(document).height() - $(this).offset().top - parseInt($(this).css('padding-top'));
    	});
	});
	$('.entry').find('.base').focus(
		function(){
			var previousBase = $(this).val();
			$(this).data("previousBase", previousBase);
		}).change(calculateResults);
	$('.entry').find('.number').change(calculateResults);
	$('#add').click(addEntry);
	$('.close').click(close);

	function calculateResults() {
		var fromBase = $(this).parent().children('.base').val();
		if ($(this).hasClass('base')) {
			fromBase = $(this).data("previousBase") ;
		}
		var fromNum = $(this).parent().children('.number').val();
		$(this).parent().parent().children().each(function() {
			var to = $(this);
			calculateResult(fromBase, fromNum, to)});
	}
	function calculateResult(fromBase, fromNum, to) {
		if ($(fromBase).parent().is($(to))) {
			return;
		}
		var toBase = $(to).find('.base').val();
		var toNum = changeBase(fromNum, fromBase, toBase);
		$(to).find('.number').val(toNum);
	}
	// function changeBase(from, fromBase, toBase) {
	// 	return parseInt(from, fromBase).toString(toBase);
	// }

   /**
   	* converts a number from one base to another
   	* only supports bases between 2 and 36
	* @param {String} from
	* @param {Number} fromBase
	* @param {Number} toBase
	*/
	function changeBase(from, fromBase, toBase) {
		if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
			return NaN;
		}
		var value = parseNum(from, fromBase);
		return printNum(value, toBase);
		
	}
	function parseNum(num, base) {
		var value = 0;
		for (i = 0; i < num.length; i++) {
			value += charToVal(num.charAt(num.length - 1 - i)) * Math.pow(base, i);
		}
		return value;
	}
	function printNum(value, base) {
		var i = 0;
		while(value > Math.pow(base, i)) {
			i++;
		}
		i--;
		var to = "";
		while(i >= 0) {
			to += valToChar(Math.floor(value / Math.pow(base, i)));
			value %= Math.pow(base, i);
			i--;
		}
		return to.toLowerCase();
	}
	function valToChar(val) {
		if(val > 9) {
			return String.fromCharCode(val + 55);
		}
			return val.toString();
	
}	function charToVal(char) {
		var code = char.toUpperCase().charCodeAt(0);
		if (code >= 65 && code <= 90) {
			return code - 55;
		}
		else if (code >= 48 && code <= 57) {
			return code - 48;
		}
	}

	function addEntry() {
		// if there was only card before 'add' was clicked, return the close button back to that card
		var numEntries = $('#entries').children('.entry').length;
		if (numEntries == 1) {
			$('.entry').find('button').show();
		}
		var newEntry = $('#entries').children('.entry').last().clone();
		newEntry.find('.base').removeAttr('value');
		newEntry.find('.number').removeAttr('value');
		newEntry.find('button').on('click', close);
		newEntry.hide().appendTo('#entries').fadeIn(75);
		newEntry.appendTo('#entries');
		$(newEntry).find('.base').focus(
		function(){
			var previousBase = $(this).val();
			$(this).data("previousBase", previousBase);
		}).change(calculateResults);
		$(newEntry).find('.number').change(calculateResults);
	}

	function close() {
		var entryToRemove = $(this).parent().parent();
		entryToRemove.fadeOut(75, function() {
			entryToRemove.css({"visibility":"hidden",display:'block'}).slideUp(250, 
				function() {
					entryToRemove.remove();
					var numEntries = $('#results-section').children('.result-card').length;
					//if only one card remains, hide the close button for that card
					if (numEntries == 1) {
						$('.entry').find('button').parent().hide();
					}
				});
		});		
	}
});
