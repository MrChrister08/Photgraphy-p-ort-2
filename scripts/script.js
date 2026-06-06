document.addEventListener("DOMContentLoaded", () => {
    // initialize page features
    initGalleryFilter();
    initPageTransitions();
});

/**
 * Handle grid-item sorting on the portfolio template canvas
 */
function initGalleryFilter() {
    const filterTabs = document.querySelectorAll(".filter-tab");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!filterTabs.length || !galleryItems.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Toggle active visual states
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedCategory = tab.textContent.trim().toLowerCase();

            // Filter calculation matrix
            galleryItems.forEach(item => {
                const labelNode = item.querySelector(".item-label");
                const itemCategory = labelNode ? labelNode.textContent.trim().toLowerCase() : "";

                // Apply transition mechanics 
                item.style.transition = "opacity 0.25s ease, transform 0.25s ease";

                if (selectedCategory === "all" || itemCategory === selectedCategory) {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                    item.style.pointerEvents = "auto";
                } else {
                    item.style.opacity = "0.15";
                    item.style.transform = "scale(0.98)";
                    item.style.pointerEvents = "none";
                }
            });
        });
    });
}

/**
 * Handle custom cinematic canvas page transition states
 */
function initPageTransitions() {
    const screenElement = document.querySelector(".frame-screen");
    const navLinks = document.querySelectorAll(".nav-links a, .footer-nav a");

    if (!screenElement) return;

    // Set initial entrance state
    screenElement.style.opacity = "0";
    screenElement.style.transform = "translateY(8px)";
    screenElement.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    // Trigger frame mounting display sequence
    requestAnimationFrame(() => {
        screenElement.style.opacity = "1";
        screenElement.style.transform = "translateY(0)";
    });

    // Intercept navigation requests to animate standard links cleanly
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const destinationUrl = link.getAttribute("href");

            // Ignore blank anchors or external target hooks
            if (!destinationUrl || destinationUrl === "#" || link.getAttribute("target") === "_blank") {
                return;
            }

            e.preventDefault();

            // Run out-transition logic before loading next index page pointer
            screenElement.style.opacity = "0";
            screenElement.style.transform = "translateY(-4px)";

            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 350);
        });
    });
}
