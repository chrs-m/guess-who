import socket from './socket';

let playerTurn = true;
const blockBox = document.querySelector('.stopOverlay');
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

guessBtn.addEventListener('click', () => {
  socket.emit('guessAvatar', selectedAvatar.value);
  socket.on('guessedAvatar', (data) => {
    console.log(data);

    if (data.correct) {
      console.log(data.id == player.id ? 'YOU WON :)' : 'YOU LOST :(');
    }
    if (data.correct === false) {
      console.log('wrong guess');
    }
  });
  endTurn();
});

const endTurn = () => {
  socket.emit('pass_turn', player.id);
};

socket.on('turn', (data) => {
  // console.log(player);

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
