var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 0;
canvas.height = 95;

var logoTextInput = document.getElementById('logoTextInput');
var themeSelector = document.getElementById('themeSelect');
var treeCheckbox = document.getElementById('treeCheckbox');
var downloadButton = document.getElementById('downloadBtn');
var infoDiv = document.getElementById('infoDiv');

var imageDir = "./assets/chars";
var theme;

var visitCount = localStorage.getItem('pageLoadCounter');

var treeImg;
var startImg;
var endImg;
var errImg;


function init () {    
    if (visitCount === null) {
        visitCount = 0;
    }
    visitCount++;      
    localStorage.setItem("pageLoadCounter", visitCount);

    console.log("You are visitor number: " + visitCount);

    loadTheme('overworld-extended');
    stringToImage(logoTextInput.value);
}

function loadTheme (newTheme){
    theme = newTheme;
    treeImg = new Image();
    treeImg.src = `${imageDir}/${theme}/tree.png`;

    startImg = new Image();
    startImg.src = `${imageDir}/${theme}/start.png`;

    endImg = new Image();
    endImg.src = `${imageDir}/${theme}/end.png`;

    document.getElementById(`info-overworld-extended`).style="display:none";
    document.getElementById(`info-desert`).style="display:none";
    document.getElementById(`info-jungle`).style="display:none";
    document.getElementById(`info-mushroom`).style="display:none";
    document.getElementById(`info-ocean`).style="display:none";
    document.getElementById(`info-snow`).style="display:none";
    document.getElementById(`info-underworld-extended`).style="display:none";

    document.getElementById(`info-${theme}`).style="display:auto";
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
    for (var i = 0; i < images.length; i++) {
        imageWidth += images[i].width;
    }
    canvas.width = imageWidth;

    var x = 0;
    var y = 0;
    for (var i = 0; i < images.length; i++) {
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
    img.onerror = function () {
        img.onload = null;
        stringToImage(text.slice(1, text.length), charImages);
    }
    img.onload = function () {
        charImages.push(img);
        stringToImage(text.slice(1, text.length), charImages);
    }   
    img.src = imagePath;
}

function handleInput (textInput) {
    var textToPass = textInput;
    if (textToPass == "") {
        textToPass = "Terraria";
    }
    stringToImage(textToPass);
}

logoTextInput.onkeyup = function () {
    handleInput(logoTextInput.value);
}

themeSelector.onchange = function () {
    loadTheme(themeSelector.value);    
    handleInput(logoTextInput.value);
}

treeCheckbox.onchange = function () {        
    handleInput(logoTextInput.value);
}

downloadButton.addEventListener('click', function () {
    var dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
});