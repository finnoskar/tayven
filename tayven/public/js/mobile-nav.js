const toggleNav = () => {
    const NAV_LIST = document.querySelector("nav ul");
    NAV_LIST.classList.toggle("active")
    document.getElementsByTagName("header")[0]?.classList?.toggle("is-hidden");
    document.getElementsByTagName("main")[0]?.classList?.toggle("is-hidden");
    document.getElementsByTagName("footer")[0]?.classList?.toggle("is-hidden");
}
document.addEventListener("DOMContentLoaded", () => {
    const OPEN_MOBILE = document.querySelector("nav button.mobile-open");
    OPEN_MOBILE.addEventListener("click", toggleNav);
});
