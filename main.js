document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider");
    const progressBars = document.querySelectorAll(".progress-bar");
    const buttonContainers = document.querySelectorAll(".button-container");

    sliders.forEach((slider, index) => {
        const progressBar = progressBars[index];
        const buttonContainer = buttonContainers[index];

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const calculateMaxScrollLeft = () => slider.scrollWidth - slider.clientWidth;

        const initializeProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const initialProgressValue = 10; // Fortschrittsbalken startet bei 10%
            const initialWidth = (initialProgressValue / 100) * maxScrollLeft;
            progressBar.style.width = `${initialProgressValue}%`; // Sichtbarer Startwert
        };

        const updateProgressBar = () => {
            const maxScrollLeft = calculateMaxScrollLeft();
            const scrollPosition = slider.scrollLeft;
            const progressValue = ((scrollPosition + 0.1 * maxScrollLeft) / maxScrollLeft) * 100; // Startwert von 10%
            progressBar.style.width = `${progressValue}%`;

            if (Math.ceil(scrollPosition) >= maxScrollLeft - 5) {
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

        slider.addEventListener("scroll", updateProgressBar);

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
        alert('Funktion für das Untermenü folgen!');
    });
});