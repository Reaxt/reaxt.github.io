let z = 9;
let writeCursor = false;

function cursorFunc() {
    setTimeout(()=> {
        writeCursor = !writeCursor;
        WriteConsoleText();
        cursorFunc();
    }, 500)
}
window.addEventListener('DOMContentLoaded', (event) => {
    cursorFunc();
    console.log('DOM fully loaded and parsed');
    let draggers = document.querySelectorAll(".window");
    draggers.forEach(element => {
        let head = element.querySelector(".windowHeader");
        head.querySelector("button").onclick = (e) => {
            element.classList.remove("visible");
            element.classList.add("hidden");
            elementClicked(e);
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
            elementClicked(e);
        }
    })

});
let consoleText = [""];
let writing = false;
function AddConsoleText(message) {
    let msgSplit = message.split('');
    writing = true;
    consoleStep(msgSplit, 0, consoleText.length-1);
}
function consoleStep(message, i, arrayIndex) {
    if(i < message.length) {
        WriteConsoleText();
        consoleText[arrayIndex] = consoleText[arrayIndex] + message[i];
        setTimeout(() => {
            consoleStep(message, i+1, arrayIndex);
            
        }, 10)
    } else {
        consoleText.push("");
        WriteConsoleText();
        writing = false;
        if(consoleText.length>10) {
            consoleText.shift()
        }

    }

}
function WriteConsoleText(){
    let elm = document.querySelector("#consoleText");
    let text = "";
    for (let i = 0; i < consoleText.length-1; i++) {
        text = text += "Reaxt: ~/ "
        text += consoleText[i];
        text += "<br>"
    }
    text = text += "Reaxt: ~/ ";
    text += consoleText[consoleText.length-1];
    if(writeCursor || writing) {
        console.log(writeCursor);
        text += "█"
    }
    elm.innerHTML = text;
}
function elementClicked(elm) {
    
    if(elm.target.dataset.consoletext) {
        AddConsoleText(elm.target.dataset.consoletext);
    }
}
window.onDomContentLoaded = (e) => {


}