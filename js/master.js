// check if there is local storage color ooption
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null)
  // console.log("local storage is not empty and you can set it on the root now");
  // console.log(localStorage.getItem("color-option"));

  document.documentElement.style.setProperty("--main--color", mainColors);

//  remove active class from all colors list item
document.querySelectorAll(".colors-list li").forEach((element) => {
  element.classList.remove("active");

  // add active class on element with data color === local storage item
  if (element.dataset.color === mainColors) {
    // add active class
    element.classList.add("active");
  }
});

// random background option
let backgroundOption = true;

// variable to control the  background interval
let backgroundInterval;

// check if there is local storage backgroun item
let backgroundLocalItem = localStorage.getItem("background-option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class on element with data background === local storage item
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
// click on toggle setting gear
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  // toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // toggle class open for setting box
  document.querySelector(".setting-box").classList.toggle("open");
};

// swith colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop in list item
colorsLi.forEach((li) => {
  // click on every list items
  li.addEventListener("click", (e) => {
    // set color in root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // set color in local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

// swith random background
const bgOption = document.querySelectorAll(".random-backgrounds span");
// loop in all spans
bgOption.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});
// // select landing page element
// let landingPage = document.querySelector(".landing-page");

// // Get array of imags
// let imgsArray = [
//   "01.jpeg",
//   "02.jpeg",
//   "03.jpeg",
//   "04.jpeg",
//   "05.jpeg",
//   "06.jpeg",
//   "07.jpeg",
// ];

// // function to randomize images
// function randomizeImgs() {
//   if (backgroundOption === true) {
//     backgroundInterval = setInterval(() => {
//       // get random Number
//       let randomNumber = Math.floor(Math.random() * imgsArray.length);

//       // change background Image URL
//       landingPage.style.backgroundImage =
//         'url("images/' + imgsArray[randomNumber] + '")';
//     }, 1000);
//   }
// }

// randomizeImgs();

// read more clickable
document.querySelectorAll(".image-text").forEach(function (imageText) {
  let readMoreButton = imageText.querySelector(".read-more");
  let additionalContent = imageText.querySelector(".additionl-content");

  readMoreButton.addEventListener("click", function () {
    additionalContent.classList.toggle("hidden");
    if (additionalContent.classList.contains("hidden")) {
      readMoreButton.textContent = "READ MORE...";
    } else {
      readMoreButton.textContent = "READ LESS";
    }
  });
});

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //skills offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // this.console.log(skillsOuterHeight);

  // window height
  let windowHeight = this.innerHeight;

  // window scrolltop
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// review scrolling
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalReviews = slider.children.length;

  nextBtn.addEventListener("click", function () {
    if (currentIndex < totalReviews - 1) {
      currentIndex++;
      slideTo(currentIndex);
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      slideTo(currentIndex);
    }
  });

  function slideTo(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
});

// overlay form visability
let overlayForm = document.querySelector(".overlay-form");
// handle function to display form
function showform() {
  overlayForm.classList.add("active");
}
// handle function to close form
function hideform() {
  overlayForm.classList.remove("active");
}

// creat popup with th image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to the body
    document.body.appendChild(overlay);

    // creat the popup
    let popupBox = document.createElement("div");

    // add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // add heading to the img
      let imgHeading = document.createElement("h3");

      // creat text to heading
      let textHeading = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(textHeading);

      // append the heading to the img popup
      popupBox.appendChild(imgHeading);
    }

    // creat the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);

    // append the popup box to the body
    document.body.appendChild(popupBox);

    // creat the close span
    let closeBtn = document.createElement("span");

    // add close btn text "X"
    let closeBtnText = document.createTextNode("X");

    // append close btn to span
    closeBtn.appendChild(closeBtnText);

    // add class to the close btn
    closeBtn.className = "close-button";

    // add span to the popup box
    popupBox.appendChild(closeBtn);

    // close popup
    document.addEventListener("click", (e) => {
      if (e.target.className == "close-button") {
        // remove the current popup
        e.target.parentNode.remove();
        // remove the overlay
        document.querySelector(".popup-overlay").remove();
      }
    });
  });
});

//  scroll to every section
document.querySelectorAll(".header-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// handle active satate

function handleActive(ev) {
  // remove active class from all childerns
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on self
  ev.target.classList.add("active");
}

// toggle menue
let toggleBtn = document.querySelector(".toggle-menu");

let tLinks = document.querySelector(".links");

toggleBtn.addEventListener("click", function () {
  // toggle class "menu-active" on the button
  this.classList.toggle("menu-active");

  //toggle class "open" on links
  tLinks.classList.toggle("open");
});

// close the menu when clicking anywhere on the window
window.addEventListener("click", (e) => {
  if (!tLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
    tLinks.classList.remove("open");
    toggleBtn.classList.remove("menu-active");
  }
});
