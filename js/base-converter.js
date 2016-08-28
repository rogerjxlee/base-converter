$(function(){
	$('#enter').click(changeBase);
	$('#add').click(addResultCard);
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
		$('#result-card').clone().appendTo('#result-section');
	}
});
