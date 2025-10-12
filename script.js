console.clear();
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function scrollSmoother__init() {
  gsap.matchMedia().add("(min-width: 769px)", () => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
    });

    return () => {
      if (smoother) smoother.kill();
    };
  });
}

function loading__init() {
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
  const loadingPage = document.querySelector(".loading-page");
  const loadingImg = loadingPage.querySelector("#loading-image");
  let loadingImgArr = [
    "image/loading_screen/intro_img01.png",
    "image/loading_screen/intro_img02.png",
    "image/loading_screen/intro_img03.png",
    "image/loading_screen/intro_img04.png",
    "image/loading_screen/intro_img05.png",
    "image/loading_screen/intro_img06.png",
    "image/loading_screen/intro_img07.png",
    "image/loading_screen/intro_img08.png",
    "image/loading_screen/intro_img09.png",
    "image/loading_screen/intro_img10.png",
    "image/loading_screen/intro_img11.png",
    "image/loading_screen/intro_img12.png",
    "image/loading_screen/intro_img13.png",
    "image/loading_screen/intro_img14.png",
    "image/loading_screen/intro_img15.png",
    "image/loading_screen/intro_img16.png",
  ];
  let imgArrLength = loadingImgArr.length;
  for (let i = 0; i < imgArrLength; i++) {
    setTimeout(() => {
      loadingImg.src = loadingImgArr[i];
    }, i * 300);
  }

  let loadingTime = imgArrLength * 300;

  const percentage = loadingPage.querySelector(".percentage--number");
  percentage.textContent = "0";

  for (let i = 0; i <= 100; i++) {
    setTimeout(() => {
      percentage.textContent = i;
    }, i * 45);
  }

  setTimeout(() => {
    loadingPage.classList.remove("active");
    body.style.overflow = "auto";
  }, loadingTime);
}

function mainSwiper__init() {
  const sec1SwiperEl = document.querySelector(".section-1 .swiper-container");
  const sec1Swiper = new Swiper(sec1SwiperEl, {
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
  });
}

function sec2Gsap__init() {
  const target = document.querySelector(".section-2-wrap");
  const pinWrap = document.querySelector(".section-2");
  const spans = pinWrap.querySelectorAll("span.overlay");

  const timeline = gsap.timeline();

  timeline.fromTo(
    spans,
    {
      width: 0,
    },
    {
      width: "100%",
      duration: 1,
      stagger: 1,
      ease: "none",
    }
  );
  const st = ScrollTrigger.create({
    trigger: pinWrap,
    pin: true,
    start: "top top",
    end: "+=250%",
    scrub: 1,
    animation: timeline,
    // markers: true,
  });
}

function sec3Gsap__init() {
  const target = document.querySelectorAll(".section-3 .portfolio .port-item");
  target.forEach((portCard) => {
    let tl = gsap.timeline();
    gsap.set(portCard, {
      width: () => getWidth().defaultWidth,
    });
    tl.to(
      portCard,
      {
        width: () => getWidth().activeWidth,
        ease: "none",
        duration: 0.3,
      },
      0
    ).to(
      portCard,
      {
        width: () => getWidth().defaultWidth,
        ease: "none",
        duration: 0.3,
      },
      0.9
    );

    let st = ScrollTrigger.create({
      trigger: portCard,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      animation: tl,
      // markers: true,
    });

    st.refresh();
  });
}

function getWidth() {
  let innerWidth = window.innerWidth;
  let isMobile = innerWidth <= 768;

  return {
    activeWidth: isMobile ? innerWidth * 0.9 : "60rem",
    defaultWidth: isMobile ? innerWidth * 0.6 : "34rem",
  };
}

function sec4Gsap__init() {
  const ScrollTarget = document.querySelector(".section-4");
  const aniTarget = ScrollTarget.querySelector(".item-box-2");

  let tl = gsap.timeline();
  gsap.set(aniTarget, { y: -150 });
  tl.fromTo(aniTarget, { y: -150 }, { y: 100, ease: "none", duration: 10 });

  let st = ScrollTrigger.create({
    trigger: ScrollTarget,
    animation: tl,
    scrub: 3,
    end: "bottom top",
  });

  st.refresh();
}

let marqueeAniInstance = null;
let marqueeEventInstance = false;
function marqueeWidth() {
  const marquee = document.querySelector(".marquee-container");
  const marqueeWrap = marquee.querySelector(".marquee-wrap");
  const marqueeSlide = marqueeWrap.querySelector(".marquee-slide");
  let width = marqueeSlide.getBoundingClientRect().width;

  const marqueeAni = [{ transform: `translateX(0)` }, { transform: `translateX(-${width}px)` }];
  let duration = 8000;
  const marqueeTiming = {
    duration: duration,
    iterations: Infinity,
    easing: "linear",
  };

  if (marqueeAniInstance) {
    marqueeAniInstance.cancel();
  }
  marqueeAniInstance = marqueeWrap.animate(marqueeAni, marqueeTiming);

  if (!marqueeEventInstance) {
    marqueeWrap.addEventListener("pointerenter", () => {
      marqueeAniInstance.playbackRate = 0.3;
    });
    marqueeWrap.addEventListener("pointerleave", () => {
      marqueeAniInstance.playbackRate = 1;
    });
  }
  marqueeEventInstance = true;
}

function footerMenuSwap() {
  const footerMenuEl = document.querySelectorAll(".footer .overflow-box > span");

  footerMenuEl.forEach((el) => {
    let content = el.textContent;
    el.style.setProperty("--content", `"${content}"`);
  });
}

function mNavToggle() {
  const navBtnEl = document.querySelector(".header .nav-btn");
  const mNavEl = document.querySelector(".mob-nav-wrap");
  const mNavCloseBtnEl = mNavEl.querySelector(".btn-close");
  navBtnEl.addEventListener("click", () => {
    mNavEl.classList.add("active");
  });
  mNavCloseBtnEl.addEventListener("click", () => {
    mNavEl.classList.remove("active");
  });
}

// global

// load
window.addEventListener("DOMContentLoaded", () => {
  loading__init();
  scrollSmoother__init();
});
window.addEventListener("load", () => {
  mainSwiper__init();
  sec2Gsap__init();
  sec3Gsap__init();
  sec4Gsap__init();
  footerMenuSwap();
  marqueeWidth();
  mNavToggle();
});

// resize
let ViewportWidth = window.innerWidth;
let resizeTimer;
window.addEventListener("resize", () => {
  if (ViewportWidth === window.innerWidth) {
    return;
  }
  ViewportWidth = window.innerWidth;

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.getAll().forEach((el) => {
      el.kill();
    });
    sec2Gsap__init();
    sec3Gsap__init();
    sec4Gsap__init();
    marqueeWidth();

    ScrollTrigger.refresh(true);

    if (ViewportWidth <= 768) {
      // avoid blank bottom when scrollsmoother is off
      document.querySelector("body").style.height = "auto";
    }
  }, 200);
});
