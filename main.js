document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider");
    const progressBars = document.querySelectorAll(".progress-bar");
    const buttonContainers = document.querySelectorAll(".category-button-container");

    sliders.forEach((slider, index) => {
        const progressBar = progressBars[index];
        const buttonContainer = buttonContainers[index];

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        let swipeThreshold = 50; // Mindest-Swipe-Distanz, um zu scrollen

        const calculateMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;
        const calculateSlideWidth = () => slider.querySelector('.slider-item').offsetWidth;

        // Fortschrittsbalken aktualisieren
        const updateProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const scrollPosition = slider.scrollLeft;
            const progressValue = (scrollPosition / maxScrollLeft) * 100;
            progressBar.style.width = `${progressValue}%`; // Hier die Korrektur

            const slideWidth = calculateSlideWidth();

            // Button sichtbar ab dem 2. Slide
            if (scrollPosition >= slideWidth) {
                buttonContainer.classList.add("visible");
            } else {
                buttonContainer.classList.remove("visible");
            }
        };

        // Automatisches Snap-to-Item
        const snapToClosestSlide = () => {
            const slideWidth = calculateSlideWidth();
            const scrollPosition = slider.scrollLeft;
            const closestSlide = Math.round(scrollPosition / slideWidth);
            slider.scrollTo({
                left: closestSlide * slideWidth,
                behavior: "smooth",
            });
        };

        // Drag-Start-Ereignis
        const startDragging = (e) => {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        };

        // Dragging während der Bewegung
        const dragSlider = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Verhindert das Standardverhalten
            const x = e.pageX || e.touches[0].pageX;
            const distance = x - startX;

            // Nur scrollen, wenn die Swipe-Distanz über dem Schwellenwert liegt
            if (Math.abs(distance) > swipeThreshold) {
                slider.scrollLeft = scrollLeft - distance;
                requestAnimationFrame(updateProgressBar);
            }
        };

        // Dragging stoppen
        const stopDragging = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = "grab";

            // Snap-to-Item aufrufen
            snapToClosestSlide();
        };

        // Event-Listener für Scroll und Dragging
        slider.addEventListener("scroll", () => {
            requestAnimationFrame(updateProgressBar);
        });
        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mousemove", dragSlider);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("touchstart", startDragging);
        slider.addEventListener("touchmove", dragSlider);
        slider.addEventListener("touchend", stopDragging);

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
