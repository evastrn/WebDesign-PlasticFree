document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider");
    const progressBars = document.querySelectorAll(".progress-bar");
    const buttonContainers = document.querySelectorAll(".category-button-container");

    sliders.forEach((slider, index) => {
        const progressBar = progressBars[index];
        const buttonContainer = buttonContainers[index];

        const calculateMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;
        const calculateSlideWidth = () => slider.querySelector('.slider-item').offsetWidth;

        const updateProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const progressValue = (slider.scrollLeft / maxScrollLeft) * 100;
            progressBar.style.width = `${progressValue}%`;

            const slideWidth = calculateSlideWidth();
            if (slider.scrollLeft >= slideWidth) {
                buttonContainer.classList.add("visible");
            } else {
                buttonContainer.classList.remove("visible");
            }
        };

        // Snap to closest slide
        const snapToClosestSlide = () => {
            const slideWidth = calculateSlideWidth();
            const closestSlide = Math.round(slider.scrollLeft / slideWidth);
            slider.scrollTo({
                left: closestSlide * slideWidth,
                behavior: "smooth",
            });
        };

        slider.addEventListener("scroll", () => {
            updateProgressBar();
        });

        slider.addEventListener("touchend", () => {
            snapToClosestSlide();
        });

        slider.addEventListener("mouseup", () => {
            snapToClosestSlide();
        });

        // Fortschrittsbalken initialisieren
        updateProgressBar();
    });
});







    // Burger-Menü-Funktionalität
    const burgerMenu = document.querySelector(".burger-menu");
    const sideMenu = document.querySelector(".side-menu");

    burgerMenu.addEventListener("click", () => {
        sideMenu.classList.toggle("visible");
    });

    document.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
            sideMenu.classList.remove("visible");
        }
    });

    // Event-Listener für die Plus-Menü-Auswahl
    document.querySelectorAll('.menu-plus').forEach((plus) => {
        plus.addEventListener('click', () => {
            alert('Weitere Auswahlfunktionen werden noch programmiert!');
        });
    });
