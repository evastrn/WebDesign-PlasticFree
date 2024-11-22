document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const progressBar = document.querySelector(".progress-bar");
    const sliderItems = document.querySelectorAll(".slider-item");
    const arrowRight = document.querySelector(".arrow-right");
    let currentIndex = 0;
    let isDragging = false; // Für Desktop
    let startX = 0;
    let currentTranslate = 0;

    const updateSlider = () => {
        const translateValue = -currentIndex * 100; // Verschiebt den Slider
        slider.style.transform = `translateX(${translateValue}%)`;
        const progressValue = ((currentIndex + 1) / sliderItems.length) * 100; // Fortschrittsbalken
        progressBar.style.width = `${progressValue}%`;

        // Pfeil anzeigen/verstecken
        if (currentIndex === sliderItems.length - 1) {
            arrowRight.classList.remove("hidden");
        } else {
            arrowRight.classList.add("hidden");
        }
    };

    // Touch-Events (Mobile)
    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        isDragging = true;
    });

    slider.addEventListener("touchmove", (event) => {
        if (!isDragging) return;
        const deltaX = event.touches[0].clientX - startX;

        if (deltaX < -50 && currentIndex < sliderItems.length - 1) {
            currentIndex++;
            updateSlider();
            isDragging = false;
        } else if (deltaX > 50 && currentIndex > 0) {
            currentIndex--;
            updateSlider();
            isDragging = false;
        }
    });

    slider.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Maus-Events (Desktop)
    slider.addEventListener("mousedown", (event) => {
        startX = event.clientX;
        isDragging = true;
    });

    slider.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        const deltaX = event.clientX - startX;

        if (deltaX < -50 && currentIndex < sliderItems.length - 1) {
            currentIndex++;
            updateSlider();
            isDragging = false;
        } else if (deltaX > 50 && currentIndex > 0) {
            currentIndex--;
            updateSlider();
            isDragging = false;
        }
    });

    slider.addEventListener("mouseup", () => {
        isDragging = false;
    });

    slider.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // Pfeil-Klick
    arrowRight.addEventListener("click", () => {
        alert("Mehr Tipps folgen!");
    });

    // Initialer Slider-Update
    updateSlider();
});
