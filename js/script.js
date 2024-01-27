document.addEventListener("DOMContentLoaded", function () {
  let footer = document.getElementById("footer");

  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    // Calculate how far the user has scrolled from the bottom
    let distanceFromBottom = documentHeight - (scrollPosition + windowHeight);

    // Show/hide the footer based on scroll position
    if (distanceFromBottom <= 75) {
      footer.style.display = "block";
      setTimeout(function () {
        footer.style.opacity = 1;
      }, 50); // Delay the opacity transition for a smoother effect
    } else {
      footer.style.opacity = 0;
      setTimeout(function () {
        footer.style.display = "none";
      }, 500); // Delay the display change for a smoother effect
    }
  });
});
