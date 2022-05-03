import * as pixi from 'pixi.js';

var app = new pixi.Application({
  antialias: true,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});
document.body.appendChild(app.view);

const gr = new pixi.Graphics();
gr.beginFill(0xffffff);
gr.drawCircle(40, 40, 30);
gr.endFill();
app.stage.addChild(gr);
