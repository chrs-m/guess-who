import server from './socket';
const inputField = document.querySelector('input');
const joinBtn = document.querySelector('.btnJoin');
const span = document.querySelector('.nameSpan');

server.on('join ok', (data) => {
  // window.localStorage.setItem('user', JSON.stringify(data));
  // window.location = './';
});

if (joinBtn) {
  joinBtn.addEventListener('click', () => {
    if (inputField.value) {
      server.emit('setUsername', inputField.value);
      server.emit('join room', { username: inputField.value });
    }
  });
}

server.on('player', (data) => {
  if (data && data.name !== '') {
    inputField.style.display = 'none';
    joinBtn.style.display = 'none';
    span.style.display = 'none';
  }
});

export default {};
