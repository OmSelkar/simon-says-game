let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = [];
let randColor = function () {
    let colorArr = ['pink','lightBlue','yellow','green']
    color = Math.floor(Math.random() * 4);
    return colorArr[color]
}

let gameStart = false;
let levelCnter = 0;

let p = document.querySelector('.level')
let h3 = document.querySelector('h3')
let start = document.querySelector('.start')
let reset = document.querySelector('.reset')
let score = document.querySelector('.score')

start.addEventListener('click', function () {
    setTimeout(() => {
        if (gameStart == false) {
            console.log(`Game Start`)
            gameStart = true;
            h3.innerHTML = `High Score : <b>${highScore}</b>`
            levelUp();
        }
    }, 700);
    
})

let gameFlash = function (btn) {
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove('flash')
    }, 250);
}
let userFlash = function (btn) {
    btn.classList.add('userflash')
    setTimeout(() => {
        btn.classList.remove('userflash')
    }, 250);
}
let levelUp = function () {
    userSeq = [] // entering next level

    p.innerText = `Level ${levelCnter++}`
    let color = randColor()
    let randbtn = document.querySelector(`.${color}`) // class selecting
    console.log(color)
    gameSeq.push(color)
    // gameFlash(randbtn)
    levelPath();

}

let levelPath = function(){
    gameSeq.forEach((move, i) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${move}`);
            setTimeout(gameFlash(btn),600);
        }, i*600);
    });
}
let btnPress = function (event) {
    let btn = this; // this give the div of that color button and btnflash add the flash class to flash clicked btn by user
    userFlash(btn)

    userSeq.push(this.getAttribute('id'))
    console.log(this.getAttribute('id'))

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll('.btn')
for (btns of allBtns) {
    btns.addEventListener('click', btnPress)
}

let checkAns = function (idx) {
    if (gameSeq[idx] == userSeq[idx]) {
        if (gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
            if (highScore <= levelCnter) highScore = levelCnter;
            h3.innerHTML = `High Score : <b>${highScore-1}</b>`
            score.innerHTML = `Score : <b>${levelCnter-1}</b>`
        }
        console.log(`true`)
        
    }
    else {
        p.innerHTML = `Game Over! Your Score is <b>${levelCnter - 1}</b> <br><br> Press Any Key To Start`;

        document.querySelector('body').style.backgroundColor = 'red'

        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = 'white'
        }, 120);
        setTimeout(restart(),2000);
    }
}
document.querySelector('.reset').addEventListener('click', restart);
function restart() {
    gameStart = false;
    gameSeq = []
    userSeq = []
    levelCnter = 0
    score.innerHTML = `Score : <b>0</b>`

}
reset.addEventListener('click',function(){
    p.innerText = 'Game is has been RESET press START to PLAY AGAIN';
})