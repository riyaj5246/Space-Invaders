var ctx;
var aliens = [];
var ship;
var bullet;
var enemyBullets = [];
var randomNum;
var a;
var background;
var alienDir = 1;
var shotFired = false;
var shipBullets = [];
var gameOver = false;
var firstTime = true;
var userScore = 0;
var level = 10;
var levelNum = 1;
var prevLevel = 0;
var lives = 3;
var totalScores = [];
var createImage = function(src, title,xcoord,ycoord,width,height) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    img.left = xcoord;
    img.top = ycoord;
    img.width=width;
    img.height=height;
    return img;
};
function createAliens(){
    aliens.push(createImage("resources/badGuy2.png", "car1", 60, 100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 60, -100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 150,-100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 250,-100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 350,-100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 440,-100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 60,-50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 150,-50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 250,-50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 350,-50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 440,-50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 60,0, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 150,0, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 250,0, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 350,0, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 440,0, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 60, 50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 150,50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 250,50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 350,50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 440,50, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 60, 100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 150,100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 250,100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 350,100, 45, 30));
    aliens.push(createImage("resources/badGuy2.png", "car1", 440,100, 45, 30));
}

function initialize(){
    ctx = document.getElementById("myCanvas").getContext("2d");
    background = createImage("resources/background.jpg", "background", 0,0, 500, 500);
    ctx.drawImage(background, background.left, background.top, background.width, background.height);
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ship = createImage("resources/goodGuy.png", "goodGuy", 125,400,50,50);//don't forget to load the picture into the computers memory at the top
    ctx.drawImage(ship,ship.left,ship.top,ship.width,ship.height);
    bullet=createImage("resources/bulit.png","bullet",0,0,10,20);
    createAliens();
    drawBulletAlien();
    for (i = 0;i<aliens.length;i++){
        ctx.drawImage(aliens[i],aliens[i].left, aliens[i].top,40,25);
    }
    if(firstTime ==true){
        animate();
        firstTime = false;
    }
}

function animate() {
    a=requestAnimationFrame(animate);
    ctx.drawImage(background, 0, 0, 500, 500);
    drawAliens();
    drawShip();
    drawBullet();
    checkCollision();
    drawBulletAlien();
    checkCollision2();
    moveBulletAlien();
    levelUp();
    gameOver2();

}

$(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 37)
    {
        ship.left=ship.left-10;
        if(ship.left <= 0){
            ship.left = 0;
        }
    }
    if(keycode == 39)
    {
        ship.left=ship.left+10;
        if(ship.left >= 450){
            ship.left = 450;
        }
    }
    if(keycode==32){
            shipBullets.push(createImage("resources/bulit.png", "shipBullet", ship.left + 25, ship.top, 10, 20));
    }
    if(keycode==13){
        aliens = [];
        alienDir = 1;
        shotFired = false;
        gameOver = false;
        userScore = 0;
        level = 10;
        levelNum = 1;
        prevLevel = 0;
        lives = 3;
        initialize();
    }
});

function drawAliens() {
    for(i=0;i<aliens.length;i++){
        aliens[i].left = aliens[i].left + (1.25 * alienDir);
        ctx.drawImage(aliens[i],aliens[i].left, aliens[i].top,aliens[i].width,aliens[i].height);
        if (aliens[i].left >= 455  || aliens[i].left <= 5){
            for(j=0;j<aliens.length;j++){
                aliens[j].top += 15;
            }
            alienDir = alienDir * -1;
        }
        if(aliens[i].top >=450){
            gameOver = true;
        }
    }
}
function drawShip(){
    ctx.drawImage(ship,ship.left,ship.top,ship.width,ship.height);
}
function drawBulletAlien() {
    if (randNum(1,1000)< level) {
        randomNum = randNum(0, aliens.length - 1);
        enemyBullets.push(createImage("resources/bullet2.png", "bulletenemy", aliens[randomNum].left + 22, aliens[randomNum].top, 10, 20));
    }
}
function drawBullet(){
    for (i=0;i<shipBullets.length;i++) {
        ctx.drawImage(shipBullets[i], shipBullets[i].left, shipBullets[i].top, shipBullets[i].width, shipBullets[i].height);
        shipBullets[i].top = shipBullets[i].top - 10;
        if (shipBullets[i].top + shipBullets[i].height < 0) {
            shipBullets.splice(i,1);
        }
    }
}

