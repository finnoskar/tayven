function makeHoverLink() {
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener("DOMContentLoaded", () => {
            // define the hoverableElements (elements that need the thing activate), body element, and the hover cursor div (the thing that moves)
            const hoverableElements = Array.from(document.querySelectorAll("section.hover-link a:has(img)"));
            if (hoverableElements) {
                const body = document.getElementsByTagName("body")[0];
                const hoverCursor = document.createElement("div");

                // set attributes of the cursor for the link
                hoverCursor.textContent = "click to follow this link";
                hoverCursor.id = "hoverCursor";
                hoverCursor.style.display = "none";
                hoverCursor.style.position = "fixed";
                hoverCursor.style.color = "var(--blue)";
                hoverCursor.style.pointerEvents = "none";
                hoverCursor.style.fontWeight = "600";
                hoverCursor.style.padding = "0.4em 0.4em 0.5em 0.4em";
                hoverCursor.style.borderRadius = "1.5em";
                hoverCursor.style.backgroundColor = "white"
                hoverCursor.style.textWrap = "nowrap";


                // add the link cursor to the body
                body.appendChild(hoverCursor);

                // for every element that uses the link cursor
                for (let hoverableElement of hoverableElements) {
                    // listen for mouse entering
                    hoverableElement.addEventListener("mouseover", () => {
                        let localHref = hoverableElement.getAttribute("href")
                        // get link cursor element
                        hoverCursor.textContent = "click to follow link to " + localHref.slice(1);
                        // hide cursor and show link cursor
                        hoverableElement.style.cursor = "none";
                        hoverCursor.style.display = "inline-block";

                    })
                    // listen to mouse leaving
                    hoverableElement.addEventListener("mouseleave", () => {
                        // get link cursor element
                        // make cursor visible and hide the link cursor
                        hoverableElement.style.cursor = "auto";
                        hoverCursor.style.display = "none";
                    })
                }
                // listen for mouse movement
                document.addEventListener("mousemove", (event) => {
                    // get the link cursor element
                    // get the mouse location
                    let mouseX = event.clientX;
                    let mouseY = event.clientY;
                    console.log(mouseX);
                    console.log(mouseY);
                    // set the link curser location
                    hoverCursor.style.left = mouseX + 'px';
                    hoverCursor.style.top = mouseY + 'px';
                })
            }
        })
    }
}
makeHoverLink();