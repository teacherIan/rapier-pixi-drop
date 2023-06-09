import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { app, stage } from '.././main';
export let floatContainer = new PIXI.Container();
import { startWallAnimation } from '.././main';

//wait until app and stage are loaded. Then add floatContainer to stage

let particleSettings;
let particleCount = 1000;
let particleColors = ['c11c22', 'e46725', '1271b5', 'ffffff'];

setTimeout(() => {
  floatContainer.width = window.innerWidth;

  function setUp() {
    for (let i = 0; i < particleCount; i++) {
      particleSettings = {
        particleSize: 100,
        x: Math.floor(Math.random() * window.innerWidth * 2),
        y: Math.floor(Math.random() * window.innerHeight * 2),
        scale: Math.random() + 0.2,
        alpha: Math.random() * 1,
        particleSpeed: Math.floor(Math.min(200, Math.random() * 10000)),
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
      };
      createParticle(particleSettings);
    }
  }

  setUp();

  window.addEventListener('resize', () => {
    if (!startWallAnimation) {
      floatContainer.removeChildren();
      setUp();
    }
  });

  function createParticle(particleSettings) {
    // GRAPHIC
    let graphic = new PIXI.Graphics(); // create graphic
    graphic.beginFill('0x' + particleSettings.color);
    graphic.drawCircle(0, 0, particleSettings.particleSize); // (x, y, radius) // gets scaled as a sprite later

    graphic.endFill();

    // SPRITE

    let texture = app.renderer.generateTexture(graphic);
    let sprite = new PIXI.Sprite(texture);
    sprite.cullable = true;
    sprite.x = Math.random() * window.innerWidth * 2 - window.innerWidth / 2;
    sprite.y = Math.random() * window.innerHeight * 2 - window.innerHeight / 2;
    sprite.alpha = 0;

    // SET POSITIONING
    gsap.to(sprite, {
      pixi: {
        x: particleSettings.x,
        y: particleSettings.y,
        scale: particleSettings.scale,
        alpha: particleSettings.alpha,
      },
      duration: 20,
    });
    gsap.to(sprite, {
      pixi: {
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
      },
      duration: particleSettings.particleSpeed,
      onComplete: function () {
        console.log('Function called');
        animate(sprite, particleSettings);
      },
    });

    //use graphic instead of sprite if this does not work
    floatContainer.addChild(sprite);

    // app.stage.addChild(particleSprite);
  }

  function animate(object, settings) {
    gsap.to(object, {
      pixi: {
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
      },
      duration: settings.particleSpeed,
    });
  }
}, 200);
