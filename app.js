let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = [];
let randColor = function () {
  let colorArr = ["pink", "lightBlue", "yellow", "green"];
  color = Math.floor(Math.random() * 4);
  console.log("that color", colorArr[color]);
  return colorArr[color];
};

let gameStart = false;
let levelCnter = 0;

let p = document.querySelector(".level");
let h3 = document.querySelector("h3");
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");

start.addEventListener("click", function () {
  setTimeout(() => {
    if (gameStart == false) {
      gameStart = true;
      h3.innerHTML = `High Score : <b>${highScore}</b>`;
      levelUp();
      levelPath();
    }
  }, 350);
});

let gameFlash = function (btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
};
let userFlash = function (btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 400);
};
let levelUp = function () {
  userSeq = [];

  p.innerText = `Level ${levelCnter++}`;
  let color = randColor();
  console.log("color ", color);
  let randbtn = document.querySelector(`#${color}`);
  console.log("randbtn", randbtn);
  gameSeq.push(color);
  console.log(gameSeq);
  gameFlash(randbtn);
};

let levelPath = function () {
  gameSeq.forEach((move) => {
    setTimeout(() => {
      let btn = document.querySelector(`.${move}`);
      gameFlash(btn);
    }, 200);
  });
};
let btnPress = function (event) {
  let btn = this;
  userFlash(btn);

  userSeq.push(this.getAttribute("id"));

  checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (btns of allBtns) {
  btns.addEventListener("click", btnPress);
}

let checkAns = function (idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    if (gameSeq.length == userSeq.length) setTimeout(levelUp, 1000);
    if (highScore <= levelCnter) highScore = levelCnter - 1;
    h3.innerHTML = `High Score : <b>${highScore}</b>`;
  } else {
    p.innerHTML = `Game Over! Your Score is <b>${
      levelCnter - 1
    }</b> <br><br> Press Any Key To Start`;

    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 140);
    restart();
  }
};
document.querySelector(".reset").addEventListener("click", restart);
function restart() {
  gameStart = false;
  gameSeq = [];
  userSeq = [];
  levelCnter = 0;
}
reset.addEventListener("click", function () {
  p.innerText = "Game is has been RESET press START to PLAY AGAIN";
});
