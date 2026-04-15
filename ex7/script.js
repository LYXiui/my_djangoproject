var container;
var counter = 0;

window.onload = function() {
    container = document.getElementById("container");

    container.textContent = add_new_chars(2, true);
};

function add_new_chars(x, b) {
    var n = x;

    if (b) {
        n = Math.floor(Math.random() * (x + 1)); // 0~x
    }

    var str = "";
    var i;

    for (i = 0; i < n; i++) {
        var ch = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        str = str + ch;
    }

    return str;
}

document.addEventListener("keyup", function(e) {
    var text = container.textContent;
    var firstone = text.substring(0, 1);

    if (text.length > 0 && e.key == firstone) {
        container.textContent = text.substring(1, text.length);
        counter = 0;
    } else {
        container.textContent = text + e.key;

        counter++;

        if (counter >= 3) {
            container.textContent = container.textContent + add_new_chars(3, false);
            counter = 0;
        }
    }

    container.textContent = container.textContent + add_new_chars(2, true);

}, false);