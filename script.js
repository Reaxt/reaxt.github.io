window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let draggers = document.querySelectorAll(".window");
    draggers.forEach(element => {
        let head = element.getElementsByClassName("windowHeader")[0];
        let startPos = { x: 0, y: 0 };
        let curPos = { x: 0, y: 0 };
        head.onmousedown = (e) => {
            e = e || window.event;
            e.preventDefault();
            startPos.x = e.clientX;
            startPos.y = e.clientY;
            head.onmousemove = (e) => {
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
                head.onmousemove = null;
                head.onmouseup = null;
            }
        }
    });
});
window.onDomContentLoaded = (e) => {


}