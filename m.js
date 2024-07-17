let currentMatrix = [];

function visualizeMatrix() {
    const input = document.getElementById('matrixInput').value;
    const rows = input.split(';');
    currentMatrix = rows.map(row => row.split(',').map(Number));
    
    renderMatrix();
    displayMessage("Matrix visualized.");
}

function renderMatrix() {
    const matrixContainer = document.getElementById('matrix');
    matrixContainer.innerHTML = '';
    matrixContainer.style.gridTemplateColumns = `repeat(${currentMatrix[0].length}, 40px)`;

    for (let i = 0; i < currentMatrix.length; i++) {
        for (let j = 0; j < currentMatrix[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = currentMatrix[i][j];
            cell.onclick = () => editCell(i, j);
            matrixContainer.appendChild(cell);
        }
    }
}

function editCell(row, col) {
    const newValue = prompt(`Enter new value for cell [${row}][${col}]:`, currentMatrix[row][col]);
    if (newValue !== null) {
        currentMatrix[row][col] = Number(newValue);
        renderMatrix();
        displayMessage(`Cell [${row}][${col}] updated to ${newValue}.`);
    }
}

function highlightMainDiagonal() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / currentMatrix[0].length);
        const col = index % currentMatrix[0].length;
        if (row === col) {
            cell.classList.toggle('highlighted');
        } else {
            cell.classList.remove('highlighted');
        }
    });
    displayMessage("Main diagonal highlighted.");
}

function highlightSecondaryDiagonal() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / currentMatrix[0].length);
        const col = index % currentMatrix[0].length;
        if (row + col === currentMatrix.length - 1) {
            cell.classList.toggle('highlighted');
        } else {
            cell.classList.remove('highlighted');
        }
    });
    displayMessage("Secondary diagonal highlighted.");
}

function transposeMatrix() {
    currentMatrix = currentMatrix[0].map((_, colIndex) => currentMatrix.map(row => row[colIndex]));
    renderMatrix();
    displayMessage("Matrix transposed.");
}

function rotateMatrix() {
    currentMatrix = currentMatrix[0].map((_, index) => 
        currentMatrix.map(row => row[index]).reverse()
    );
    renderMatrix();
    displayMessage("Matrix rotated 90° clockwise.");
}

function generateRandomMatrix() {
    const rows = Math.floor(Math.random() * 3) + 2;  // 2 to 4 rows
    const cols = Math.floor(Math.random() * 3) + 2;  // 2 to 4 columns
    currentMatrix = Array.from({length: rows}, () => 
        Array.from({length: cols}, () => Math.floor(Math.random() * 10))
    );
    renderMatrix();
    displayMessage(`Random ${rows}x${cols} matrix generated.`);
}

function addElement() {
    const row = parseInt(document.getElementById('rowInput').value);
    const col = parseInt(document.getElementById('colInput').value);
    const value = parseInt(document.getElementById('valueInput').value);

    if (isNaN(row) || isNaN(col) || isNaN(value)) {
        displayMessage("Please enter valid numbers for row, column, and value.");
        return;
    }

    // Expand matrix if necessary
    while (currentMatrix.length <= row) {
        currentMatrix.push([]);
    }
    while (currentMatrix[row].length <= col) {
        currentMatrix[row].push(0);
    }

    currentMatrix[row][col] = value;
    renderMatrix();
    displayMessage(`Added value ${value} at position [${row}][${col}].`);
}

function removeElement() {
    const row = parseInt(document.getElementById('rowInput').value);
    const col = parseInt(document.getElementById('colInput').value);

    if (isNaN(row) || isNaN(col)) {
        displayMessage("Please enter valid numbers for row and column.");
        return;
    }

    if (row >= currentMatrix.length || col >= currentMatrix[0].length) {
        displayMessage("The specified position does not exist in the matrix.");
        return;
    }

    currentMatrix[row][col] = 0;  // Set to 0 instead of removing to maintain matrix structure
    renderMatrix();
    displayMessage(`Removed element at position [${row}][${col}].`);
}

function displayMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
}

// New functions

function addMatrix() {
    const secondMatrix = prompt("Enter the second matrix (use the same format as input):").split(';').map(row => row.split(',').map(Number));
    if (currentMatrix.length !== secondMatrix.length || currentMatrix[0].length !== secondMatrix[0].length) {
        displayMessage("Matrices must have the same dimensions for addition.");
        return;
    }
    currentMatrix = currentMatrix.map((row, i) => row.map((val, j) => val + secondMatrix[i][j]));
    renderMatrix();
    displayMessage("Matrices added successfully.");
}

function multiplyMatrix() {
    const secondMatrix = prompt("Enter the second matrix (use the same format as input):").split(';').map(row => row.split(',').map(Number));
    if (currentMatrix[0].length !== secondMatrix.length) {
        displayMessage("Number of columns in the first matrix must equal the number of rows in the second matrix.");
        return;
    }
    const result = [];
    for (let i = 0; i < currentMatrix.length; i++) {
        result[i] = [];
        for (let j = 0; j < secondMatrix[0].length; j++) {
            result[i][j] = currentMatrix[i].reduce((sum, element, k) => sum + element * secondMatrix[k][j], 0);
        }
    }
    currentMatrix = result;
    renderMatrix();
    displayMessage("Matrices multiplied successfully.");
}

function calculateDeterminant() {
    if (currentMatrix.length !== currentMatrix[0].length) {
        displayMessage("Determinant can only be calculated for square matrices.");
        return;
    }
    const det = determinant(currentMatrix);
    displayMessage(`The determinant is: ${det}`);
}

