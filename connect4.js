/** Connect Four
 *
 
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])
const board = [];



/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
 // for loop which pushes empty array as subarray
  for (let y = 0; y<HEIGHT; y++){
    board.push(Array.from({length: WIDTH}))
  }

}


function makeHtmlBoard() {
  // connect htmlBoard to board in html
    const htmlBoard = document.querySelector(`#board`);

  // Create "top" tr element with id of `column top`. Add click event
  const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.classList.add(`playa2`)
   top.addEventListener("click", handleClick);


  //fill up "top" with `headCell` (td row elements) with id of x to column top
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // add "top" which contains row of multiple "headCell" to "htmlBoard"
  htmlBoard.append(top);

  
  // add "row"(tr) which contains "cell" (td) elements to "htmlBoard"
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }

}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {

 // starting from the bottom, check if subarray of y is empty. If empty, return it's value as y
 // if every sub array of x is full, return null (click does nothing)
  for (let y = HEIGHT-1; y>=0; y--){
    if (!board[y][x]){
      return y;
    }
  }
  return null;

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make div and insert into correct table cell
  const gamePiece = document.createElement(`div`);
  gamePiece.classList.add("piece");
  //add classList to change colors if p1 or 2
  if (currPlayer === 1){
  gamePiece.classList.add(`p1`)
  gamePiece.classList.remove(`p2`)
    }
  if (currPlayer === 2){
    gamePiece.classList.add(`p2`)
    gamePiece.classList.remove(`p1`)
  }
  // add gamePiece div to selected location 
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(gamePiece);
}


function endGame() {
  // announce game over, reset board
  //used setTimeout to finish falling div animation 
  setTimeout(()=>
    {alert(`Game over! Player ${currPlayer} wins! Play again?`);}, 500)
  setTimeout(()=>
    {location.reload();}, 550)
}

function tie (){
  // announce tie, reset board
  //used setTimeout to finish falling div animation 
  setTimeout(()=>
    {alert(`Game over! It's a tie! Play again?`);}, 500);
  setTimeout(()=>
    {location.reload();}, 550)
}

function handleClick(evt) {
  // add classlists to top for changing hover effect
  const top =document.querySelector(`#column-top`)
  if (currPlayer === 1){
    top.classList.add(`playa1`)
    top.classList.remove(`playa2`)
      
    }
    if (currPlayer === 2){
      top.classList.add(`playa2`)
      top.classList.remove(`playa1`)
    }

  // get x from ID of clicked cell
  const x = +evt.target.id;

  // returns y as empty spot in column (if column full return null & ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // update board subarray with current player's move (p1 or p2)
  board[y][x] = currPlayer;
  // run function to change visual board appearance
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame();
  }

  // check for tie
  // check if every x,y value on board returns true
  if (board.every(x => x.every(y => y))) {
    return  tie()    
  }

  // switch players after each click event
  currPlayer = (currPlayer === 1)? 2: 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all div(p1 or p2) of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }


  // starting from x=0, y=0, check if there are 4 pieces in a row to declare a win
  // input these 4 piece combinations (horiz/diagDr/diagDL/vert) into _win function as possible winning combinations

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // check if any of the above winning combos apply in _win function
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard()
makeHtmlBoard();

//future todos: optimize for mobile @media different sizes, possibly add reset game button, add undo move button
//add div declaring game data (whos turn, games played etc), better border as frame
// add undo button (save last move to a const, and undo that move), and add reset board button
// fix animations - currently it's getting pushed up based on ending index. (absolute positioning divs? loop to change animation somehow?)
// use images as buttons - no words on this project
// change mouse color to match the player's turn 
// add flashing gray bg to top row? 
// update logic if row is full, top piece hoever effect changes to wrong color. should stay same color. 

// old code for palce in table:   
    // gamePiece.style.transform = "translateY(" + -50 * (y + 2) + "px" + ")";
    // gamePiece.style.transform = "translateY(" + -50 * (y + 2) + "px" + ")";
