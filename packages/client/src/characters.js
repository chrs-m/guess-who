import socket from './socket';

const characterImages = [
  '/assets/img/characters/birgitte.png',
  '/assets/img/characters/frank.png',
  '/assets/img/characters/ina.png',
  '/assets/img/characters/karl.png',
  '/assets/img/characters/ludo.png',
  '/assets/img/characters/robert.png',
  '/assets/img/characters/conrad.png',
  '/assets/img/characters/georg.png',
  '/assets/img/characters/hanna.png',
  '/assets/img/characters/jana.png',
  '/assets/img/characters/lena.png',
  '/assets/img/characters/martina.png',
  '/assets/img/characters/tilman.png',
  '/assets/img/characters/erika.png',
  '/assets/img/characters/fabien.png',
  '/assets/img/characters/hans.png',
  '/assets/img/characters/jens.png',
  '/assets/img/characters/lorena.png',
  '/assets/img/characters/michael.png',
  '/assets/img/characters/vilma.png',
  '/assets/img/characters/karsten.png',
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
<label for="avatar">Guess avatar:</label>

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
