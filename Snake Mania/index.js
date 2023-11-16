// Game Constant and Variables



let inputDir = {x:0, y:0}
let foodsound = new Audio("food.mp3")
let gameoversound = new Audio("gameover.mp3")
let movesound = new Audio("move.mp3")
let musicsound = new Audio("music.mp3")
let speed = 7   
let score = 0
lastPaintTime = 0
let snakeArr = [
    { x:10, y:15}
]

food = { x:9, y:7}


// Game Function
 main = (ctime)=>{
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;  
    }
    lastPaintTime = ctime
    gameEngine();
}

    function isCollide(snake){
        for (let i = 1; i < snakeArr.length; i++) {
           if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
         }
        // if you bump Into the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }

    }
 gameEngine = ()=>{
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over 'Press any key To start The Game' ")
        snakeArr = [{x : 13, y: 15}];
        musicsound.play();
        score = 0
    }

    // if you have eaten the food, increment the score and regenrate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1
        if(score>hiscoreval){
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            Hiscore.innerHTML = "HiScore: " + hiscoreval
            score.innerHTML = "Score: 0";
        }
       
        scoreBox.innerHTML = "Score : " + score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y });
        a = 2,
        b = 16,
        food = {x :Math.round(a +(b-a) * Math.random() ), y:Math.round(a +(b-a) * Math.random())}
    }


    // Moving The Snake

    for (let i = snakeArr.length - 2; i>= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]} 
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    // Display The Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}













// Main Logic Starts Here
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0; 
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    Hiscore.innerHTML = "HiScore: " + hiscore
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1}
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y =1;
            console.log("ArrowDown")
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;
    
        default:
            break;
    }
})

