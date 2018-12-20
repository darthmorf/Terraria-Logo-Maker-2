var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 0;
canvas.height = 95;

var imageDir = "./assets/chars";
var theme;

var treeImage;
var startImage;
var endImage;
var errImage;

function initTheme (newTheme){
    theme = newTheme;
    treeImage = new Image();
    treeImage.src = `${imageDir}/${theme}/tree.png`;
    startImage = new Image();
    startImage.src = `${imageDir}/${theme}/start.png`;
    endImage = new Image();
    endImage.src = `${imageDir}/${theme}/end.png`;
}

function displayImage (images) {
    images = [treeImage, startImage].concat(images, [endImage])

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