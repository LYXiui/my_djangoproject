var count = 0;

function addfunction() {
    var btn = document.createElement("button");
    btn.innerHTML = "click me";
    btn.id = count;

    btn.onclick = delfunction;

    var container = document.getElementById("container");
    container.appendChild(btn);

    count++;
}

function delfunction() {
    var container = document.getElementById("container");

    if (event.target.innerHTML == "del it") {
        if (container.lastChild != null) {
            container.removeChild(container.lastChild);
        }
    } else {
        var target = event.target;
        target.parentNode.removeChild(target);
    }
}