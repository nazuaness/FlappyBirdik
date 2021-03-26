var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBottom.src = "images/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// Это столько пикселей гэпы чтобы птица смогла пролететь
var gap = 100;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

// Чтобы при нажатии птица вверх взлетала
function moveUp() {
 yPos -= 25;
 fly.play();
}

// Это для блоков
var pipe = [];
pipe[0] = {
  // Всегда за экраноом начинается
 x : cvs.width,
 y : 0
}

var score = 0;

// Птичка по этим координатам
var xPos = 10;
var yPos = 150;
// Чтобы всегда падала птичка
var grav = 1.2;

function draw() {
  // Можно менять не только позиции
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

// Чтобы были разные отверстия (гэпы в разных местах)
 if(pipe[i].x == 125) { // На столько единиц с х оси будет начинаться столбцы,расстояние между птицей и столбцом
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Прикосновение к столбцу
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // При прикосновении к столбцу чтобы была перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }
// Это чтобы передний фон был внизу а не сверху
 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Papyrus, fantasy";
 ctx.fillText("Svore: " + score, 10, cvs.height - 20);
// Чтобы проверять повторение
 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
