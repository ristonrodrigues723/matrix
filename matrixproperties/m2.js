let matrix = [];

function generateMatrix() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    
    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
        showMessage("Please enter valid dimensions for the matrix.");
        return;
    }

    matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = Math.floor(Math.random() * 10); // Random integer from 0 to 9
        }
    }

    updateMatrixDisplay(matrix);
    document.getElementById('addElementContainer').style.display = 'block';
    showMessage("Matrix generated successfully.");
}

function updateMatrix(row, col, value) {
    matrix[row][col] = parseFloat(value);
    showMessage(`Updated matrix[${row}][${col}] = ${value}`);
}

function addElement() {
    const row = parseInt(document.getElementById('rowInput').value);
    const col = parseInt(document.getElementById('colInput').value);
    const value = parseFloat(document.getElementById('valueInput').value);

    if (isNaN(row) || isNaN(col) || isNaN(value)) {
        showMessage("Please enter valid row, column, and value.");
        return;
    }

    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
        showMessage("Row or column is out of bounds.");
        return;
    }

    matrix[row][col] = value;
    updateMatrixDisplay(matrix);
    showMessage(`Element added at matrix[${row}][${col}] = ${value}`);
}

function updateMatrixDisplay(m) {
    let matrixHTML = "<table>";
    for (let i = 0; i < m.length; i++) {
        matrixHTML += "<tr>";
        for (let j = 0; j < m[i].length; j++) {
            matrixHTML += `<td><input type="number" value="${m[i][j]}" onchange="updateMatrix(${i}, ${j}, this.value)"></td>`;
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

    updateMatrixDisplay(transpose);
    showMessage("Transpose calculated and displayed.");
}

function inverseMatrix() {
    if (matrix.length === 0 || matrix.length !== matrix[0].length) {
        showMessage("Please generate a square matrix first.");
        return;
    }

    let det = determinant(matrix);
    if (Math.abs(det) < 1e-10) {
        showMessage("This matrix is not invertible (determinant is zero).");
        return;
    }

    let adj = adjoint(matrix);
    let inverse = [];
    for (let i = 0; i < matrix.length; i++) {
        inverse[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            inverse[i][j] = adj[i][j] / det;
        }
    }

    updateMatrixDisplay(inverse);
    showMessage("Inverse calculated and displayed.");
}

function calculateDeterminant() {
    if (matrix.length !== matrix[0].length) {
        showMessage("Determinant can only be calculated for square matrices.");
        return;
    }

    let det = determinant(matrix);
    showMessage(`Determinant of the matrix is ${det}`);
}

function determinant(m) {
    if (m.length === 1) {
        return m[0][0];
    }
    if (m.length === 2) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    let det = 0;
    for (let i = 0; i < m.length; i++) {
        det += Math.pow(-1, i) * m[0][i] * determinant(subMatrix(m, 0, i));
    }
    return det;
}

function subMatrix(m, row, col) {
    return m.slice(1).map(r => r.filter((_, j) => j !== col));
}

function calculateRank() {
    let rank = Math.min(matrix.length, matrix[0].length);
    let rowEchelonForm = toRowEchelonForm(matrix);
    
    for (let i = 0; i < rowEchelonForm.length; i++) {
        if (rowEchelonForm[i].every(val => Math.abs(val) < 1e-10)) {
            rank--;
        }
    }
    
    showMessage(`Rank of the matrix is ${rank}`);
}

function toRowEchelonForm(m) {
    let result = JSON.parse(JSON.stringify(m)); // Deep copy
    let lead = 0;
    for (let r = 0; r < result.length; r++) {
        if (lead >= result[0].length) {
            return result;
        }
        let i = r;
        while (Math.abs(result[i][lead]) < 1e-10) {
            i++;
            if (i === result.length) {
                i = r;
                lead++;
                if (result[0].length === lead) {
                    return result;
                }
            }
        }
        let temp = result[i];
        result[i] = result[r];
        result[r] = temp;
        let val = result[r][lead];
        for (let j = 0; j < result[0].length; j++) {
            result[r][j] /= val;
        }
        for (let i = 0; i < result.length; i++) {
            if (i !== r) {
                val = result[i][lead];
                for (let j = 0; j < result[0].length; j++) {
                    result[i][j] -= val * result[r][j];
                }
            }
        }
        lead++;
    }
    return result;
}

function adjoint(m) {
    if (m.length === 1) {
        return [[1]];
    }
    let adj = [];
    for (let i = 0; i < m.length; i++) {
        adj[i] = [];
        for (let j = 0; j < m.length; j++) {
            let sign = ((i + j) % 2 === 0) ? 1 : -1;
            adj[i][j] = sign * determinant(subMatrix(m, j, i)); // Note: i and j are swapped for transpose
        }
    }
    return adj;
}

function calculateAdjoint() {
    if (matrix.length !== matrix[0].length) {
        showMessage("Adjoint can only be calculated for square matrices.");
        return;
    }

    let adj = adjoint(matrix);
    updateMatrixDisplay(adj);
    showMessage("Adjoint calculated and displayed.");
}

function showMessage(message) {
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        document.querySelector('.container').appendChild(messageBox);
    }
    messageBox.textContent = message;
}