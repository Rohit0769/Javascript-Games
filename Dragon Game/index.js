
score = 0;
cross = true;
audio = new Audio('music.mp3')
overaudio = new Audio('gameover.mp3')

setTimeout(() => {
    audio.play()
}, 2000);

document.onkeydown = function(e){
    console.log('The arrow key is', e.keyCode)
    if (e.keyCode==38) {
        dino = document.querySelector(".dino");
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode==39) {
        dino = document.querySelector(".dino");
        dinoX =  parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX + 122 + "px";
    }


    if (e.keyCode==37) {
        dino = document.querySelector(".dino");
        dinoX =  parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX - 122 + "px";

    }

}

setInterval(() => {
    dino = document.querySelector(".dino")
    Gameover = document.querySelector(".Gameover")
    obstacle = document.querySelector(".obstacle")

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    offsetX = Math.abs(dx-ox) 
    offsetY = Math.abs(dy-oy)

    console.log(offsetX, offsetY)

    if (offsetX <73 && offsetY<52) {
        overaudio.play()
        audio.pause()
       Gameover.style.visibility = 'visible'
       obstacle.classList.remove('obstacleAni')
    } 

    else if(offsetX < 123 && cross){

        score += 1;
        updatescore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);

        aniDur =  parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'))
        newDur = aniDur - 0.1 
        obstacle.style.animationDuration =  newDur + 's'
    }


},100);

    function updatescore(score){
        scorecount.innerHTML = "Your Score: " + score
    }
  

