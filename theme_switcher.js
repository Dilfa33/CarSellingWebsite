document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

    themeToggle.checked = currentTheme === "dark";

    themeToggle.addEventListener("change", function () {
        const newTheme = themeToggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
    });
});
