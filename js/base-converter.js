var numCards = 3;

$(function(){
	$('#enter').click(calculateResults);
	$('#add').click(addResultCard);
	$('.close').click(close);

	function calculateResults() {
		var results = $('#results-section').children().each(calculateResult);
	}
	function calculateResult() {
		var fromNum = $('#fromNum').val();
		var fromBase = $('#fromBase').val();
		var toBase = $(this).find('.toBase').val();
		var toNum = changeBase(fromNum, fromBase, toBase);
		$(this).find('.toNum').html(toNum);
	}
	// function changeBaseAlt(from, fromBase, toBase) {
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
		var value = 0;
		for (i = 0; i < from.length; i++) {
			value += charToVal(from.charAt(from.length - 1 - i)) * Math.pow(fromBase, i);
		}
		var i = 0;
		while(value > Math.pow(toBase, i)) {
			i++;
		}
		i--;
		var to = "";
		while(i >= 0) {
			to += valToChar(Math.floor(value / Math.pow(toBase, i)));
			value %= Math.pow(toBase, i);
			i--;
		}
		return to.toLowerCase();
	}
	function valToChar(val) {
		if(val > 9) {
			return String.fromCharCode(val + 55);
		}
			return val.toString();
	}
	function charToVal(char) {
		var code = char.toUpperCase().charCodeAt(0);
		if (code >= 55 && code <= 90) {
			return code - 55;
		}
		else if (code >= 48 && code <= 57) {
			return code - 48;
		}
	}

	function addResultCard() {
		// if there was only card before 'add' was clicked, return the close button back to that card
		if (numCards == 1) {
			$('.result-card').find('button').show();
		}
		numCards += 1;		
		var newCard = $('#results-section').children('.row').first().clone();
		newCard.find('button').on('click', close);
		newCard.appendTo('#results-section');
	}

	function close() {
		$(this).parent().remove();
		numCards -= 1;
		//if only one card remains, hide the close button for that card
		if (numCards == 1) {
			$('.result-card').find('button').hide();
		}
	}
});
