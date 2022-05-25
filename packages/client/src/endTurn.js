import socket from './socket';

let playerTurn = true;
const blockBox = document.querySelector('.stopOverlay');
const nextTurnBtn = document.querySelector('#turn');

let player = false;

socket.on('player', (data) => {
  if (!player) {
    player = data;
  }
});

if (nextTurnBtn !== null) {
  nextTurnBtn.addEventListener('click', () => {
    playerTurn = false;
    endTurn();
  });
}

const endTurn = () => {
  socket.emit('pass_turn', player);
};

socket.on('turn', (data) => {
  if (player !== data) {
    blockBox.classList.add('stopOverlay');
    blockBox.style.display = 'block';
  }

  if (player === data) {
    blockBox.style.display = 'none';
  }
});

endTurn();

export default endTurn;
