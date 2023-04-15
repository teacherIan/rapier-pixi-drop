import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

export let floatContainer = new PIXI.Container();
floatContainer.width = window.innerWidth;

let particleCount = 250;
let particleColors = [
  '26a3ff',
  '13ce66',
  'ff49db',
  'af8dd1',
  '9162bf',
  'ff7849',
  'ffc82c',
];
let particleSettings;

for (let i = 0; i < particleCount; i++) {
  particleSettings = {
    particleSize: 70,
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight),
    scale: Math.floor(Math.random() * 5) / 3,
    alpha: Math.random() / 2,
    particleSpeed: Math.floor(Math.min(200, Math.random() * 10000)),
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
  };
  createParticle(particleSettings);
}

function createParticle(particleSettings) {
  // GRAPHIC
  let graphic = new PIXI.Graphics(); // create graphic
  graphic.beginFill('0x' + particleSettings.color);
  graphic.drawCircle(0, 0, particleSettings.particleSize); // (x, y, radius) // gets scaled as a sprite later
  graphic.endFill();
  graphic.x = Math.random() * window.innerWidth * 2 - window.innerWidth / 2;
  graphic.y = Math.random() * window.innerHeight * 2 - window.innerHeight / 2;
  // graphic.scale = particleSettings.scale;
  // graphic.alpha = particleSettings.scale;

  // SET POSITIONING
  gsap.to(graphic, {
    pixi: {
      x: particleSettings.x,
      y: particleSettings.y,
      scale: particleSettings.scale,
      alpha: particleSettings.alpha,
    },
    duration: 20,
  });
  gsap.to(graphic, {
    pixi: {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
    },
    duration: particleSettings.particleSpeed,
    onComplete: function () {
      console.log('Function called');
      animate(graphic, particleSettings);
    },
  });

  floatContainer.addChild(graphic);

  // app.stage.addChild(particleSprite);
}

function animate(object, settings) {
  gsap.to(object, {
    pixi: {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
    },
    duration: settings.particleSpeed,
    onComplete: function () {
      console.log('Function called');
    },
  });
}
