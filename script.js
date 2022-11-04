const gameBoard = (() => {
  let gameState = [];
  for (let i = 0; i < 9; i++) {
    gameState.push('');
  }
  return { gameState };
})();

const game = (() => {
  const gameStatus = document.querySelector('.game-status');
  let gameActive = true;
  let currentPlayer = 'X';
  let cellsLeft = 9;
  let playerX;
  let playerO;
  let playerXScore = 0;
  let playerOScore = 0;
  let player1 = document.querySelector('#player1');
  let player2 = document.querySelector('#player2');

  const winningMessage = () =>
    currentPlayer === 'X'
      ? `${playerX} wins the game!`
      : `${playerO} wins the game!`;
  const drawMessage = () => `It's a draw!`;
  const currentPlayerTurn = () => {
    if (currentPlayer === 'X') {
      return `${playerX}, your turn`;
    } else return `${playerO}, your turn`;
  };

  gameStatus.innerHTML = 'Please choose your character names';

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));

    if (gameBoard.gameState[clickedCellIndex] != '' || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleGameValidation();
    handleDraw();
    handlePlayerChange();
  }

  function handleDraw() {
    if (cellsLeft <= 0) {
      gameActive = false;
      gameStatus.innerHTML = drawMessage();
    }
  }
  function handleGameValidation() {
    let gameState = gameBoard.gameState;
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
    ];

    winningConditions.forEach(condition => {
      let a = condition[0];
      let b = condition[1];
      let c = condition[2];

      if (
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c] &&
        gameState[a] != ''
      ) {
        gameStatus.innerHTML = winningMessage();
        let playerOneScore = document.querySelector('.player-1-score');
        let playerTwoScore = document.querySelector('.player-2-score');
        currentPlayer === 'X'
          ? (playerOneScore.innerHTML = playerXScore += 1)
          : (playerTwoScore.innerHTML = playerOScore += 1);
        console.log(playerOScore);
        gameActive = !gameActive;
      }
    });
  }
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameBoard.gameState[clickedCellIndex] = currentPlayer;
    console.log(currentPlayer);
    currentPlayer === 'X'
      ? (clickedCell.style.color = 'red')
      : (clickedCell.style.color = 'green');
    clickedCell.innerHTML = currentPlayer;

    cellsLeft -= 1;
  }

  function handlePlayerChange() {
    if (!gameActive) {
      return;
    } else {
      currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X');
      gameStatus.innerHTML = currentPlayerTurn();
    }
  }

  function handleRestartGame() {
    cellsLeft = 9;
    gameActive = true;
    currentPlayer = 'X';
    gameBoard.gameState = [];
    for (let i = 0; i < 9; i++) {
      gameBoard.gameState.push('');
    }
    document.querySelectorAll('.cell').forEach(cell => (cell.innerHTML = ''));
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => (cell.style.color = ''));
  }

  function handleStartGame() {
    if (player1.value == '' || player2.value == '') {
      console.log('No values.');
      return;
    } else {
      playerX = player1.value;
      playerO = player2.value;
      document.querySelector('#player-1').innerHTML = playerX;
      document.querySelector('#player-2').innerHTML = playerO;
      console.log(playerX, playerO);
      document.querySelector('.chosen-players').style.display = 'flex';
      document.querySelector('.start-game').style.display = 'none';
      document.querySelector('.player-inputs').style.display = 'none';
      document.querySelector('.game-container').style.display = 'grid';
      document.querySelector('.restart-game').style.display = 'inline';
      gameStatus.innerHTML = currentPlayerTurn();
    }
  }

  document
    .querySelectorAll('.cell')
    .forEach(cell => cell.addEventListener('click', handleCellClick));

  document
    .querySelector('.restart-game')
    .addEventListener('click', handleRestartGame);

  document
    .querySelector('.start-game')
    .addEventListener('click', handleStartGame);
})();
