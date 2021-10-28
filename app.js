let ticwrapper = document.querySelector(".wrapper");
let btnclksound = new Audio("./src/mp3/btnclick.wav");
let strikeSound = new Audio("./src/mp3/strike.wav");
let gamewinsound = new Audio("./src/mp3/gamewon.wav");
let spinsound = document.getElementById("spinaudio");

let gameend = document.querySelector(".gameend");
let stopgame = false;
let threeDtext = document.querySelector(".threeDtext");
setTimeout(() => {
  gameend.style.width = "500px";
  gameend.style.height = "310px";
  gameend.style.transform = "scale3d(1,1,1)";
}, 1000);

let players = document.querySelector(".players");
let first = document.querySelector(".first");
let second = document.querySelector(".second");

let playagain = document.getElementById("playagain");
console.log(playagain, "playagain");
playagain.addEventListener("click", (e) => {
  console.log("clicked");
  window.location.reload();
});
console.log(second);

first.appendChild(createCross());
second.appendChild(createCirel());
let count = 0;
let n = 3;
``;
let gridnodes = [];

let gridcopy = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let x = 1;
let o = -1;

window.addEventListener("load", () => {
  // console.log("page loadd");
  spinsound.muted = true;
  spinsound.play();
  // spinsound.muted = false;
  // spinsound.play();
});

if (count % 2 == 0) {
  first.classList.add("currentPlayer");
  second.classList.remove("currentPlayer");
} else {
  second.classList.add("currentPlayer");
  first.classList.remove("currentPlayer");
}

function generateGrid(n) {
  let gird = [];
  for (let i = 0; i < n; i++) {
    let eachrow = [];
    let start = "<div class='row'>";
    for (let j = 0; j < n; j++) {
      eachrow.push('<div class="block"></div>');
    }
    let end = "</div>";
    gird.push(start + eachrow.join("") + end);
  }

  ticwrapper.innerHTML = gird.join("");
  let rowsele = document.querySelectorAll(".row");
  console.log(rowsele);
  rowsele.forEach((row) => gridnodes.push(row.children));

  console.log(gridnodes);

  let blocks = document.querySelectorAll(".block");

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i == n - 1 && j == n - 1) {
      } else if (j == n - 1) {
        setTimeout(() => {
          gridnodes[i][j].style.borderBottom = "5px solid rgb(16, 201, 139)";
        }, 1000);
      } else if (i == n - 1) {
        setTimeout(() => {
          gridnodes[i][j].style.borderRight = "5px solid rgb(16, 201, 139)";
        }, 1000);
      } else {
        console.log(i, j);
        setTimeout(() => {
          gridnodes[i][j].style.borderRight = "5px solid rgb(16, 201, 139)";
          gridnodes[i][j].style.borderBottom = "5px solid rgb(16, 201, 139)";
        }, 1000);
      }
    }
  }
  addEvent(gridnodes, n);
}

generateGrid(n);

function addEvent(gridnodes, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      gridnodes[i][j].addEventListener(
        "click",

        () => {
          if (!gridnodes[i][j].hasChildNodes()) {
            btnclksound.currentTime = 0;
            btnclksound.play();

            if (count % 2 == 0) {
              gridcopy[i][j] = x;
              let div = createCross();
              gridnodes[i][j].appendChild(div);
              count += 1;
            }
            count += 1;
            if (count % 2 == 0) {
              second.classList.add("currentPlayer");
              first.classList.remove("currentPlayer");
            }

            console.table(gridcopy);
            let res = isStrike(n);
            if (res) {
              strikeSound.currentTime = 0;
              strikeSound.play();
              strikeSound.onended = () => {
                gamewinsound.play();
              };

              // gamewinsound.play();
              let [dir, index] = res;
              console.log(dir, index);
              strikegrid(dir, index);
              gameend.classList.add("showend");
              stopgame = true;
            }
            if (!stopgame) {
              setTimeout(() => {
                roboplayer(n);
              }, Math.floor(Math.random() * 5) * 1000);
            }
          }
        }

        // gridnodes[i][j].create
      );
    }
  }
}

