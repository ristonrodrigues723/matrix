let currentMatrix = [];

function visualizeMatrix() {
    const input = document.getElementById('matrixInput').value;
    const rows = input.split(';');
    currentMatrix = rows.map(row => row.split(',').map(Number));
    
    renderMatrix();
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
}

function transposeMatrix() {
    currentMatrix = currentMatrix[0].map((_, colIndex) => currentMatrix.map(row => row[colIndex]));
    renderMatrix();
}

function rotateMatrix() {
    currentMatrix = currentMatrix[0].map((_, index) => 
        currentMatrix.map(row => row[index]).reverse()
    );
    renderMatrix();
}