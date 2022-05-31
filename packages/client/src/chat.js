import socket from './socket';

// const user = window.localStorage.getItem('user');
let user;
socket.on('player', (p) => {
  user = p.name;
});

const chat = (() => {
  const sendBtn = document.querySelector('#send');
  const messages = document.querySelector('#messages');
  const messageBox = document.querySelector('#messageBox');

  messageBox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      socket.emit('send message', {
        message: messageBox.value,
        user: user,
      });
    }
  });

  const showMessage = (data) => {
    messages.textContent += `${data.user}: ${data.message} \n`;
    messages.scrollTop = messages.scrollHeight;
    messageBox.value = '';
  };

  sendBtn.onclick = () => {
    if (!socket) {
      showMessage('No WebSocket connection');
      return;
    }

    if (messageBox.value) {
      socket.emit('send message', {
        message: messageBox.value,
        user: user,
      });
      // console.log(socket.id);
    }
  };

  socket.on('received message', (data) => {
    showMessage(data);
  });
})();

export default chat;
