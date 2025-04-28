document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar-menu");

    sidebar.addEventListener("mouseenter", () => {
        console.log("Mouse entered sidebar");
        sidebar.classList.add("expanded");
    });

    sidebar.addEventListener("mouseleave", () => {
        console.log("Mouse left sidebar");
        sidebar.classList.remove("expanded");
    });
});