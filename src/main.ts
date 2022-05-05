import * as PIXI from 'pixi.js';
import card from './assets/img/Character_card.png';

const graphics = new PIXI.Graphics();

var app = new PIXI.Application({
  antialias: true,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});
document.body.appendChild(app.view);

const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 48,
  fill: 'deepskyblue',
  stroke: '#ffffff',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000',
});

const myText = new PIXI.Text('Guess Who?!', style);
myText.x = window.innerWidth / 1.5;
myText.y = 50;
myText.interactive = true;
myText.buttonMode = true;
let isSet = false;
myText.on('pointerdown', () => {
  isSet = !isSet;
  myText.text = isSet ? 'tjena tjena' : 'Hello world';
});

app.stage.addChild(myText);

myText.style.wordWrap = true;
myText.style.wordWrapWidth = 400;
myText.style.align = 'center';

const boxWidth = 100;
const boxHeight = 120;
const gap = 48;
for (let x = 0; x < 6; x++) {
  for (let y = 0; y < 4; y++) {
    const texture = PIXI.Sprite.from(card);
    texture.interactive = true;
    texture.buttonMode = true;
    let isChecked = false;

    texture.position.x = x * boxWidth + x * gap;
    texture.position.y = y * boxHeight + y * gap;
    app.stage.addChild(texture);

    texture.on('click', () => {
      isChecked = !isChecked;
      texture.filters = isChecked
        ? (texture.filters = null)
        : [new PIXI.filters.BlurFilter()];
    });
  }
}
