let matrix = [];

function generateMatrix() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    
    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
        showMessage("Please enter valid dimensions for the matrix.");
        return;
    }

    matrix = [];
    let matrixHTML = "<table>";
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        matrixHTML += "<tr>";
        for (let j = 0; j < cols; j++) {
            const randomValue = Math.floor(Math.random() * 10); // Random integer from 0 to 9
            matrix[i][j] = randomValue;
            matrixHTML += `<td><input type="number" value="${randomValue}" onchange="updateMatrix(${i}, ${j}, this.value)"></td>`;
        }
        matrixHTML += "</tr>";
    }
    matrixHTML += "</table>";

    document.getElementById('matrixContainer').innerHTML = matrixHTML;
    document.getElementById('addElementContainer').style.display = 'block';
    showMessage("Matrix generated successfully.");
}

function updateMatrix(row, col, value) {
    matrix[row][col] = parseInt(value);
    showMessage(`Updated matrix[${row}][${col}] = ${value}`);
}

function addElement() {
    const row = parseInt(document.getElementById('rowInput').value);
    const col = parseInt(document.getElementById('colInput').value);
    const value = parseInt(document.getElementById('valueInput').value);

    if (isNaN(row) || isNaN(col) || isNaN(value)) {
        showMessage("Please enter valid row, column, and value.");
        return;
    }

    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
        showMessage("Row or column is out of bounds.");
        return;
    }

    matrix[row][col] = value;
    updateMatrixDisplay();
    showMessage(`Element added at matrix[${row}][${col}] = ${value}`);
}

function updateMatrixDisplay() {
    let matrixHTML = "<table>";
    for (let i = 0; i < matrix.length; i++) {
        matrixHTML += "<tr>";
        for (let j = 0; j < matrix[i].length; j++) {
            matrixHTML += `<td><input type="number" value="${matrix[i][j]}" onchange="updateMatrix(${i}, ${j}, this.value)"></td>`;
        }
        matrixHTML += "</tr>";
    }
    matrixHTML += "</table>";

    document.getElementById('matrixContainer').innerHTML = matrixHTML;
}

function transposeMatrix() {
    if (matrix.length === 0) {
        showMessage("Please generate a matrix first.");
        return;
    }

    let transpose = [];
    for (let i = 0; i < matrix[0].length; i++) {
        transpose[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            transpose[i][j] = matrix[j][i];
        }
    }

    showMessage("Transpose calculated. Original matrix:");
    displayMatrix(matrix);
    showMessage("Transposed matrix:");
    displayMatrix(transpose);
}

function inverseMatrix() {
    if (matrix.length === 0 || matrix.length !== matrix[0].length) {
        showMessage("Please generate a square matrix first.");
        return;
    }

    // This is a simple implementation for 2x2 matrices
    // For larger matrices, you'd need a more complex algorithm
    if (matrix.length === 2 && matrix[0].length === 2) {
        let a = matrix[0][0], b = matrix[0][1],
            c = matrix[1][0], d = matrix[1][1];
        let determinant = a*d - b*c;
        
        if (determinant === 0) {
            showMessage("This matrix is not invertible.");
            return;
        }

        let inverse = [
            [d/determinant, -b/determinant],
            [-c/determinant, a/determinant]
        ];

        showMessage("Inverse calculated. Original matrix:");
        displayMatrix(matrix);
        showMessage("Inverse matrix:");
        displayMatrix(inverse);
    } else {
        showMessage("Inverse calculation is only implemented for 2x2 matrices.");
    }
}

function displayMatrix(m) {
    let matrixString = m.map(row => row.join(", ")).join("\n");
    showMessage(matrixString);
}

function showMessage(message) {
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        document.querySelector('.container').appendChild(messageBox);
    }
    messageBox.innerHTML += message + "<br>";
    messageBox.scrollTop = messageBox.scrollHeight;
}