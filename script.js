let game_board = document.getElementById('Snake-Board');
let score = document.getElementById('score');
let context = game_board.getContext('2d');
let body = document.body;
let SCORE = 0
let WIDTH = Number(game_board.width );
let HEIGHT = Number(game_board.height );
let FUNIT = 20;
let foodX ;
let foodY ;
let Xvel = 20;
let Yvel = 0;
let snake = [
    {x:FUNIT*3,y:0},
    {x:FUNIT*2,y:0},
    {x:FUNIT,y:0},
    {x:0,y:0}
]
let speed = 200;
let started = false
let running = true
let pause = false

window.addEventListener('keydown',keypress);

startGame()
function startGame(){
    clearBoard()
    createFood()
    displayFood()
    displaySnake()
}

function clearBoard(){
    context.fillStyle = "#000000"
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/FUNIT)*FUNIT
    foodY = Math.floor(Math.random()*WIDTH/FUNIT)*FUNIT
    game_board.style.animation = "gboard 1s linear 1 "
}

function displayFood(){
    game_board.style.animation = ""
    context.fillStyle = "red"
    context.fillRect(foodX,foodY,FUNIT,FUNIT)
}

function displaySnake(){
    context.fillStyle = "#fff200"
    context.strokeStyle = "#000000"
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,FUNIT,FUNIT)
        context.strokeRect(snakepart.x,snakepart.y,FUNIT,FUNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+Xvel,y:snake[0].y+Yvel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        createFood()
        SCORE+=1
        score.innerText = `Score : ${SCORE}`
        if(speed>75){
            speed -=5
        }
    }
    else
        snake.pop()
}

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard()
            displayFood()
            displaySnake()
            moveSnake()
            Gameover()
            // checkPause()
            if(!pause)
                nextTick()
        },speed)
        document.body.style.overflowY = "hidden";
    }
    else{
        clearBoard()
        context.font = "bold 50px serif"
        context.fillStyle = "white"
        context.textAlign = "center"
        context.fillText("GAME OVER!!",WIDTH/2,HEIGHT/2)
        body.style.animation = ""
        document.body.style.overflowY = "scroll";
    }
}

function keypress(event){
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const SPACE = 32
    if(!started){
        started = true
        body.style.animation = "bganimation 2s linear infinite"
        nextTick()
    }
    if(event.keyCode==SPACE){
        if(pause){
            pause=false
            nextTick()
        }
        else{
            pause=true;
            document.body.style.overflowY = "scroll";
        }
    }
    switch(true){
        case(event.keyCode==LEFT && Xvel!=FUNIT):
            if(pause){
                nextTick()
                pause=false
            }
            Xvel = -FUNIT
            Yvel = 0
            break;
        case(event.keyCode==RIGHT && Xvel!=-FUNIT):
            if(pause){
                nextTick()
                pause=false
            }
            Xvel = FUNIT
            Yvel = 0
            break;
        case(event.keyCode==UP && Yvel!=FUNIT):
            if(pause){
                nextTick()
                pause=false
            }
            Xvel = 0
            Yvel = -FUNIT
            break;
        case(event.keyCode==DOWN && Yvel!=-FUNIT):
            if(pause){
                nextTick()
                pause=false
            }
            Xvel = 0
            Yvel = FUNIT
            break;
    }
}

function Gameover(){
    if(snake[0].x<0 || snake[0].x>=WIDTH || snake[0].y<0 || snake[0].y>=HEIGHT){
        running = false
    }
    for(let i=2;i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            running =false
        }
    }
}
