"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// selecting elements
const header = document.querySelector(".header");
const nav = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");

// creating elements
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

header.prepend(message);
// header.before(message);
// header.after(message);

const btnCloseMessage = document.querySelector(".btn--close-cookie");

btnCloseMessage.addEventListener("click", () => {
  message.remove();
});

// style
message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.src);

// smooth scrooling

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", (event) => {
  // const section1Coordinates = section1.getBoundingClientRect();
  // console.log(section1Coordinates);
  // console.log(window.pageXOffset, window.pageYOffset);
  // window.scrollTo({
  //   left: section1Coordinates.x + window.pageYOffset,
  //   top: section1Coordinates.y + window.pageYOffset,
  //   behavior: "smooth",
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});

// scrolling with nav links

// console.log(navLinks);
// navLinks.forEach((element) => {
//   element.addEventListener("click", (event) => {
//     event.preventDefault();
//     const ref = element.getAttribute("href");
//     const section = document.querySelector(ref);
//     section.scrollIntoView({ behavior: "smooth" });
//   });
// });

// scrolling with nav links event delegation

nav.addEventListener("click", (event) => {
  event.preventDefault();
  const ref = event.target.getAttribute("href");
  const section = document.querySelector(ref);
  section.scrollIntoView({ behavior: "smooth" });
});

// tapped component

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".operations__tab");

  if (!clicked) return;

  clicked.classList.add("operations__tab--active");
  const id = clicked.dataset.tab;

  tabs.forEach((tab) => {
    if (tab.getAttribute("data-tab") !== clicked.getAttribute("data-tab"))
      tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
  });
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add("operations__content--active");
});

// menu fade animation

function mouseOverHandler(event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    const logo = link.closest(".nav").querySelector("img");
    logo.style.opacity = this;
  }
}

const navContainer = document.querySelector(".nav");
navContainer.addEventListener("mouseover", mouseOverHandler.bind(0.5));

navContainer.addEventListener("mouseout", mouseOverHandler.bind(1));

// sticky navigation

// const initialCoordinates = section1.getBoundingClientRect();

// window.addEventListener("scroll", () => {
//   // console.log(window.scrollY > initialCoordinates.top);
//   console.log(initialCoordinates.top < window.scrollY);
//   if (initialCoordinates.top < window.scrollY) {
//     console.log("inn");
//     navContainer.classList.add("sticky");
//   } else {
//     navContainer.classList.remove("sticky");
//   }
// });

const navHeight = navContainer.getBoundingClientRect().height;
const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observer.observe(header);

// reveal sections
const allSections = document.querySelectorAll(".section");

function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy images
const imagesTarget = document.querySelectorAll("img[data-src]");
console.log(imagesTarget);

function loadImg(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  imageObserver.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imagesTarget.forEach((image) => {
  imageObserver.observe(image);
});

// slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length;
// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${100 * index}%)`;
// });

function createDots() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide='${index}'></button>`
    );
  });
}

function activateDot(currentSlide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide='${currentSlide}']`)
    .classList.add("dots__dot--active");
}

function goToSlide(currentSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
}

goToSlide(0);
createDots();
activateDot(currentSlide);

const nextSlide = () => {
  currentSlide++;
  if (currentSlide === maxSlide) currentSlide = 0;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const previousSlide = () => {
  currentSlide--;
  if (currentSlide < 0) currentSlide = maxSlide - 1;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

sliderBtnRight.addEventListener("click", nextSlide);

sliderBtnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") previousSlide();
  if (event.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("dots__dot")) {
    currentSlide = Number(event.target.dataset.slide);
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
});

window.addEventListener("afterprint", (event) => {
  console.log("Print dialog closed.");
  // Restore layout or make adjustments here
});

if (window.onafterprint !== undefined) {
  console.log("The afterprint event is supported.");
} else {
  console.log("The afterprint event is not supported.");
}
