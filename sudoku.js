var numSelected = null;
var tileSelected = null;

var timer;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
    startTimer();
    
}

  
function startTimer() {
    var ele = document.getElementById('timer');
    var sec = 0;
    timer = setInterval(() => {
        var minutes = Math.floor(sec / 60); // Calculate minutes
        var seconds = sec % 60; // Calculate remaining seconds
        
        // Formatting seconds and minutes to two digits
        var displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        var displaySeconds = seconds < 10 ? '0' + seconds : seconds;
        
        ele.innerHTML = displayMinutes + ':' + displaySeconds;
        sec++;
    }, 1000);
}
function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            document.getElementById("errors").innerText = "Correct !!";
            checkCompletion();
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = "Wrong place!!";
        }
    }
}
function solve() {
    // Fill the board with the solution
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == "-") {
                let tileId = r.toString() + "-" + c.toString();
                document.getElementById(tileId).innerText = solution[r][c];
            }
        }
    }
    
    // Check completion after solving
    checkCompletion();
    
    // Optional: Display a message or update UI after solving
    document.getElementById("errors").innerText = "Board Solved!";
}

function checkCompletion() {
    // Check if the board matches the solution
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == "-" && document.getElementById(r + "-" + c).innerText !== solution[r][c]) {
                return; // Board is not yet complete
            }
        }
    }
    
    // If all cells match the solution, show congratulations overlay
    showCongratulationsOverlay();
}

function showCongratulationsOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "flex"; // Show the overlay
}

function closeOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Hide the overlay
}

function toggleRulesOverlay() {
    var rulesOverlay = document.getElementById("rules-overlay");
    rulesOverlay.style.display = rulesOverlay.style.display === "flex" ? "none" : "flex";
}

function closeRulesOverlay() {
    var rulesOverlay = document.getElementById("rules-overlay");
    rulesOverlay.style.display = "none"; // Hide the rules overlay
}