function createCirel() {
  let div = document.createElement("div");
  div.setAttribute("class", "circle");
  setTimeout(() => (div.style.width = "50px"), 10);

  return div;
}

function createCross() {
  let div = document.createElement("div");
  div.setAttribute("class", "cross");
  setTimeout(() => (div.style.width = "50px"), 10);
  div.innerHTML = ` <div class="leftCross"></div><div class="rightCross"></div>
        `;

  let rightcross = div.getElementsByClassName("rightCross")[0];
  console.log(rightcross);

  setTimeout(() => ((div.firstElementChild.style.width = "50px"), 10));
  setTimeout(() => ((rightcross.style.width = "50px"), 10));

  return div;
}

function isStrike(n) {
  //row strike
  for (let row = 0; row < n; row++) {
    res = new Set(gridcopy[row]);
    if (res.size == 1 && !res.has("")) {
      console.log("row dne");
      return ["row", row];
    }
  }

  //col strike

  let leftdig = [];
  let rightdig = [];
  for (let col = 0; col < n; col++) {
    let colitem = [];

    for (let row = 0; row < n; row++) {
      if (col == row) {
        leftdig.push(gridcopy[row][col]);
      }
      if (row + col == n - 1) {
        rightdig.push(gridcopy[row][col]);
      }
      colitem.push(gridcopy[row][col]);
    }
    console.log(colitem, "clitems");
    let colset = new Set(colitem);
    if (colset.size == 1 && !colset.has("")) {
      return ["col", col];
    }
  }

  //left diagnol
  console.log(leftdig, "leftdeg");
  let leftdegset = new Set(leftdig);
  if (leftdegset.size == 1 && !leftdegset.has("")) {
    console.log("leftdeg");

    return ["left", 1];
  }
  console.log(rightdig, "righdeg");
  let rigdegset = new Set(rightdig);
  if (rigdegset.size == 1 && !rigdegset.has("")) {
    console.log("righdeg");
    return ["right", -1];
  }
}

function getStrikeSymbol(angle) {
  let strikediv = document.createElement("div");
  strikediv.setAttribute("class", "strike");
  setTimeout(() => ((strikediv.style.width = "150px"), 1000));

  strikediv.style.transform = `rotate(${angle}deg)`;
  return strikediv;
}

function strikegrid(dir, index) {
  if (dir == "row") {
    for (let col = 0; col < n; col++) {
      gridnodes[index][col].appendChild(getStrikeSymbol(0));
    }
  } else if (dir == "col") {
    for (let row = 0; row < n; row++) {
      gridnodes[row][index].appendChild(getStrikeSymbol(90));
    }
  } else if (dir == "left") {
    let row = 0,
      col = 0;
    while (row < n) {
      gridnodes[row][col].appendChild(getStrikeSymbol(45));
      row++;
      col++;
    }
  } else if (dir == "right") {
    let row = 0,
      col = n - 1;
    while (col >= 0) {
      gridnodes[row][col].appendChild(getStrikeSymbol(-45));
      row++;
      col -= 1;
    }
  }
}

function sucessorfail() {}

