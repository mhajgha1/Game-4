let matrix, correctAnswer, score = 0, total = 0;

function generateRREFMatrix(rows, cols) {
    const matrix = Array(rows).fill().map(() => Array(cols).fill(0));
    let leadingOnes = 0;

    for (let i = 0; i < rows && leadingOnes < cols; i++) {
        if (Math.random() < 0.7) {
            matrix[i][leadingOnes] = 1;
            for (let j = leadingOnes + 1; j < cols; j++) {
                matrix[i][j] = Math.random() < 0.3 ? Math.floor(Math.random() * 3) - 1 : 0;
            }
            for (let k = 0; k < i; k++) {
                matrix[k][leadingOnes] = 0;
            }
            leadingOnes++;
        }
    }

    return matrix;
}

function checkProperties(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let pivotRows = 0;
    let pivotCols = 0;

    for (let j = 0; j < cols; j++) {
        let hasNonZero = false;
        for (let i = 0; i < rows; i++) {
            if (matrix[i][j] !== 0) {
                hasNonZero = true;
                break;
            }
        }
        if (hasNonZero) pivotCols++;
    }

    for (let i = 0; i < rows; i++) {
        if (matrix[i].some(val => val !== 0)) {
            pivotRows++;
        }
    }

    const oneToOne = pivotRows === cols;
    const onto = pivotRows === rows;

    return oneToOne && onto ? "both" : oneToOne ? "one-to-one" : onto ? "onto" : "neither";
}

function displayMatrix(matrix) {
    const matrixDiv = document.getElementById('matrix');
    matrixDiv.textContent = matrix.map(row => row.map(val => val.toString().padStart(3)).join(' ')).join('\n');
}

function newGame() {
    const rows = Math.floor(Math.random() * 3) + 2;
    const cols = Math.floor(Math.random() * 3) + 2;
    matrix = generateRREFMatrix(rows, cols);
    correctAnswer = checkProperties(matrix);
    displayMatrix(matrix);
    document.getElementById('result').textContent = '';
}

function checkAnswer(answer) {
    total++;
    if (answer === correctAnswer) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
        document.getElementById('result').style.color = '#4CAF50';
    } else {
        document.getElementById('result').textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
        document.getElementById('result').style.color = '#f44336';
    }
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = total;
}

newGame();