document.getElementById('calculate').addEventListener('click', function() {
	var table = document.getElementById('assignmentTable');
	var cells = table.getElementsByTagName('input');
	var matrix = [];

	for (var i = 0; i < cells.length; i++) {
		if (i % 3 === 0) {
			matrix.push([]);
		}
		matrix[matrix.length - 1].push(parseFloat(cells[i].value));
	}

	var rowLength = matrix.length;
	var colLength = matrix[0].length;
	var rowIndices = [];
	var colIndices = [];

	for (var i = 0; i < rowLength; i++) {
		rowIndices.push(i);
	}

	for (var i = 0; i < colLength; i++) {
		colIndices.push(i);
	}

	var maxScore = -Infinity;
	var assignment = [];

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = getRandomInt(0, i);
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function calculateScore(rowIndices, colIndices) {
		var score = 0;
		for (var i = 0; i < rowLength; i++) {
			for (var j = 0; j < colLength; j++) {
				if (rowIndices[i] === i && colIndices[j] === j) {
					score += matrix[i][j];
				}
			}
		}
		return score;
	}

	function tryAssignments() {
		shuffle(rowIndices);
		shuffle(colIndices);
		var score = calculateScore(rowIndices, colIndices);
		if (score > maxScore) {
			maxScore = score;
			assignment = [];
			for (var i = 0; i < rowLength; i++) {
				assignment.push({
					row: rowIndices[i],
					col: colIndices[i]
				});
			}
		}
	}

	for (var i = 0; i < 10000; i++) {
		tryAssignments();
	}

	var result = 'Optimal Assignment:<br>';
	for (var i = 0; i < rowLength; i++) {
		result += 'Task ' + (i + 1) + ' -> Worker ' + (assignment[i].col + 1) + '<br>';
	}
	result += 'Maximum Performance Score: ' + maxScore;

	document.getElementById('result').innerHTML = result;
});