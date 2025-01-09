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
        let lastScroll = 0;

        const calculateMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;
        const calculateSlideWidth = () => slider.querySelector('.slider-item').offsetWidth;  // Breite eines Slides

        const initializeProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const initialProgressValue = 10; // Fortschrittsbalken startet bei 10%
            progressBar.style.width = `${initialProgressValue}%`; // Sichtbarer Startwert
        };

        const updateProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const scrollPosition = slider.scrollLeft;
            const progressValue = ((scrollPosition + 0.1 * maxScrollLeft) / maxScrollLeft) * 100; // Startwert von 10%
            progressBar.style.width = `${progressValue}%`;

            const slideWidth = calculateSlideWidth();
            
            // Ab dem 2. Slide Button anzeigen
            if (scrollPosition >= slideWidth * 1) {  // Ab dem 2. Slide Button anzeigen
                buttonContainer.classList.add("visible");
            } else {
                buttonContainer.classList.remove("visible");
            }
        };

        const startDragging = (e) => {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        };

        const dragSlider = (e) => {
            if (!isDragging) return;
            const x = e.pageX || e.touches[0].pageX;
            const distance = x - startX;
            slider.scrollLeft = scrollLeft - distance;
            updateProgressBar();
        };

        const stopDragging = () => {
            isDragging = false;
            slider.style.cursor = "grab";
        };

        // Animation mit requestAnimationFrame für flüssigeres Scrollen
        const smoothScroll = () => {
            const scrollPosition = slider.scrollLeft;
            if (Math.abs(scrollPosition - lastScroll) > 0.5) {
                lastScroll = scrollPosition;
                updateProgressBar();
                requestAnimationFrame(smoothScroll);  // Animation aufrufen
            }
        };

        slider.addEventListener("scroll", smoothScroll); // Anstelle von 'updateProgressBar()' verwenden

        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mousemove", dragSlider);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mouseleave", stopDragging);

        slider.addEventListener("touchstart", startDragging);
        slider.addEventListener("touchmove", dragSlider);
        slider.addEventListener("touchend", stopDragging);

        window.addEventListener("resize", () => {
            updateProgressBar();
        });

        initializeProgressBar();
        updateProgressBar();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const sideMenu = document.querySelector(".side-menu");

    // Toggle-Funktion für das Side-Menü
    burgerMenu.addEventListener("click", () => {
        sideMenu.classList.toggle("visible"); // Klasse 'visible' umschalten
    });

    // Optional: Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
            sideMenu.classList.remove("visible");
        }
    });
});

document.querySelectorAll('.menu-plus').forEach((plus) => {
    plus.addEventListener('click', () => {
        // Hier kannst du Untermenüs öffnen oder Aktionen definieren
        alert('Weitere Auswahlfunktionen werden noch programmiert!');
    });
});
