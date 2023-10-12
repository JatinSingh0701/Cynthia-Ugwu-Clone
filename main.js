import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

let menu = document.getElementById("menu");
let navbar = document.getElementById("hidden");
let mouse = document.querySelector("#minicircle");
let timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

const firstPageAnim = () => {
  let tl = gsap.timeline();

  tl.from("nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    // ease: easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      // ease: easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      // ease: Expo.easeInOut,
    });
};

const fullNavbar = () => {
  menu.addEventListener("click", () => {
    menu.style.display = "none";
    navbar.style.display = "flex";
  });
};

const mouseSkew = () => {
  let xScale = 1;
  let yScale = 2;

  let xPrev = 0;
  let yPrev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);

    xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev);

    xPrev = dets.clientX;
    yPrev = dets.clientY;

    mouseFollower(xScale, yScale);

    timeout = setTimeout(() => {
      mouse.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
};

const mouseFollower = (xScale, yScale) => {
  window.addEventListener("mousemove", (dets) => {
    mouse.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
  });
};

document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseleave", (dets) => {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3",
    });
  });

  elem.addEventListener("mousemove", (dets) => {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power3",
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

firstPageAnim();
mouseSkew();
fullNavbar();