function roboplayer(n) {
  let div = createCirel();

  let isDraw = isGameDraw(n);
  console.log(isDraw, "isdraw");
  if (!isDraw) {
    let checkifwin = checkifrobowin();
    console.log(checkifwin, "robowin index");
    let row, col;
    if (checkifwin == -1) {
      smartindexs = checkStrikes();

      console.log(smartindexs, "smartindexes");

      if (smartindexs != -1 && gridcopy[smartindexs[0]][smartindexs[1]] == "") {
        row = smartindexs[0];
        col = smartindexs[1];
      } else {
        row = Math.floor(Math.random() * n);
        col = Math.floor(Math.random() * n);
        while (gridcopy[row][col] != "") {
          row = Math.floor(Math.random() * n);
          col = Math.floor(Math.random() * n);
        }
      }
    } else {
      row = checkifwin[0];
      col = checkifwin[1];
    }

    console.log(row, col, "final row cl");
    gridcopy[row][col] = o;

    gridnodes[row][col].appendChild(div);

    first.classList.add("currentPlayer");
    second.classList.remove("currentPlayer");

    btnclksound.currentTime = 0;
    btnclksound.play();
  }
  let res = isStrike(n);

  if (res) {
    strikeSound.currentTime = 0;
    strikeSound.play();
    strikeSound.onended = () => {
      gamewinsound.play();
    };

    // gamewinsound.play();
    let [dir, index] = res;
    console.log(dir, index);
    strikegrid(dir, index);

    gameend.classList.add("showend");
    threeDtext.textContent = "You lost 😑...Try again";
    threeDtext.style.animation = "neonAnimLoose 2s alternate-reverse infinite";
    threeDtext.style.color = "#FF003D";
  }

  if (isDraw) {
    gameend.classList.add("showend");
    threeDtext.textContent = "DRAW💪...Will Fight Again ";
    threeDtext.style.animation = "neonAnimLoose 2s alternate-reverse infinite";
    threeDtext.style.color = "#FF003D";
  }
  // gameend.style.background = "rgb(226 58 58 / 38%)";
}

function isGameDraw(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (gridcopy[i][j] == "") {
        return false;
      }
    }
  }
  return true;
}
function checkifrobowin() {
  for (let row = 0; row < n; row++) {
    let robosum = 0;
    let emptycell = [-1, -1];

    for (let col = 0; col < n; col++) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        robosum += gridcopy[row][col];
      }
    }

    if (robosum == -2) {
      return emptycell;
    }
  }

  for (let col = 0; col < n; col++) {
    let robosum = 0;
    let emptycell = [-1, -1];

    for (let row = 0; row < n; row++) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        robosum += gridcopy[row][col];
      }
    }

    if (robosum == -2) {
      return emptycell;
    }
  }
  {
    let sum = 0;

    let emptycell = [-1, -1];
    let row = 0,
      col = 0;
    while (row < n) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
      row++;
      col++;
    }
    if (sum == -2) {
      return emptycell;
    }
  }

  {
    let sum = 0;
    let emptycell = [-1, -1];
    let row = 0,
      col = n - 1;
    while (col >= 0) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
      row++;
      col -= 1;
    }
    if (sum == -2) {
      return emptycell;
    }
  }

  return -1;
}

function checkStrikes() {
  let strikePossibilites = [];

  let rrow, rcol;

  for (let row = 0; row < n; row++) {
    let sum = 0;

    let reqcol;
    let emptycell = [-1, -1];

    for (let col = 0; col < n; col++) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
    }

    if (sum == 2) {
      return emptycell;
    }
  }

  for (let col = 0; col < n; col++) {
    let sum = 0;

    let emptycell = [-1, -1];

    for (let row = 0; row < n; row++) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
    }

    if (sum == 2) {
      return emptycell;
    }
  }

  {
    let sum = 0;

    let emptycell = [-1, -1];
    let row = 0,
      col = 0;
    while (row < n) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
      row++;
      col++;
    }
    if (sum == 2) {
      return emptycell;
    }
  }

  {
    let sum = 0;
    let emptycell = [-1, -1];
    let row = 0,
      col = n - 1;
    while (col >= 0) {
      if (gridcopy[row][col] == "") {
        emptycell[0] = row;
        emptycell[1] = col;
      } else {
        sum += gridcopy[row][col];
      }
      row++;
      col -= 1;
    }
    if (sum == 2) {
      return emptycell;
    }
  }
  return -1;
}
