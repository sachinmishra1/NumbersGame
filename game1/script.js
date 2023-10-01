let randomNumber = 0;
let score = 0;
let size = 2;
let notOk = false;
let cnt = 0;

function substitution() {
  document.getElementById("ele").style.display = "none";
  document.getElementById("myButton").style.display = "none";
  document.getElementById("myButton2").style.display = "none";
  document.getElementsByClassName("numpad")[0].style.display = "block";
  document.getElementById("ques").style.display = "block";

  game();
}

function input(v) {
  document.getElementById("ques").value += v;
  console.log(document.getElementById("ques").value);
}

function check() {
  let txt = document.getElementById("ques").value;
  return txt == randomNumber;
}
function checkAnswer(ans) {
  return new Promise((resolve) => {
    function checking(ans) {
      const greenTick = document.createElement("div");
      if (ans) {
        greenTick.className = "green-tick";
        greenTick.innerText = "✔";
      } else {
        greenTick.className = "red-cross";
        greenTick.innerText = "✘";
      }

      const blurryOverlay = document.createElement("div");
      blurryOverlay.className = "blurry-overlay";
      document.body.appendChild(blurryOverlay);

      document.body.appendChild(greenTick);
      greenTick.style.transform = "translate(-50%, -50%) scale(1)";
      setTimeout(() => {
        blurryOverlay.remove();
        greenTick.remove();
        resolve();
      }, 2000); // Adjust the delay as needed
    }
    checking(ans);
  });
}

async function solve() {
  const ans = check();
  await checkAnswer(ans);
  console.log(ans);

  if (ans) {
    score += document.getElementById("ques").value.length;
    notOk = false;

    console.log(score);
    document.getElementsByClassName("score")[0].innerHTML = score;
    if (cnt == 5) size++;
    startAnimation(size);
  } else {
    if (notOk) {
      gameEnds();
    } else {
      notOk = true;
      cnt = 0;

      console.log(score);
      document.getElementsByClassName("score")[0].innerHTML = score;
      if (cnt == 5) size++;
      startAnimation(size);
    }
  }
}

function clar(value) {
  document.getElementById("ques").value = "";
}

function remove(value) {
  document.getElementById("ques").value = document
    .getElementById("ques")
    .value.slice(0, document.getElementById("ques").value.length - 1);
}

async function startAnimation(x) {
  cnt++;
  const numberDisplay = document.getElementById("ques");
  randomNumber = generateRandomNumber(x);
  console.log("num = ", randomNumber);
  numberDisplay.value = ".".repeat(x);
  const buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  await animateNumber(numberDisplay, randomNumber, 0);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

function generateRandomNumber(x) {
  const min = Math.pow(10, x - 1);
  const max = Math.pow(10, x) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findIthDigit(number, i) {
  let numberStr = Math.abs(number).toString();
  if (i < 0 || i >= numberStr.length) {
    return undefined; // Out of range
  }
  let digit = numberStr.charAt(i);
  return digit;
}

function animateNumber(element, number, digitIndex) {
  return new Promise((resolve) => {
    function animate() {
      if (digitIndex < number.toString().length) {
        let currentDigit = findIthDigit(number, digitIndex);
        let str = element.value;
        const newValue =
          str.slice(0, digitIndex) + currentDigit + str.slice(digitIndex + 1);
        element.value = newValue;
        console.log(newValue, digitIndex, currentDigit);

        digitIndex++;
        setTimeout(() => {
          const newValue =
            str.slice(0, digitIndex) + "." + str.slice(digitIndex + 1);
          element.value = newValue;
          animate();
        }, 1000);
      } else {
        element.value = "";
        resolve(); // Resolve the Promise when the animation is finished
      }
    }

    animate();
  });
}

function goToMain(){
  window.location.href = "../index.html";
}

function game() {
  randomNumber = 0;
  score = 0;
  size = 2;
  notOk = false;
  cnt = 0;
  document.getElementsByClassName("score")[0].innerHTML = score;
  //   document.body.remove(getElementById('ele'));
  //   document.body.remove(getElementById('myButton'));
  startAnimation(size);
}

function gameEnds() {
  document.getElementById("ele").style.display = "block";
  document.getElementById("myButton").style.display = "block";
  document.getElementById("myButton2").style.display = "block";
  document.getElementsByClassName("numpad")[0].style.display = "none";
  document.getElementById("ques").style.display = "none";

}

game();
