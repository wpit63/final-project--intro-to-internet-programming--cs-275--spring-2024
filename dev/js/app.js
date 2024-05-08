window.onload = () => {
    let height = window.prompt(`Please enter a positive integer`,0);
    while(isNaN(parseInt(height)) || height < 2){
        height = window.prompt(`ERR: Please enter a positive integer`,0);
    }
    console.log(`pass`);
    height = Math.abs(height);
    let val = 1;
    let arr = new Array(height);
    for (let i = 0; i < height; i++) {
        arr[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            arr[i][j] = val++;
        }
    }
    createTable(arr);
    arr = transpose(arr);
    createTable(arr);
};

function createTable(tableData) {
    var table = document.createElement(`table`);
    var tableBody = document.createElement(`tbody`);
    tableData.forEach(function(rowData) {
        var row = document.createElement(`tr`);
        rowData.forEach(function(cellData) {
            var cell = document.createElement(`td`);
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

function transpose(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
        grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[j][i] = matrix[i][j];
        }
    }
    return grid;
}
