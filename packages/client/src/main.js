import * as PIXI from 'pixi.js';
import { Spritesheet } from 'pixi.js';

let sheet;

var app = new PIXI.Application({
  antialias: true,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
});
document.body.appendChild(app.view);

const loader = app.loader.add('./assets/pack-result/texture.json').load(setup);
loader.onComplete.add(spritesLoaded);

function setup() {
  sheet = loader.resources['./assets/pack-result/texture.json'].spritesheet;
}

const style = new PIXI.TextStyle({
  fontFamily: 'Didact Gothic',
  fontSize: 64,
  fill: 'skyblue',
  stroke: '#000',
  strokeThickness: 1,
  dropShadow: true,
  dropShadowDistance: 3,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 5,
  dropShadowColor: '#000000',
});

const myText = new PIXI.Text('Guess Who?', style);
myText.x = window.innerWidth / 1.4;
myText.y = 50;
myText.interactive = true;
myText.buttonMode = true;
let isSet = false;
myText.on('pointerdown', () => {
  isSet = !isSet;
  myText.text = isSet ? 'Vem där?' : 'Guess who?';
});

app.stage.addChild(myText);

myText.style.wordWrap = true;
myText.style.wordWrapWidth = 400;
myText.style.align = 'center';

let imgIndex = 0;
function spritesLoaded() {
  const boxWidth = 120;
  const boxHeight = 150;
  const gap = 48;

  let textures;

  if (sheet) {
    textures = Object.values(sheet.textures);
  }
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 3; y++) {
      if (textures) {
        const texture = PIXI.Sprite.from(textures[imgIndex]);
        texture.interactive = true;
        texture.buttonMode = true;

        let isChecked = false;

        texture.position.x = x * boxWidth + x + 1 * gap;
        texture.position.y = y * boxHeight + y + 1 * gap;
        app.stage.addChild(texture);

        texture.on('click', () => {
          isChecked = !isChecked;
          texture.filters = isChecked
            ? [new PIXI.filters.BlurFilter(8, 10)]
            : (texture.filters = null);
        });
      }
      imgIndex++;
    }
  }
}
