class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.playDelayMs = 100;
		this.isPlaying = false;
		this.playInterval = 0;

		// Bind all the THIS's
		this.cellClick = this.cellClick.bind(this);
		this.advance = this.advance.bind(this);
		this.play = this.play.bind(this);
		this.clear = this.clear.bind(this);
		this.changeCellFade = this.changeCellFade.bind(this);
		this.makeQuickSave = this.makeQuickSave.bind(this);
		this.revertToQuickSave = this.revertToQuickSave.bind(this);
		this.toggleAutoQuickSave = this.toggleAutoQuickSave.bind(this);
	}

	changeCellFade() {
		Array2D.eachCell(this.view.grid, cell => {
			cell.style.transitionDuration = this.playback.fadeSelector.value;
		});
	}

	toggleAutoQuickSave() {
		this.autoQuickSave = this.autoQuickSave ? false : true;
		this.playback.toggleAutoQuickSave();
	}

	selectColor(selection) {
		this.palette.selectColor(selection);
	}

	cellClick(ev) {
		if (ev.target.className === 'cell' && (ev.buttons === 1 || ev.type === 'click')) {
			let row = ev.target.dataset.y;
			let column = ev.target.dataset.x;

			this.model.cellClick(row, column, 'lightblue', true);
			this.cellChangeColor(row, column);

			// console.log(this.model.grid[row][column]);
			// console.log(this.view.grid[row][column]);
		}
	}

	cellChangeColor(row, column) {
		this.view.cellChangeColor(row, column, 'lightblue');
	}

	advance() {
		this.model.propagateBoard();
		this.model.advance();
		this.view.redraw(this.model);
	}

	clickPlay() {
		if (this.isPlaying) {
			this.stop();
		} else if (!this.isPlaying && this.autoQuickSave) {
			this.makeQuickSave();
			this.play();
		} else {
			this.play();
		}
	}

	play() {
		this.playInterval = setInterval(() => {
			this.advance();
		}, this.playDelayMs);
		this.isPlaying = true;
		document.body.focus();
	}

	stop() {
		clearInterval(this.playInterval);
		this.isPlaying = false;
		document.body.focus();
	}

	makeFullSave(saveName) {
		let saveObj = this.model.generateFullSave();
		saveObj.name = saveName;
		localStorage.setItem(saveName, JSON.stringify(saveObj));
	}

	makeQuickSave() {
		this.model.makeQuickSave();
	}

	revertToQuickSave() {
		this.model.revertToQuickSave();
		this.view.redraw(this.model, this.palette.deadColor);
	}

	clear() {
		this.model.clear(this.palette.deadColor);
		this.view.redraw(this.model, this.palette.deadColor);
		this.demographics.updateDemographics(this.model.demographyData);
	}
}

const dropPattern = (controller, color, startCoords, pattern) => {
	for (let coord of pattern) {
		let y = coord[0] + startCoords[0];
		let x = coord[1] + startCoords[1];
		controller.model.cellClick(y, x, color, true);
		controller.cellChangeColor(y, x);
	}
};

const dropPatterns = (model, modelCoords) => {
	for (let coord of modelCoords) {
		coord[0] = Math.round(coord[0]);
		coord[1] = Math.round(coord[1]);
		dropPattern(conwayControl, '#fcc0a6', coord, model);
	}
};
