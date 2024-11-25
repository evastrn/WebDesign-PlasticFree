document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const progressBar = document.querySelector(".progress-bar");
    const sliderItems = document.querySelectorAll(".slider-item");
    const arrowContainer = document.querySelector(".arrow-container");

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    const maxIndex = 6; // Slider endet nach dem 7. Bild (Index beginnt bei 0)

    // Aktualisiert den Slider und den Fortschrittsbalken
    const updateSlider = () => {
        const translateValue = -currentIndex * sliderItems[0].offsetWidth; // Pixelbasierte Verschiebung
        slider.style.transform = `translateX(${translateValue}px)`;
        const progressValue = ((currentIndex + 1) / (maxIndex + 1)) * 100; // Fortschrittsbalken aktualisieren
        progressBar.style.width = `${progressValue}%`;

        // Pfeil anzeigen/verstecken
        if (currentIndex === maxIndex) {
            arrowContainer.classList.add("visible"); // Pfeil anzeigen
        } else {
            arrowContainer.classList.remove("visible"); // Pfeil verstecken
        }
    };

    // Verschiebt den Slider während des Dragging
    const setSliderPosition = () => {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    };

    // Beendet das Dragging
    const handleDragEnd = () => {
        cancelAnimationFrame(animationID);
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        // Logik für das Verschieben
        if (movedBy < -50 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (movedBy > 50 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider(); // Position aktualisieren
    };

    const animation = () => {
        if (isDragging) {
            requestAnimationFrame(animation);
            setSliderPosition();
        }
    };

    const startDragging = (position) => {
        isDragging = true;
        startX = position;
        prevTranslate = -currentIndex * sliderItems[0].offsetWidth; // Nutzt die Breite eines Slider-Items
        currentTranslate = prevTranslate;
        animationID = requestAnimationFrame(animation);
    };

    // Handhabung von Maus-Events
    slider.addEventListener("mousedown", (event) => {
        slider.style.cursor = "grabbing";
        startDragging(event.clientX);
    });

    slider.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const deltaX = event.clientX - startX;
            currentTranslate = prevTranslate + deltaX;
        }
    });

    slider.addEventListener("mouseup", () => {
        slider.style.cursor = "grab";
        handleDragEnd();
    });

    slider.addEventListener("mouseleave", () => {
        if (isDragging) handleDragEnd();
    });

    // Handhabung von Touch-Events
    slider.addEventListener("touchstart", (event) => {
        startDragging(event.touches[0].clientX);
    });

    slider.addEventListener("touchmove", (event) => {
        if (isDragging) {
            const deltaX = event.touches[0].clientX - startX;
            currentTranslate = prevTranslate + deltaX;
        }
    });

    slider.addEventListener("touchend", () => {
        handleDragEnd();
    });

    // Initialisierung
    updateSlider();
});


