let clickCounter = 0;
let clickStartTime;
const clickText = document.getElementById("clickText"); // Updated the variable name

clickText.addEventListener("click", () => {
  // Updated the variable name
  const now = Date.now();

  if (!clickStartTime || now - clickStartTime > 1000) {
    // Reset the counter if more than 1 second has passed
    clickCounter = 0;
    clickStartTime = now;
  }

  clickCounter++;
  console.log(`Text clicked ${clickCounter} times in 1 second.`);

  if (clickCounter === 5) {
    // Open another HTML page
    window.location.href = "html/snake.html";
    // Optionally, you can reset the counter or perform other actions here
    clickCounter = 0;
    clickStartTime = now;
  }
});
