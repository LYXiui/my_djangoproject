var container;

window.onload = function() {
    container = document.getElementById("container");

    generateRandomString(0, 2);
};

document.onkeyup = function(e) {
    var text = container.innerText;

    if (text.length > 0) {
        if (e.key == text.charAt(0)) {
            container.innerText = text.substring(1);
        }
    }

    generateRandomString(1, 3);
};

function generateRandomString(min, max) {
    var len = Math.floor(Math.random() * (max - min + 1)) + min;
    var str = "";
    var i;

    for (i = 0; i < len; i++) {
        var ch = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        str = str + ch;
    }

    container.innerText = container.innerText + str;
}