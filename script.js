let z = 9;
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let draggers = document.querySelectorAll(".window");
    draggers.forEach(element => {
        let head = element.querySelector(".windowHeader");
        head.querySelector("button").onclick = (e) => {
            element.classList.remove("visible");
            element.classList.add("hidden");
        }
        head = head.querySelector(".headerText")
        console.log(head);
        let startPos = { x: 0, y: 0 };
        let curPos = { x: 0, y: 0 };
        head.onmousedown = (e) => {
            element.style.zIndex = z++;
            e = e || window.event;
            e.preventDefault();
            startPos.x = e.clientX;
            startPos.y = e.clientY;
            document.onmousemove = (e) => {
                e = e || window.event;
                e.preventDefault();
                curPos.x = startPos.x - e.clientX;
                curPos.y = startPos.y - e.clientY;
                startPos.x = e.clientX;
                startPos.y = e.clientY;
                element.style.top = (element.offsetTop - curPos.y) + "px";
                element.style.left = (element.offsetLeft - curPos.x) + "px";
            }
            head.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }

    });

    document.querySelectorAll(".openWindowButton").forEach(e => {
        e.onclick = (e) => {
            e.preventDefault();

            let window = document.querySelector(e.target.dataset.window);
            window.classList.remove("hidden");
            window.classList.add("visible");
            window.style.zIndex = z++;
        }
    })

});
window.onDomContentLoaded = (e) => {


}