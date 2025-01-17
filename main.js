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
        const swipeThreshold = 50; // Mindest-Swipe-Distanz

        // Berechnungsfunktionen
        const getMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;
        const getSlideWidth = () => slider.querySelector(".slider-item").offsetWidth;

        // Fortschrittsbalken aktualisieren
        const updateProgressBar = () => {
            const maxScroll = getMaxScrollLeft();
            const scrollPos = slider.scrollLeft;
            const progress = (scrollPos / maxScroll) * 100;
            progressBar.style.width = `${progress}%`;

            // Button sichtbar ab dem 2. Slide
            buttonContainer.classList.toggle("visible", scrollPos >= getSlideWidth());
        };

        // Snap-to-Item-Funktion
        const snapToClosestSlide = () => {
            const slideWidth = getSlideWidth();
            const closestSlide = Math.round(slider.scrollLeft / slideWidth);
            slider.scrollTo({
                left: closestSlide * slideWidth,
                behavior: "smooth",
            });
        };

        // Dragging starten
        const startDrag = (e) => {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        };

        // Dragging während der Bewegung
        const drag = (e) => {
            if (!isDragging) return;
            const currentX = e.pageX || e.touches[0].pageX;
            const distance = currentX - startX;

            // Nur scrollen, wenn Schwellenwert überschritten wird
            if (Math.abs(distance) > swipeThreshold) {
                slider.scrollLeft = scrollLeft - distance;
                requestAnimationFrame(updateProgressBar);
            }
        };

        // Dragging stoppen
        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = "grab";
            snapToClosestSlide(); // Snap-to-Item
        };

        // Event-Listener für Scroll- und Drag-Ereignisse
        slider.addEventListener("scroll", () => requestAnimationFrame(updateProgressBar));
        slider.addEventListener("mousedown", startDrag);
        slider.addEventListener("mousemove", drag);
        slider.addEventListener("mouseup", stopDrag);
        slider.addEventListener("mouseleave", stopDrag);
        slider.addEventListener("touchstart", startDrag);
        slider.addEventListener("touchmove", drag);
        slider.addEventListener("touchend", stopDrag);

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


