document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("siteNavbar");

    if (!navbar) {
        return;
    }

    function handleScroll() {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

});