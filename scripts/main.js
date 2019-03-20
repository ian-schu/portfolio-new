// navToggle.addEventListener('click', () => {
// 	toggleClass(navUL, 'nav__ul--show');
// });

// Initialize Conway game board
const resolveBoardDimensions = () => {
  let width = deviceIsMobile ? 25 : 50;
  let height = Math.round(width / viewportRatio);
  return [width, height];
};

const [bWidth, bHeight] = resolveBoardDimensions();
const conwayView = new View(bWidth, bHeight, gameboard);
const conwayModel = new Board(bWidth, bHeight);
const conwayControl = new Controller(conwayView, conwayModel);

let notPlayedYet = true;

gameboard.addEventListener("mousedown", conwayControl.cellClick, false);
gameboard.addEventListener("mouseover", conwayControl.cellClick, false);
gameboard.addEventListener("touchend", conwayControl.cellClick, false);

// Start typey
setTimeout(() => typeControl(likeSpan, blurbArray), 3000);

// Drop patterns
const dropAllPatterns = () => {
  if (!deviceIsMobile) {
    const gliders = [
      [bHeight * 0.1, bWidth * 0.1],
      [bHeight * 0.25, bWidth * 0.4]
    ];
    const hives = [
      [bHeight * 0.65, bWidth * 0.1],
      [bHeight * 0.9, bWidth * 0.8]
    ];
    const blocks = [
      [bHeight * 0.27, bWidth * 0.7],
      [bHeight * 0.8, bWidth * 0.1]
    ];
    const spaceships = [
      [bHeight * 0.4, bWidth * 0.75],
      [bHeight * 0.68, bWidth * 0.55]
    ];

    dropPatterns(glider, gliders);
    dropPatterns(hive, hives);
    dropPatterns(block, blocks);
    dropPatterns(lwss, spaceships);
  } else {
    const hives = [
      [bHeight * 0.18, bWidth * 0.1],
      [bHeight * 0.12, bWidth * 0.4],
      [bHeight * 0.22, bWidth * 0.55],
      [bHeight * 0.16, bWidth * 0.75]
    ];
    const vSpaceships = [
      [bHeight * 0.8, bWidth * 0.1],
      [bHeight * 0.8, bWidth * 0.4],
      [bHeight * 0.8, bWidth * 0.7]
    ];
    dropPatterns(vlwss, vSpaceships);
    dropPatterns(hive, hives);
  }
};

playButton.addEventListener("click", () => {
  if (notPlayedYet) {
    notPlayedYet = false;
    greeting.style.opacity = 0;
    setTimeout(() => {
      greeting.remove();
    }, 1000);
    setTimeout(() => {
      dropAllPatterns();
    }, 1600);
    setTimeout(() => {
      conwayControl.play();
      playButtonText.textContent = "Pause";
    }, 2400);
  } else if (conwayControl.isPlaying) {
    conwayControl.stop();
    playButtonText.textContent = "Play";
  } else {
    conwayControl.play();
    playButtonText.textContent = "Pause";
  }
});
