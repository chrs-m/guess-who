import socket from './socket';

const user = window.localStorage.getItem('user');

if (!user) {
  window.location = '/';
}
const chat = (() => {
  const sendBtn = document.querySelector('#send');
  const messages = document.querySelector('#messages');
  const messageBox = document.querySelector('#messageBox');

  messageBox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      socket.emit('send message', {
        message: messageBox.value,
        user: JSON.parse(user),
      });
    }
  });

  const showMessage = (data) => {
    messages.textContent += `${data.user.username}: ${data.message} \n`;
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
        user: JSON.parse(user),
      });
      console.log(socket.id);
    }
  };

  socket.on('received message', (data) => {
    // console.log(data);
    showMessage(data);
  });
})();

export default chat;
