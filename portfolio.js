/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-list a");
const logo = document.getElementById("logo");


/* ==========================================
   MOBILE MENU
========================================== */

let scrollTimer;

if (menuToggle && navMenu && navbar) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");

        if (navMenu.classList.contains("active")) {

            // Keep navbar visible while menu is open
            navbar.classList.remove("scrolling");

            clearTimeout(scrollTimer);

        } else {

            navbar.classList.remove("scrolling");

        }

    });

}


/* ==========================================
   CLOSE MENU WHEN LINK IS CLICKED
========================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");

            const bars = menuToggle.querySelectorAll("span");

            if (bars.length === 3) {

                bars[0].style.transform = "";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "";

            }
        }

        if (navbar) {
            navbar.classList.remove("scrolling");
        }

        clearTimeout(scrollTimer);

    });

});


/* ==========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================== */

document.addEventListener("click", (e) => {

    if (!navMenu || !menuToggle) return;

    if (
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {

        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        const bars = menuToggle.querySelectorAll("span");

        if (bars.length === 3) {

            bars[0].style.transform = "";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "";

        }

    }

});


/* ==========================================
   CLOSE MENU WITH ESC
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");

            const bars = menuToggle.querySelectorAll("span");

            if (bars.length === 3) {

                bars[0].style.transform = "";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "";

            }
        }

        if (navbar) {
            navbar.classList.remove("scrolling");
        }

        clearTimeout(scrollTimer);

    }

});


/* ==========================================
   SMOOTH SCROLL
========================================== */

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        e.preventDefault();

        const headerHeight = navbar
            ? navbar.getBoundingClientRect().height + 20
            : 100;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,
            behavior: "smooth"

        });

    });

});


/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

if (navbar) {

    window.addEventListener("scroll", () => {

        // Mobile menu is open:
        // NEVER hide the navbar
        if (
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navbar.classList.remove("scrolling");

            clearTimeout(scrollTimer);

            return;

        }

        // Hide navbar while scrolling
        navbar.classList.add("scrolling");

        clearTimeout(scrollTimer);

        // Show navbar shortly after scrolling stops
        scrollTimer = setTimeout(() => {

            if (
                !navMenu ||
                !navMenu.classList.contains("active")
            ) {

                navbar.classList.remove("scrolling");

            }

        }, 800);

    });

}


/* ==========================================
   HAMBURGER ANIMATION
========================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const bars =
            menuToggle.querySelectorAll("span");

        if (bars.length !== 3) {
            return;
        }

        if (menuToggle.classList.contains("active")) {

            bars[0].style.transform =
                "rotate(45deg) translate(7px, 7px)";

            bars[1].style.opacity = "0";

            bars[2].style.transform =
                "rotate(-45deg) translate(7px, -7px)";

        } else {

            bars[0].style.transform = "";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "";

        }

    });

}


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
    document.querySelectorAll("section");

function activateNav() {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 140;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("current");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("current");

        }

    });

}

window.addEventListener("scroll", activateNav);


/* ==========================================
   TYPING EFFECT
========================================== */

const typingText =
    document.getElementById("typing-text");

const words = [

    "Software Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer"

];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                letterIndex + 1
            );

        letterIndex++;

        if (
            letterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1700
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                letterIndex - 1
            );

        letterIndex--;

        if (letterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );

}

typeEffect();


/* ==========================================
   REVEAL ON SCROLL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers
    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* ==========================================
   FLOATING HERO IMAGE
========================================== */

const floating =
    document.querySelector(".floating");

if (floating) {

    let start = null;

    function float(timestamp) {

        if (!start) {
            start = timestamp;
        }

        const progress =
            (timestamp - start) / 900;

        floating.style.transform =
            `translateY(${Math.sin(progress) * 10}px)`;

        requestAnimationFrame(float);

    }

    requestAnimationFrame(float);

}


/* ==========================================
   HERO BUTTON EFFECT
========================================== */

const heroButtons =
    document.querySelectorAll(".hero-btn");

heroButtons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-6px)";

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translateY(0px)";

        }
    );

});


/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    activateNav();

});


/* ==========================================
   LOGO - SCROLL TO TOP
========================================== */

if (logo) {

    logo.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/* ==========================================
   RESIZE
========================================== */

window.addEventListener("resize", () => {

    activateNav();

});


/* ==========================================
   END
========================================== */