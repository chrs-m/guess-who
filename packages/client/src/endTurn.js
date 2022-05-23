import server from './socket';

let playerTurn: boolean = true;
const blockBox: HTMLElement | null = document.querySelector('#app');

const nextTurnBtn: HTMLElement | null = document.querySelector('#turn');

if (nextTurnBtn !== null) {
  nextTurnBtn.addEventListener('click', () => {
    playerTurn = false;
    endTurn();
  });
}

const endTurn = () => {
  server.emit('pass_turn');
  if (playerTurn === false) {
    if (blockBox !== null) {
      blockBox.classList.add('stopOverlay');

      const text = document.createTextNode(
        'Please wait for oppent to end its turn..'
      );

      blockBox.appendChild(text);
      blockBox.appendChild;
    }
  }
};

endTurn();

export default endTurn;
