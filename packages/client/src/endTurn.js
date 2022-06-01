import socket from './socket';

let playerTurn = true;
const blockBox = document.querySelector('.stopOverlay');
const lostOverlay = document.querySelector('.lostOverlay');
const winOverlay = document.querySelector('.winOverlay');
const nextTurnBtn = document.querySelector('#turn');
const guessBtn = document.querySelector('#guess');
const selectedAvatar = document.querySelector('#avatars');

let player = false;

socket.on('player', (data) => {
  if (!player || player.id === data.id) {
    player = data;
  }
});

if (nextTurnBtn !== null) {
  nextTurnBtn.addEventListener('click', () => {
    playerTurn = false;
    endTurn();
  });
}

socket.on('guessedAvatar', (data) => {
  if (data.correct) {
    if (data.id == player.id) {
      winOverlay.style.display = 'block';
    } else {
      lostOverlay.style.display = 'block';
    }
  }
  if (data.correct === false) {
    endTurn();
    alert('wrong guess');
  }
});

guessBtn.addEventListener('click', () => {
  socket.emit('guessAvatar', selectedAvatar.value);
});

const endTurn = () => {
  socket.emit('pass_turn', player.id);
};

socket.on('turn', (data) => {
  if (player.id !== data.id) {
    blockBox.classList.add('stopOverlay');
    blockBox.style.display = 'block';
  }

  if (player.name === '') {
    blockBox.style.display = 'none';
  }

  if (player.id === data.id) {
    blockBox.style.display = 'none';
  }
});

endTurn();

export default endTurn;
