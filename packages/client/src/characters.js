import socket from './socket';

const characterImages = [
  '/assets/img/characters/Birgitte.png',
  '/assets/img/characters/Frank.png',
  '/assets/img/characters/Ina.png',
  '/assets/img/characters/Karl.png',
  '/assets/img/characters/Ludo.png',
  '/assets/img/characters/Robert.png',
  '/assets/img/characters/Conrad.png',
  '/assets/img/characters/Georg.png',
  '/assets/img/characters/Hanna.png',
  '/assets/img/characters/Jana.png',
  '/assets/img/characters/Lena.png',
  '/assets/img/characters/Martina.png',
  '/assets/img/characters/Tilman.png',
  '/assets/img/characters/Erika.png',
  '/assets/img/characters/Fabien.png',
  '/assets/img/characters/Hans.png',
  '/assets/img/characters/Jens.png',
  '/assets/img/characters/Lorena.png',
  '/assets/img/characters/Michael.png',
  '/assets/img/characters/Vilma.png',
  '/assets/img/characters/Karsten.png',
];
const overlay = document.createElement('div');
overlay.setAttribute('class', 'overlay');
overlay.style.position = 'absolute';
overlay.style.width = '60%';
overlay.style.paddingLeft = '48px';
overlay.style.paddingTop = '32px';
overlay.style.backgroundColor = 'lightgrey';
document.body.appendChild(overlay);

let names = [];

for (let index = 0; index < characterImages.length; index++) {
  const img = document.createElement('img');
  img.style.cursor = 'pointer';
  img.style.marginRight = '30px';
  img.style.paddingTop = '14px';
  img.src = characterImages[index];
  document.querySelector('.overlay').appendChild(img);

  img.addEventListener('click', () => {
    displayGame(index);
    socket.emit('setAvatar', index);
  });

  names.push(
    characterImages[index]
      .split('/')
      [characterImages[index].split('/').length - 1].split('.png')[0]
  );
}

document.querySelector('.guessAvatar').innerHTML = `
<label for="avatar">Guess opponent character:</label>

<select name="avatars" id="avatars">
${names.map((name, i) => {
  return `<option value="${i}">${name}</option>`;
})}
</select>
`;

function displayGame(characterID) {
  const charactersIndexId = characterID;
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';

  let characterIndex = 0;
  characterImages.forEach((character) => {
    if (characterIndex === charactersIndexId) {
      const imgDiv = document.createElement('div');

      imgDiv.setAttribute('class', 'imgDiv');
      imgDiv.style.width = '130px';
      imgDiv.style.height = '150px';
      imgDiv.style.position = 'absolute';
      imgDiv.style.marginLeft = '27.5%';

      document.body.appendChild(imgDiv);

      const src = character;
      const choosenCharacter = document.createElement('img');
      choosenCharacter.style.width = '100%';
      choosenCharacter.setAttribute('class', 'choosenCharacter');
      choosenCharacter.src = src;
      document.querySelector('.imgDiv').appendChild(choosenCharacter);
    }
    characterIndex++;
  });
}

export default {};
