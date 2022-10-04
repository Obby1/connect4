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
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // const board = [];
  for (let y = 0; y<HEIGHT; y++){
    board.push(Array.from({length: WIDTH}))
  }



  // less efficient code
  // for (let i = 0; i<HEIGHT; i++ ){
  //   const subArr = [];
  //   for (let j = 0; j<WIDTH; j++){
  //     subArr.push(undefined);
  //   }
  //   board.push(subArr);
  // }


}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
 // connect "htmlBoard" to board id in html 
  const htmlBoard = document.querySelector(`#board`);

  // Create "top" tr element with id of `column top`. Add click event
  const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
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
  // TODO: write the real version of this, rather than always returning 0

 // starting from the bottom, check if subarray of y is empty. If empty, return it
 // every sub array of x is full, return null (click does nothing)
  for (let y = HEIGHT-1; y>=0; y--){
    if (!board[y][x]){
      return y;
    }
  }
  return null;

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement(`div`);
  gamePiece.classList.add("piece");
  //!change colors if p1 or 2
  if (currPlayer === 1){
  gamePiece.classList.add(`p1`)
  gamePiece.classList.remove(`p2`)
  

  }
  if (currPlayer === 2){
    gamePiece.classList.add(`p2`)
    gamePiece.classList.remove(`p1`)
  }

  const spot = document.getElementById(`${y}-${x}`);
  // console.log(spot);
  // console.log(`${y}-${x}`)
  spot.append(gamePiece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(`Game over! Player ${currPlayer} wins!`)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
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

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // check if every x,y value is true
  if (board.every(x => x.every(y => y))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1)? 2: 1;
  // console.log(x);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
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
  // input these 4 piece combinations (horiz/diagDr/diagDL/vert) into _win function
  // _win func will check if every piece fits into the game board & all pieces belong to currPlayer

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard()
makeHtmlBoard();