function moveBulletAlien(){
    for (i=0;i<enemyBullets.length;i++){
        ctx.drawImage(enemyBullets[i], enemyBullets[i].left, enemyBullets[i].top, enemyBullets[i].width, enemyBullets[i].height);
        enemyBullets[i].top += 4;

        if (enemyBullets[i].top >= 500) {
            enemyBullets.splice(i,1);
            drawBulletAlien();

        }
    }
}
function checkCollision(){
    for(i=0;i<aliens.length;i++){
        for(j=0;j<shipBullets.length;j++) {
            if (shipBullets[j].left + 5 > aliens[i].left && shipBullets[j].left + 5 < aliens[i].left + 45 && shipBullets[j].top < aliens[i].top + aliens[i].height && shipBullets[j].top + shipBullets[j].height > aliens[i].top) {
                aliens.splice(i, 1);
                shipBullets.splice(j, 1);
                userScore += 10;
                document.getElementById("score").innerHTML = "Score: " + userScore;
            }
        }
    }
}
function checkCollision2() {
    for(i=0; i<enemyBullets.length; i++){
        if (enemyBullets[i].left + 10 > ship.left && enemyBullets[i].left < ship.left + 45
            && enemyBullets[i].top < ship.top && enemyBullets[i].top + 20 > ship.top) {
            lives = lives - 1;
            enemyBullets.splice(i, 1);
            if(lives == 0){
                gameOver = true;
            }
        }
    }
}

function gameOver2(){
    document.getElementById("lives").innerHTML = "Lives: "+ lives;
    if (gameOver == true){
            ship.top=-1000;
            ctx.font = "80px Comic Sans";
            ctx.fillStyle = "#ff8dbc";
            ctx.fillText("GAME OVER",10,100);
    }
    if (gameOver == true){
            ctx.font = "43px Comic Sans";
            ctx.fillStyle = "#7dffe4";
            ctx.fillText("Click Enter to Play Again",20,200);
    }
    if (gameOver == true){
        calculateBest();
        ctx.font = "40px Comic Sans";
        ctx.fillStyle = "#dba7ff";
        ctx.fillText("Score: " + userScore,200,270);
    }
    if(gameOver == true){
        totalScores.push(userScore);
        var best = calculateBest();
        ctx.font = "40px Comic Sans";
        ctx.fillStyle = "#dba7ff";
        ctx.fillText("Best Score: " + best ,150,350);
    }
}
function levelUp(){
    if(aliens.length == 0){
        level = level + 5;
        createAliens();
        prevLevel = levelNum;
        levelNum = levelNum +1;
        if(levelNum % 4 == 0){
            lives = lives + 1;
        }
    }
    document.getElementById("levelDisplay").innerHTML = "Level: " + levelNum;
}
function alertRules(){
    alert("Your objective is to kill as many aliens as possible. If you destroy all aliens on the screen, you move up a level." +
        "Press the left and right arrow keys to move the alien, the space button to shoot a bullet, and the enter button to reset."+
        "You have three lives, and you lose one every time you get shot. For every four levels though, you gain one more life. Oh, and if the aliens get too low,then you also die.");
}
function calculateBest(){
    var prevScore = userScore;
    for(i = 0; i<totalScores.length; i++){
        if(prevScore > totalScores[i]){
            prevScore = prevScore;
        }
        else{
            prevScore = totalScores[i];
        }
    }
    return(prevScore);
}

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


