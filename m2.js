let matrix = [];

function generateMatrix() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    
    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
        alert("Please enter valid dimensions for the matrix.");
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
}

function updateMatrix(row, col, value) {
    matrix[row][col] = parseInt(value);
    console.log(`Updated matrix[${row}][${col}] = ${value}`);
}

function addElement() {
    const row = parseInt(document.getElementById('rowInput').value);
    const col = parseInt(document.getElementById('colInput').value);
    const value = parseInt(document.getElementById('valueInput').value);

    if (isNaN(row) || isNaN(col) || isNaN(value)) {
        alert("Please enter valid row, column, and value.");
        return;
    }

    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
        alert("Row or column is out of bounds.");
        return;
    }

    matrix[row][col] = value;
    updateMatrixDisplay();
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