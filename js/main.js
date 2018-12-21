var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 0;
canvas.height = 95;

var logoTextInput = document.getElementById('logoTextInput');
var themeSelector = document.getElementById('themeSelect');
var treeCheckbox = document.getElementById('treeCheckbox');
var downloadButton = document.getElementById('downloadBtn');

var imageDir = "./assets/chars";
var theme;

var treeImg;
var startImg;
var endImg;
var errImg;


function initTheme (newTheme){
    theme = newTheme;
    treeImg = new Image();
    treeImg.src = `${imageDir}/${theme}/tree.png`;
    startImg = new Image();
    startImg.src = `${imageDir}/${theme}/start.png`;
    endImg = new Image();
    endImg.src = `${imageDir}/${theme}/end.png`;
}

function displayImage (images) {
    if (treeCheckbox.checked){
        images = [treeImg, startImg].concat(images, [endImg]);
    }
    else {
        images = [startImg].concat(images, [endImg])
    }    

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    var imageWidth = 0; 
    for (var i = 0; i < images.length; i++){
        imageWidth += images[i].width;
    }
    canvas.width = imageWidth;

    var x = 0;
    var y = 0;
    for (var i = 0; i < images.length; i++){
        ctx.drawImage(images[i], x, y);
        x += images[i].width;
    }
}

function stringToImage (text, charImages=[]) {
    if (text.length == 0) {
        displayImage(charImages);
        return;
    }
    var asciiVal = text[0].charCodeAt(0);    
    var imagePath = `${imageDir}/${theme}/${asciiVal}.png`;
    var img = new Image();
    img.onload = function () {
        charImages.push(img);
        stringToImage(text.slice(1, text.length), charImages);
    }    
    img.src = imagePath;
}

logoTextInput.onkeyup = function () {
    stringToImage(logoTextInput.value);
}

themeSelector.onchange = function () {
    initTheme(themeSelector.value);
    stringToImage(logoTextInput.value);
}

treeCheckbox.onchange = function () {
    stringToImage(logoTextInput.value);
}

downloadButton.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
});