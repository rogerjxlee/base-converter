var numCards = 3;

$(function(){
	$('#enter').click(changeBase);
	$('#add').click(addResultCard);
	$('.close').click(close);


	function changeBase() {
		var fromNum = $('#fromNum').val();
		var fromBase = $('#fromBase').val();
		var toBase = $('#toBase').val();
		var from = parseInt(fromNum, fromBase);
		var toNum = from.toString(toBase);
		printResult(toNum);
	}

	function printResult(toNum) {
		$('#result').html(toNum); 
	}

	function addResultCard() {
		// if there was only card before 'add' was clicked, return the close button back to that card
		if (numCards == 1) {
			$('.result-card').find('button').show();
		}
		numCards += 1;		
		var newCard = $('#result-card').clone();
		newCard.find('button').on('click', close);
		newCard.appendTo('#result-section');
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
