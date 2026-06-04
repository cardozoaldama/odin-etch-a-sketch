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
function createGrid(squaresPerSide) {
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

    // Attach the hover event listener to each square
    square.addEventListener("mouseover", applyPenStyle);

    container.appendChild(square);
  }
}

/**
 * Event handler for mouseover that leaves the pixelated trail.
 */
function applyPenStyle(event) {
  // 'event.target' refers to the specific div that triggered the event
  event.target.classList.add("active");
}

/**
 * Prompts the user for a new size, validates it, and redraws the grid.
 */
function handleResizeRequest() {
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
}

// Event listener for the button
resizeBtn.addEventListener("click", handleResizeRequest);

// Initialize the application on load
createGrid(INITIAL_GRID_SIZE);
