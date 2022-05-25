import server from './socket';
const inputField = document.querySelector('input');
const joinBtn = document.querySelector('.btnJoin');
const span = document.querySelector('.span');

server.on('join ok', (data) => {
  window.localStorage.setItem('user', JSON.stringify(data));

  window.location = './';
});

if (joinBtn) {
  joinBtn.addEventListener('click', () => {
    if (inputField.value) {
      server.emit('join room', { username: inputField.value });
    }
  });
}

if (window.localStorage.getItem('user')) {
  inputField.style.display = 'none';
  joinBtn.style.display = 'none';
  span.style.display = 'none';
}

export default {};
