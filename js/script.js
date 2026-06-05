// Caching DOM elements
const container = document.getElementById("grid-container");
const resizeBtn = document.getElementById("resize-btn");

// Constants
const INITIAL_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

/**
 * Generates the grid inside the container.
 * @param {number} squaresPerSide - The number of squares for the rows and columns.
 */
const createGrid = (squaresPerSide) => {
  // 1. Clear any existing grid to ensure a fresh canvas
  container.innerHTML = "";

  // 2. Calculate requirements
  const totalSquares = squaresPerSide * squaresPerSide;
  const squarePercentage = 100 / squaresPerSide; // Calculates the exact % width/height

  // 3. Build the grid
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    // Apply the calculated percentage to flex basis or width/height
    square.style.width = `${squarePercentage}%`;
    square.style.height = `${squarePercentage}%`;

    // Initialize state tracking using integers to bypass floating-point bugs.
    // 10 represents 100% opacity (fully bright/colored).
    square.dataset.opacityStep = "10";

    square.addEventListener("mouseover", applyPenStyle);

    container.appendChild(square);
  }
};

/**
 * Generates a random integer between 0 and 255.
 */
const getRandomRGBValue = () => {
  return Math.floor(Math.random() * 256);
};

/**
 * Handles the logic for randomizing color and decreasing opacity on interaction.
 */
const applyPenStyle = (event) => {
  const target = event.target;

  // 1. Parse the current step state
  let currentStep = parseInt(target.dataset.opacityStep, 10);

  // If it's already 0, the square is completely dark; no further processing needed
  if (currentStep === 0) return;

  // 2. Decrement the step by 1 (equivalent to a 10% reduction)
  currentStep -= 1;
  target.dataset.opacityStep = currentStep.toString();

  // 3. Generate a new random RGB color string
  const r = getRandomRGBValue();
  const g = getRandomRGBValue();
  const b = getRandomRGBValue();

  // 4. Apply styles inline
  target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  target.style.opacity = currentStep / 10;
};

const handleResizeRequest = () => {
  const userInput = prompt(
    `Enter new grid size (1 to ${MAX_GRID_SIZE}):`,
    "16",
  );

  // Check if the user clicked cancel or submitted an empty prompt
  if (userInput === null || userInput.trim() === "") {
    return;
  }

  // Parse the input into a base-10 integer
  const newSize = parseInt(userInput, 10);

  // Validation checks
  if (Number.isNaN(newSize) || newSize <= 0) {
    alert("Invalid input. Please enter a positive number.");
    return;
  }

  if (newSize > MAX_GRID_SIZE) {
    alert(
      `Limit exceeded. Please enter a number no larger than ${MAX_GRID_SIZE}.`,
    );
    return;
  }

  // If all validation passes, generate the new grid
  createGrid(newSize);
};

// Event listener for the button
resizeBtn.addEventListener("click", handleResizeRequest);

// Initialize application
createGrid(INITIAL_GRID_SIZE);
