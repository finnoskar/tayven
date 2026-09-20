window.addEventListener("load", () => {
    const images = document.querySelectorAll('img.wide-image');
    console.log("hello")
    if (images.length > 0) {
        const parallaxImages = new simpleParallax(images, {
            orientation: "up",
            scale: 1.4,
            delay: 0.6,
            overflow: false
        });
        console.log(`${images.length} images with parallax`);
    } else {
        console.warn("SimpleParallax can't find images.");
    }
});