document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();

    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = year;
    });

    const filterButtons = document.querySelectorAll("[data-filter]");
    const filterCards = document.querySelectorAll("[data-category]");
    const status = document.querySelector("[data-filter-status]");

    if (!filterButtons.length || !filterCards.length || !status) {
        return;
    }

    const updateFilter = (filterValue) => {
        let visibleCount = 0;

        filterCards.forEach((card) => {
            const category = card.getAttribute("data-category");
            const matches = filterValue === "all" || category === filterValue;

            card.classList.toggle("is-hidden", !matches);

            if (matches) {
                visibleCount += 1;
            }
        });

        filterButtons.forEach((button) => {
            const isActive = button.getAttribute("data-filter") === filterValue;
            button.setAttribute("aria-pressed", String(isActive));
        });

        const label = filterValue === "all" ? "all categories" : filterValue;
        status.textContent = `Showing ${visibleCount} resource${visibleCount === 1 ? "" : "s"} for ${label}.`;
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateFilter(button.getAttribute("data-filter"));
        });
    });

    updateFilter("all");
});
