import './style/global.css';
import * as PIXI from 'pixi.js';
import { Renderer } from './renderer';
import { initPhysics } from './physics/core';
import { wallScreenArea } from './physics/wallFactory';
import { initWallGraphics } from './draw/wallGraphics';
import { BallDefinition, spawnRandomBall } from './physics/ballFactory';
import { initEnvBallGraphics } from './draw/envBallGraphics';
import { RigidBody, Collider } from '@dimforge/rapier2d-compat';
import {
  sapphireText,
  rubyText,
  amberText,
  pearlText,
  rubyCounter,
  amberCounter,
  pearlCounter,
  sapphireCounter,
} from './draw/text';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { buttonContainer } from './draw/button';
//register plugins
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export let gameStarted = false;

let rubyBallsCreated = 0;
let amberBallsCreated = 0;
let pearlBallsCreated = 0;
let sapphireBallsCreated = 0;

let rubyMaxAmount = 0;
let amberMaxAmount = 0;
let pearlMaxAmount = 0;
let sapphireMaxAmount = 0;
let circleSize = 7.5;
let gameSpeed = 400;

let dropsFinished = 0;

async function start() {
  // setup the renderer
  let { app, stage } = new Renderer();

  const container = new PIXI.Container();
  stage.addChild(container);

  // individual graphics for balls

  const { envBallGraphics, drawEnvBalls } = initEnvBallGraphics();

  container.addChild(envBallGraphics);

  //TEXT
  //Counters

  let rubyCounterText = stage.addChild(rubyCounter);
  rubyCounterText.x = window.innerWidth / 8;
  rubyCounterText.y = window.innerHeight - 200;
  rubyCounterText.anchor.set(0.5, 0.5);
  rubyCounterText.alpha = 0;
  rubyCounterText.scale.set(0);

  let amberCounterText = stage.addChild(amberCounter);
  amberCounterText.x = window.innerWidth * (3 / 8);
  amberCounterText.y = window.innerHeight - 200;
  amberCounterText.anchor.set(0.5, 0.5);
  amberCounterText.alpha = 0;
  amberCounterText.scale.set(0);

  let pearlCounterText = stage.addChild(pearlCounter);
  pearlCounterText.x = window.innerWidth * (5 / 8);
  pearlCounterText.y = window.innerHeight - 200;
  pearlCounterText.anchor.set(0.5, 0.5);
  pearlCounterText.alpha = 0;
  pearlCounterText.scale.set(0);

  let sapphireCounterText = stage.addChild(sapphireCounter);
  sapphireCounterText.x = window.innerWidth - window.innerWidth / 8;
  sapphireCounterText.y = window.innerHeight - 200;
  sapphireCounterText.anchor.set(0.5, 0.5);
  sapphireCounterText.alpha = 0;
  sapphireCounterText.scale.set(0);

  //Sapphire
  let sapphireTextObject = stage.addChild(sapphireText);
  sapphireTextObject.x = window.innerWidth - window.innerWidth / 8;
  sapphireTextObject.y = -100;
  sapphireTextObject.anchor.set(0.5, 0.5);

  //Ruby
  let rubyTextObject = stage.addChild(rubyText);
  rubyTextObject.x = window.innerWidth / 8;
  rubyTextObject.y = -200;
  rubyTextObject.anchor.set(0.5, 0.5);

  //Amber
  let amberTextObject = stage.addChild(amberText);
  amberTextObject.x = window.innerWidth * (3 / 8);
  amberTextObject.y = -100;
  amberTextObject.anchor.set(0.5, 0.5);

  //Pearl
  let pearlTextObject = stage.addChild(pearlText);
  pearlTextObject.x = window.innerWidth * (5 / 8);
  pearlTextObject.y = -100;
  pearlTextObject.anchor.set(0.5, 0.5);

  //start button
  let buttonContainerObject = stage.addChild(buttonContainer);

  // add walls to the physics world
  let walls = [];
  let { wallGraphics, drawWalls } = initWallGraphics();

  // starts visual off button press
  buttonContainerObject.on('pointerdown', () => {
    document.body.requestFullscreen();

    setTimeout(() => {
      // add walls to the physics world after window is fullscreen and updated
      walls = wallScreenArea(world, RAPIER, 5);
    }, 500);

    container.addChild(wallGraphics);

    buttonContainerObject.visible = false;

    // start dropping balls after 5 seconds
    setInterval(() => {
      gameStarted = true;
      rubyMaxAmount = 3422;
      amberMaxAmount = 3394;
      pearlMaxAmount = 3135;
      sapphireMaxAmount = 3479;
    }, 5000);

    gsap.to(sapphireCounterText, {
      pixi: { alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(rubyCounterText, {
      pixi: { alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(amberCounterText, {
      pixi: { alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(pearlCounterText, {
      pixi: { alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });

    const tl = gsap.timeline({ repeat: 0 });

    tl.to(rubyText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
    tl.to(amberText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
    tl.to(pearlText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
    tl.to(sapphireText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });

    const ltTwo = gsap.timeline({ repeat: 0, delay: 6 });

    ltTwo.to(rubyText, { pixi: { alpha: 0 }, duration: 3 });
    ltTwo.to(amberText, { pixi: { alpha: 0 }, duration: 3 });
    ltTwo.to(pearlText, { pixi: { alpha: 0 }, duration: 3 });
    ltTwo.to(sapphireText, { pixi: { alpha: 0 }, duration: 3 });
  });

  // physics setup

  const physics = await initPhysics({ x: 0, y: 10 });
  const { RAPIER, step, world } = physics;

  // add balls to the physics world
  const envBalls: {
    body: RigidBody;
    collider: Collider;
    definition: BallDefinition;
  }[] = [];

  // add balls to the physics world

  function addBallToGameWorld(
    houseInput: string,
    collisionGroup: number,
    ballSize: number
  ) {
    // pick good looking ball sizes
    let localCircleSize: number = 0;
    switch (ballSize) {
      case 1:
        localCircleSize = circleSize;
        break;
      case 2:
        localCircleSize = circleSize * 1.414;
        break;
      case 3:
        localCircleSize = circleSize * 1.414 * 1.3;
        break;
      case 4:
        localCircleSize = circleSize * 1.414 * 1.5;
        break;
      case 4:
        localCircleSize = circleSize * 1.414 * 1.7;
        break;
      case 5:
        localCircleSize = circleSize * 1.414 * 2;
    }

    const bouncyBall = spawnRandomBall(
      world,
      RAPIER,
      localCircleSize,
      houseInput
    );

    bouncyBall.collider.setCollisionGroups(collisionGroup);
    bouncyBall.collider.setRestitution(0.5);
    bouncyBall.collider.setFriction(0.9);
    envBalls.push(bouncyBall);
  }

  //create pearl balls
  let pearlInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }
    //pearl collision group
    let pearlCollisionGroup: number = 0b00000000000010000000000000001000;
    let remainingPearlBalls = pearlMaxAmount - pearlBallsCreated;

    if (remainingPearlBalls <= 0) {
      dropsFinished++;
      clearInterval(pearlInterval);
      return;
    }

    if (remainingPearlBalls >= 1) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 1);
      pearlBallsCreated++;
      remainingPearlBalls--;
    }

    if (remainingPearlBalls >= 2) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 2);
      pearlBallsCreated += 2;
      remainingPearlBalls -= 2;
    }

    if (remainingPearlBalls >= 4) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 3);
      pearlBallsCreated += 4;
      remainingPearlBalls -= 4;
    }

    if (remainingPearlBalls >= 8) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 4);
      pearlBallsCreated += 8;
      remainingPearlBalls -= 8;
    }

    if (remainingPearlBalls >= 16) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 5);
      pearlBallsCreated += 16;
      remainingPearlBalls -= 16;
    }
  }, gameSpeed);

  //create amber balls
  let amberInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    //amber collision group
    let amberCollisionGroup: number = 0b00000000000001000000000000000100;
    let remainingAmberBalls = amberMaxAmount - amberBallsCreated;

    if (amberBallsCreated >= amberMaxAmount) {
      dropsFinished++;
      clearInterval(amberInterval);
      return;
    }

    if (remainingAmberBalls >= 1) {
      addBallToGameWorld('amber', amberCollisionGroup, 1);
      amberBallsCreated++;
      remainingAmberBalls--;
    }

    if (remainingAmberBalls >= 2) {
      addBallToGameWorld('amber', amberCollisionGroup, 2);
      amberBallsCreated += 2;
      remainingAmberBalls -= 2;
    }

    if (remainingAmberBalls >= 4) {
      addBallToGameWorld('amber', amberCollisionGroup, 3);
      amberBallsCreated += 4;
      remainingAmberBalls -= 4;
    }

    if (remainingAmberBalls >= 8) {
      addBallToGameWorld('amber', amberCollisionGroup, 4);
      amberBallsCreated += 8;
      remainingAmberBalls -= 8;
    }

    if (remainingAmberBalls >= 16) {
      addBallToGameWorld('amber', amberCollisionGroup, 5);
      amberBallsCreated += 16;
      remainingAmberBalls -= 16;
    }
  }, gameSpeed);

  // create ruby balls
  let rubyInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    //ruby collision group
    let rubyCollisionGroup: number = 0b00000000000000100000000000000010;
    let remainingRubyBalls = rubyMaxAmount - rubyBallsCreated;

    if (rubyBallsCreated >= rubyMaxAmount) {
      dropsFinished++;
      clearInterval(rubyInterval);
      return;
    }

    if (remainingRubyBalls >= 1) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 1);
      rubyBallsCreated++;
      remainingRubyBalls--;
    }

    if (remainingRubyBalls >= 2) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 2);
      rubyBallsCreated += 2;
      remainingRubyBalls -= 2;
    }

    if (remainingRubyBalls >= 4) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 3);
      rubyBallsCreated += 4;
      remainingRubyBalls -= 4;
    }

    if (remainingRubyBalls >= 8) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 4);
      rubyBallsCreated += 8;
      remainingRubyBalls -= 8;
    }

    if (remainingRubyBalls >= 16) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 5);
      rubyBallsCreated += 16;
      remainingRubyBalls -= 16;
    }
  }, gameSpeed);

  //create sapphire balls
  let sapphireInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    //sapphire collision group
    let sapphireCollisionGroup: number = 0b00000000000000010000000000000001;
    let remainingSapphireBalls = sapphireMaxAmount - sapphireBallsCreated;

    if (sapphireBallsCreated >= sapphireMaxAmount) {
      dropsFinished++;
      clearInterval(sapphireInterval);
      return;
    }

    if (remainingSapphireBalls >= 1) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 1);
      sapphireBallsCreated++;
      remainingSapphireBalls--;
    }

    if (remainingSapphireBalls >= 2) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 2);
      sapphireBallsCreated += 2;
      remainingSapphireBalls -= 2;
    }

    if (remainingSapphireBalls >= 4) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 3);
      sapphireBallsCreated += 4;
      remainingSapphireBalls -= 4;
    }

    if (remainingSapphireBalls >= 8) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 4);
      sapphireBallsCreated += 8;
      remainingSapphireBalls -= 8;
    }

    if (remainingSapphireBalls >= 16) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 5);
      sapphireBallsCreated += 16;
      remainingSapphireBalls -= 16;
    }
  }, gameSpeed);

  //confetti

  let confettiContainer = new PIXI.Container();
  app.stage.addChild(confettiContainer);

  let characters = ['🥳', '🎉', '✨'];
  let confettiAmount = 50;
  let confetti = new Array(confettiAmount)
    .fill(0)
    .map((_, i) => {
      return {
        character: characters[i % characters.length],
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        r: 0.1 + Math.random() * 10,
      };
    })
    .sort((a, b) => a.r - b.r);

  for (let i = 0; i < confettiAmount; i++) {
    const counterStyle = new PIXI.TextStyle({
      fontSize: confetti[i].r * 10,
    });

    const confettiIcon = new PIXI.Text(confetti[i].character, counterStyle);
    confettiIcon.x = confetti[i].x;
    confettiIcon.y = 500;
    confettiIcon.zIndex = confetti[i].r;

    confettiContainer.addChild(confettiIcon);
    // app.stage.addChild(confettiIcon);
  }

  console.log(app.stage);

  // let confetti = new Array(50)
  //   .fill(0)
  //   .map((_, i) => {
  //     return {
  //       character: characters[i % characters.length],
  //       x: Math.random() * 100,
  //       y: -20 - Math.random() * 100,
  //       r: 0.1 + Math.random() * 1,
  //     };
  //   })
  //   .sort((a, b) => a.r - b.r);

  // let items = [];
  // confetti.forEach((item, index) => {
  //   let divItem = document.createElement('div');
  //   divItem.classList.add('confetti');
  //   divItem.style.left = item.x + '%';
  //   divItem.style.top = item.y + '%';
  //   divItem.style.transform = `scale(${item.r})`;
  //   divItem.innerHTML = item.character;
  //   container.appendChild(divItem);
  //   items.push(divItem);
  // });

  // function loop() {
  //   requestAnimationFrame(loop);
  //   if (dropsFinished == 4) {
  //     setTimeout(() => {
  //       confetti = confetti.map((emoji) => {
  //         emoji.y += 0.7 * emoji.r;
  //         if (emoji.y > 120) emoji.y = -20;
  //         return emoji;
  //       });

  //       items.forEach((divItem, index) => {
  //         divItem.style.left = confetti[index].x + '%';
  //         divItem.style.top = confetti[index].y + '%';
  //         divItem.style.transform = `scale(${confetti[index].r})`;
  //       });
  //     }, 3000);
  //   }
  // }

  app.ticker.add((delta) => {
    amberCounterText.text = amberBallsCreated.toString();
    rubyCounterText.text = rubyBallsCreated.toString();
    sapphireCounterText.text = sapphireBallsCreated.toString();
    pearlCounterText.text = pearlBallsCreated.toString();

    confettiContainer.children.forEach((confettiIcon) => {
      confettiIcon.y += 0.7;
      if (confettiIcon.y > window.innerHeight) confettiIcon.y = -20;
    });

    const d = delta * 0.1;

    drawWalls(walls);

    drawEnvBalls(envBalls);

    step(d); // step physics
    app.render(); // pixi render
  });
}

start();
