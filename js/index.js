const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  

class Ball{
    constructor()
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;

        this.yVel = getRandomArbitrary(-4,4);
        this.xVel = Math.sqrt(Math.pow(5,2)-Math.pow(this.yVel, 2))

        this.radius = 10;

        this.color = "white";
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update()
    {
        this.x += this.xVel;
        this.y += this.yVel;

        if (this.y + this.radius > canvas.height || 0 > this.y - this.radius)
        {
            this.yVel *= -1;
        }
    }

    changeDir()
    {
        this.xVel *= -1;
    }

    x(){return this.x;}
    y(){return this.y;}
    radius(){return this.radius;}

}

class Paddel{
    constructor(xPos)
    {
        this.x = xPos;
        this.y = canvas.height/2;

        this.vel = 10;

        this.width = 10;
        this.height = 100;

        this.color = "white";

        // -1 for moving upwards, 1 for moving downwards. 0 for still
        this.moving = 0;
    }

    moveUp()
    {
        if (this.y < 0)
        {
            this.y = 0;
        }
        else
        {
            this.y -= this.vel;
        }
    }

    moveDown()
    {
        if (this.y + this.height > canvas.height)
        {
            this.y = canvas.height - this.height;
        }
        else
        {
            this.y += this.vel;
        }
    }

    update()
    {   
        if (this.moving == -1)
        {
            this.moveUp();
        }

        else if(this.moving == 1)
        {
            this.moveDown();
        }
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x ,this.y , this.width, this.height);
    }

    setMoveStatus(status)
    {
        this.moving = status;
    }

    x(){return this.x;}
    y(){return this.y;}
    height(){return this.height;}
    width(){return this.width;}
}


function drawGame(){
    requestAnimationFrame(drawGame);
    clearScreen();
    ball.update();
    ball.draw();
    paddel1.update();
    paddel2.update();
    checkCollision();
    paddel1.draw();
    paddel2.draw();
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    if (event.keyCode == 81) {
        paddel1.setMoveStatus(-1);
    }
    else if (event.keyCode == 65) {
        paddel1.setMoveStatus(1);
    }
    else if (event.keyCode == 79) {
        paddel2.setMoveStatus(-1);
    }
    else if (event.keyCode == 76) {
        paddel2.setMoveStatus(1);
    }
}

function keyUp(event) {
    if (event.keyCode == 81) {
        paddel1.setMoveStatus(0);
    }
    else if (event.keyCode == 65) {
        paddel1.setMoveStatus(0);
    }
    else if (event.keyCode == 79) {
        paddel2.setMoveStatus(0);
    }
    else if (event.keyCode == 76) {
        paddel2.setMoveStatus(0);
    }
}

function checkCollision() {
    distx1 = Math.abs(ball.x - paddel1.x - paddel1.width/2);
    disty1 = Math.abs(ball.y - paddel1.y - paddel1.height/2);

    distx2 = Math.abs(ball.x - paddel2.x - paddel2.width/2);
    disty2 = Math.abs(ball.y - paddel2.y - paddel2.height/2);

    if (distx1 <= (paddel1.width/2)) { ball.changeDir() } 
    else if (disty1 <= (paddel1.height/2)) { ball.changeDir() }
    else if (distx2 <= (paddel2.width/2)) { ball.changeDir() } 
    else if (disty2 <= (paddel2.height/2)) { ball.changeDir() }
}


const paddel1 = new Paddel(40);
const paddel2 = new Paddel(canvas.width-40);
const ball = new Ball();
drawGame();
//setInterval(drawGame, 1000/60);