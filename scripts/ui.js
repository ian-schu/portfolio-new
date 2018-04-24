const getById = elementID => {
	return document.getElementById(elementID);
};

// const navToggle = getById('navToggle');
const navUL = getById('navUL');
const gameboard = getById('gameboard');

const bottomnav = getById('bottomnav');
const prevButton = getById('prevButton');
const nextButton = getById('nextButton');
const playButton = getById('playButton');
let playButtonText = playButton.children[1];

const greeting = document.getElementsByClassName('greeting')[0];
const likeSpan = getById('likeSpan');

const deviceIsMobile = window.innerWidth <= 500;
const viewportRatio = window.innerWidth / window.innerHeight;

const toggleClass = (element, className) => {
	element.classList.toggle(className);
};

nextButton.addEventListener('click', () => {
	window.scrollBy({
		top: 0.94 * window.innerHeight,
		left: 0,
		behavior: 'smooth'
	});
});

prevButton.addEventListener('click', () => {
	window.scrollBy({
		top: -0.94 * window.innerHeight,
		left: 0,
		behavior: 'smooth'
	});
});

document.addEventListener('scroll', () => {
	bottomnav.style.opacity = 0;
	setTimeout(() => {
		bottomnav.style.opacity = 1;
	}, 1500);
});
