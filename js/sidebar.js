const sidecontainer = document.querySelector(".sidecontainer");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const windowWidth = window.innerWidth;
  const not_open = 100; // Set the distance from the right for sidebar to appear
  const open = 250; // Set the distance from the right for sidebar to appear

  if (mouseX > windowWidth - not_open) {
    sidecontainer.classList.add("open");
    document.body.classList.add("sidebar-open");
  } else {
    if (sidecontainer.classList.contains("open")) {
      if (mouseX < windowWidth - open) {
        sidecontainer.classList.remove("open");
        document.body.classList.remove("sidebar-open");
      }
    }
  }
});
