const inputField = document.querySelector('input');
import server from './socket';

const submitBtn = document.querySelector('button');

server.on('ping', () => {
  console.log('Message recived');
});

server.on('join ok', (data) => {
  window.localStorage.setItem('user', JSON.stringify(data));

  window.location = './game.html';
});

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (inputField.value) {
      server.emit('join room', { username: inputField.value });
    }
  });
}

export default {};
