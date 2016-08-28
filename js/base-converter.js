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
		var card = $(document.createElement("div")).append(
			$(document.createElement("form"))
				.addClass("form-inline")
				.append($(document.createElement("label"))
					.html("Number"))
				.append($(document.createElement("div"))
					.addClass("form-control")
					.html("num"))
				.append($(document.createElement("label"))
					.html("Base"))
				.append($(document.createElement("input"))
					.addClass("form-control")
					.attr("placeholder", "test")));
		$('#resultGrid').append(card);
	}
});
