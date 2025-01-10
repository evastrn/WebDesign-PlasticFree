document.addEventListener("DOMContentLoaded", () => {
    // Slider-Funktionalität
    const sliders = document.querySelectorAll(".slider");
    const progressBars = document.querySelectorAll(".progress-bar");
    const buttonContainers = document.querySelectorAll(".category-button-container");

    sliders.forEach((slider, index) => {
        const progressBar = progressBars[index];
        const buttonContainer = buttonContainers[index];

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        let lastScroll = 0;

        const calculateMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;
        const calculateSlideWidth = () => slider.querySelector('.slider-item').offsetWidth;

        // Fortschrittsbalken initialisieren
        const initializeProgressBar = () => {
            const initialProgressValue = 10; // Fortschrittsbalken startet bei 10%
            progressBar.style.width = `${initialProgressValue}%`;
        };

        // Fortschrittsbalken aktualisieren
        const updateProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const scrollPosition = slider.scrollLeft;
            const initialProgressValue = 10; // Sichtbarer Startwert des Balkens
            const progressValue = ((scrollPosition / maxScrollLeft) * (100 - initialProgressValue)) + initialProgressValue;
            progressBar.style.width = `${progressValue}%`;

            const slideWidth = calculateSlideWidth();

            // Button sichtbar ab dem 2. Slide
            if (scrollPosition >= slideWidth) {
                buttonContainer.classList.add("visible");
            } else {
                buttonContainer.classList.remove("visible");
            }
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
            const x = e.pageX || e.touches[0].pageX;
            const distance = x - startX;
            slider.scrollLeft = scrollLeft - distance;
            updateProgressBar();
        };

        // Dragging stoppen
        const stopDragging = () => {
            isDragging = false;
            slider.style.cursor = "grab";
        };

        // Smooth Scroll für bessere Performance
        const smoothScroll = () => {
            const scrollPosition = slider.scrollLeft;
            if (Math.abs(scrollPosition - lastScroll) > 0.5) {
                lastScroll = scrollPosition;
                updateProgressBar();
                requestAnimationFrame(smoothScroll);
            }
        };

        // Event-Listener für Scroll und Dragging
        slider.addEventListener("scroll", smoothScroll);
        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mousemove", dragSlider);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("touchstart", startDragging);
        slider.addEventListener("touchmove", dragSlider);
        slider.addEventListener("touchend", stopDragging);

        // Progress-Bar bei Größenänderung aktualisieren
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        window.addEventListener("resize", debounce(updateProgressBar, 200));

        // Fortschrittsbalken initialisieren
        initializeProgressBar();
        updateProgressBar();
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
});

