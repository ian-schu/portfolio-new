const typeControl = (domElement, array) => {
	let counter = -1;
	let typing = false;
	let deleting = false;

	setInterval(() => {
		if (domElement.textContent.length === 0) {
			counter++;
			typing = typeString(domElement, array[counter % array.length]);
		} else if (domElement.textContent.length === array[counter % array.length].length) {
			deleting = deleteString(domElement);
		}
	}, 1500);
};

const typeString = (domElement, str) => {
	let index = 1;
	let interval = setInterval(() => {
		domElement.textContent = str.slice(0, index);
		index++;
		if (index > str.length) {
			clearInterval(interval);
			return false;
		} else {
			return true;
		}
	}, 100);
	return interval;
};

const deleteString = domElement => {
	let str = domElement.textContent;
	let index = str.length;
	let interval = setInterval(() => {
		domElement.textContent = str.slice(0, index);
		index--;
		if (index < 0) {
			clearInterval(interval);
			return true;
		} else {
			return false;
		}
	}, 60);
};

blurbArray = [
	'node',
	'vanilla javascript',
	'design patterns',
	'express',
	'postgres',
	'data',
	'AJAX',
	'conversations',
	'cats',
	'learning',
	'time complexity',
	'history',
	'physics',
	'humans',
	'a challenge',
	'linguistics',
	'good questions',
	'oxford commas'
];
