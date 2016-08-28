$(function(){
	$('#enter').click(changeBase);

	function changeBase() {
		var fromNum = $('#fromNum').val();
		var fromBase = $('#fromBase').val();
		var toBase = $('#toBase').val();
		var from = parseInt(fromNum, fromBase);
		var toNum = from.toString(toBase);
		printResult(toNum);
	}

	function printResult(toNum) {
		$('#actualresult').html(toNum); 
	}
});





