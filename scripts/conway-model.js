class Cell {
	constructor(x, y) {
		this.alive = false;
		this.aliveNext = false;
		this.color = 'white';
		this.colorNext = 'white';
		this.x = x;
		this.y = y;
		this.neighborhood = [];
		this.setNeighborhood = this.setNeighborhood.bind(this);
		this.deadColor = 'white';
	}

	born() {
		this.alive = true;
	}

	die() {
		this.alive = false;
		this.color = this.deadColor;
	}

	setNeighborhood(board, boardHeight, boardWidth) {
		let north, northeast, east, southeast, south, southwest, west, northwest;

		north = this.y - 1;
		south = this.y + 1;
		east = this.x + 1;
		west = this.x - 1;

		if (this.y == 0) {
			north = boardHeight - 1;
		} else if (this.y == boardHeight - 1) {
			south = 0;
		}

		if (this.x == 0) {
			west = boardWidth - 1;
		} else if (this.x == boardWidth - 1) {
			east = 0;
		}

		this.neighborhood = [
			this,
			board[north][this.x],
			board[north][east],
			board[this.y][east],
			board[south][east],
			board[south][this.x],
			board[south][west],
			board[this.y][west],
			board[north][west]
		];
	}

	parseNeighborhood() {
		return this.neighborhood.filter(cell => cell.alive);
	}

	neighborhoodColors() {
		return this.parseNeighborhood().map(cell => cell.color);
	}

	avgNeighborColors() {
		return this.neighborhoodColors().reduce((acc, curr, i) => {
			return d3.interpolate(acc, curr)(1 / (i + 1));
		});
	}

	interpolateColorNext() {
		if (this.alive) {
			this.colorNext = d3.interpolate(this.avgNeighborColors(), this.color)(0.5);
		} else if (this.aliveNext) {
			this.colorNext = this.avgNeighborColors();
		}
	}

	propagate() {
		if (this.parseNeighborhood().length === 3) {
			this.aliveNext = true;
		} else if (this.parseNeighborhood().length === 4) {
			this.aliveNext = this.alive;
		} else {
			this.aliveNext = false;
		}
		// this.interpolateColorNext();
	}

	advance() {
		this.color = this.colorNext;
		this.alive = this.aliveNext;
	}
}

class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.grid = Array2D.buildWith(width, height, this.cellsToGrid);
		this.quickSave = [];

		// debugger;

		Array2D.eachCell(this.grid, cell => {
			cell.setNeighborhood(this.grid, this.height, this.width);
		});
	}

	cellsToGrid(r, c) {
		return new Cell(c, r);
	}

	propagateBoard() {
		this.propagateAllCells();
		// console.clear();
		// console.log(this.demographyData);
	}

	propagateAllCells() {
		Array2D.eachCell(this.grid, cell => {
			cell.propagate();
		});
	}

	advance() {
		Array2D.eachCell(this.grid, cell => {
			cell.advance();
		});
	}

	cellClick(row, column, newColor, makeAlive) {
		let cell = this.grid[row][column];
		cell.color = newColor;
		cell.born();
	}

	rawArrayToQuickSave(rawArray) {
		return Array2D.map(rawArray, (cell, row, column) => {
			if (cell == 1) {
				return { alive: true, color: 'lightblue' };
			} else {
				return { alive: false, color: 'white' };
			}
		});
	}
}

// Patterns
const glider = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
const hive = [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2]];
const block = [[0, 0], [0, 1], [1, 0], [1, 1]];
const lwss = [[0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]];
const vlwss = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [3, 0], [4, 1], [4, 3]];
