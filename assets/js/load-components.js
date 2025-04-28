// filepath: c:\Users\Peder\Documents\Personal Projects\RecipeSite\assets\js\load-components.js
document.addEventListener("DOMContentLoaded", () => {
    // Function to load a component
    const loadComponent = async (selector, file, callback) => {
        const element = document.querySelector(selector);
        if (element) {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                element.outerHTML = content;
                if (callback) callback();
            } else {
                console.error(`Failed to load ${file}: ${response.statusText}`);
            }
        }
    };

    // Load header, footer, and sidebar
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");
    loadComponent(".sidebar", "components/sidebar.html", () => {
        const sidebar = document.querySelector(".sidebar-menu");

        sidebar.addEventListener("mouseenter", () => {
            // console.log("Mouse entered sidebar");
            sidebar.classList.add("expanded");
        });

        sidebar.addEventListener("mouseleave", () => {
            // console.log("Mouse left sidebar");
            sidebar.classList.remove("expanded");
        });
    });
});