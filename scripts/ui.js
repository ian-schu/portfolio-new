const getById = elementID => {
	return document.getElementById(elementID);
};

const navUL = getById('navUL');
const gameboard = getById('gameboard');

const playButton = getById('playButton');
let playButtonText = playButton.children[1];

const greeting = document.getElementsByClassName('greeting')[0];
const likeSpan = getById('likeSpan');

const deviceIsMobile = window.innerWidth <= 500;
const viewportRatio = window.innerWidth / window.innerHeight;

const toggleClass = (element, className) => {
	element.classList.toggle(className);
};
