document.querySelectorAll("body[data-layout='sidebar'] aside ul li").forEach(function (listItem) {
    listItem.lastElementChild.addEventListener("click", function (event) {
        event.preventDefault();
        let targetId = listItem.lastElementChild.getAttribute("for");
        document.getElementById(targetId).checked = true;
        location.href = location.href.split("#")[0] + "#" + targetId;
    });
});

const element = document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
    const height = element.offsetHeight;
    element.style.scrollMarginTop = height * 2 + 'px';
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(0,0,150,75);