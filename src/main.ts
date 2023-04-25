import './style/global.css';
import * as PIXI from 'pixi.js';
import { Renderer } from './renderer';
export let { app, stage } = new Renderer();
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
import {
  buttonContainer,
  headerTimeLine,
  buttonLabel,
} from './draw/startHeadings';

//db
import { db } from './db/db';

import { collection, getDocs } from 'firebase/firestore';

let rubyMaxAmountDB = 0;
let amberMaxAmountDB = 0;
let pearlMaxAmountDB = 0;
let sapphireMaxAmountDB = 0;
let loaded = false;
let total = 0;

async function getData() {
  const querySnapshot = await getDocs(collection(db, 'points'));
  querySnapshot.forEach((doc) => {
    loaded = true;
    buttonLabel.text = 'Press Any Key To Start';

    if (doc.data().house === 'Ruby') {
      rubyMaxAmountDB += parseInt(doc.data().points);
    } else if (doc.data().house === 'Amber') {
      amberMaxAmountDB += parseInt(doc.data().points);
    } else if (doc.data().house === 'Pearl') {
      pearlMaxAmountDB += parseInt(doc.data().points);
    } else if (doc.data().house === 'Sapphire') {
      sapphireMaxAmountDB += parseInt(doc.data().points);
    }
    total += parseInt(doc.data().points);
  });
}

let gameSpeed = 400;
let circleSize = 7.5;
let gameSize = 0;
let confettiDropAmount = 100;

getData().then(() => {
  if (total < 500) {
    gameSpeed = 400;
    circleSize = 30;
    gameSize = 2;
    confettiDropAmount = 100;
  } else if (total > 500 && total < 1000) {
    gameSpeed = 400;
    circleSize = 20;
    gameSize = 2;
    confettiDropAmount = 100;
  } else if (total > 1000 && total < 2000) {
    gameSpeed = 400;
    circleSize = 14;
    gameSize = 3;
    confettiDropAmount = 100;
  } else if (total > 2000 && total < 5000) {
    gameSpeed = 400;
    circleSize = 10;
    gameSize = 4;
    confettiDropAmount = 100;
  } else if (total > 5000 && total < 10000) {
    gameSpeed = 400;
    circleSize = 8;
    gameSize = 4;
    confettiDropAmount = 100;
  } else if (total > 10000 && total < 15000) {
    gameSpeed = 300;
    circleSize = 7.5;
    gameSize = 5;
  } else {
    gameSpeed = 300;
    circleSize = 6;
    gameSize = 6;
  }
});

//register plugins
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

import { floatContainer } from './draw/float';

import music from '/music/space-120280.mp3';

let audio = new Audio(music);

export let startWallAnimation = false;
export let gameStarted = false;
export let stopSimulation = false;

let rubyBallsCreated = 0;
let amberBallsCreated = 0;
let pearlBallsCreated = 0;
let sapphireBallsCreated = 0;

let rubyMaxAmount = 0;
let amberMaxAmount = 0;
let pearlMaxAmount = 0;
let sapphireMaxAmount = 0;

//setup game speed and ball size based on amount of total

let dropsFinished = 0;

async function start() {
  // setup the renderer

  const container = new PIXI.Container();
  stage.addChild(container);
  let floatContainerVar = stage.addChild(floatContainer);
  floatContainerVar.cullable = true;

  // individual graphics for balls

  const { envBallGraphics, drawEnvBalls } = initEnvBallGraphics();

  container.addChild(envBallGraphics);

  //TEXT
  //Counters

  let rubyCounterText = stage.addChild(rubyCounter);
  rubyCounterText.x = window.innerWidth / 8;
  rubyCounterText.y = window.innerHeight;
  rubyCounterText.anchor.set(0.5, 0.5);
  rubyCounterText.alpha = 0;
  rubyCounterText.scale.set(0.2);

  let amberCounterText = stage.addChild(amberCounter);
  amberCounterText.x = window.innerWidth * (3 / 8);
  amberCounterText.y = window.innerHeight;
  amberCounterText.anchor.set(0.5, 0.5);
  amberCounterText.alpha = 0;
  amberCounterText.scale.set(0.2);

  let pearlCounterText = stage.addChild(pearlCounter);
  pearlCounterText.x = window.innerWidth * (5 / 8);
  pearlCounterText.y = window.innerHeight;
  pearlCounterText.anchor.set(0.5, 0.5);
  pearlCounterText.alpha = 0;
  pearlCounterText.scale.set(0.2);

  let sapphireCounterText = stage.addChild(sapphireCounter);
  sapphireCounterText.x = window.innerWidth - window.innerWidth / 8;
  sapphireCounterText.y = window.innerHeight;
  sapphireCounterText.anchor.set(0.5, 0.5);
  sapphireCounterText.alpha = 0;
  sapphireCounterText.scale.set(0.2);
  sapphireCounterText.zIndex = 100;

  //Sapphire
  let sapphireTextObject = stage.addChild(sapphireText);
  sapphireTextObject.x = window.innerWidth - window.innerWidth / 8;
  sapphireTextObject.y = -100;
  sapphireTextObject.anchor.set(0.5, 0.5);

  //Ruby
  let rubyTextObject = stage.addChild(rubyText);
  rubyTextObject.x = window.innerWidth / 8;
  rubyTextObject.y = -100;
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

  document.body.addEventListener('keydown', () => {
    if (loaded) {
      // start the game

      headerTimeLine.kill();
      audio.play();
      startWallAnimation = true;
      document.body.requestFullscreen();

      gsap
        .to(floatContainerVar, {
          pixi: { alpha: 0 },
          duration: 7,
        })
        .then(() => {
          floatContainerVar.destroy();
        });

      setTimeout(() => {
        // add walls to the physics world after window is fullscreen and updated
        walls = wallScreenArea(world, RAPIER, 5);
      }, 500);

      container.addChild(wallGraphics);

      buttonContainerObject.visible = false;

      // start dropping balls after 5 seconds
      setInterval(() => {
        gameStarted = true;
        rubyMaxAmount = rubyMaxAmountDB;
        amberMaxAmount = amberMaxAmountDB;
        pearlMaxAmount = pearlMaxAmountDB;
        sapphireMaxAmount = sapphireMaxAmountDB;
      }, 16250);

      gsap.to(sapphireCounterText, {
        pixi: { alpha: 1, scaleY: 2, scaleX: 1, y: window.innerHeight - 150 },
        duration: 25,
        delay: 25,
      });
      gsap.to(rubyCounterText, {
        pixi: { alpha: 1, scaleY: 2, scaleX: 1, y: window.innerHeight - 150 },
        duration: 25,
        delay: 25,
      });
      gsap.to(amberCounterText, {
        pixi: { alpha: 1, scaleY: 2, scaleX: 1, y: window.innerHeight - 150 },
        duration: 25,
        delay: 25,
      });
      gsap.to(pearlCounterText, {
        pixi: { alpha: 1, scaleY: 2, scaleX: 1, y: window.innerHeight - 150 },
        duration: 25,
        delay: 25,
      });

      const tl = gsap.timeline({ repeat: 0, delay: 7.5 });

      tl.to(rubyText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
      tl.to(amberText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
      tl.to(pearlText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });
      tl.to(sapphireText, { pixi: { y: 100 }, duration: 1.5, ease: 'bounce' });

      tl.to(rubyText, { pixi: { alpha: 0 }, duration: 3 });
      tl.to(amberText, { pixi: { alpha: 0 }, duration: 3 });
      tl.to(pearlText, { pixi: { alpha: 0 }, duration: 3 });
      tl.to(sapphireText, { pixi: { alpha: 0 }, duration: 3 });
      tl.then(() => {});
    }
  });

  // physics setup
  const physics = await initPhysics({ x: 0, y: 8 });
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
      case 5:
        localCircleSize = circleSize * 1.414 * 1.7;
        break;
      case 6:
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

    if (remainingPearlBalls >= 2 && gameSize > 1) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 2);
      pearlBallsCreated += 2;
      remainingPearlBalls -= 2;
    }

    if (remainingPearlBalls >= 4 && gameSize > 2) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 3);
      pearlBallsCreated += 4;
      remainingPearlBalls -= 4;
    }

    if (remainingPearlBalls >= 8 && gameSize > 3) {
      addBallToGameWorld('pearl', pearlCollisionGroup, 4);
      pearlBallsCreated += 8;
      remainingPearlBalls -= 8;
    }

    if (remainingPearlBalls >= 16 && gameSize > 4) {
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

    if (remainingAmberBalls >= 2 && gameSize > 1) {
      addBallToGameWorld('amber', amberCollisionGroup, 2);
      amberBallsCreated += 2;
      remainingAmberBalls -= 2;
    }

    if (remainingAmberBalls >= 4 && gameSize > 2) {
      addBallToGameWorld('amber', amberCollisionGroup, 3);
      amberBallsCreated += 4;
      remainingAmberBalls -= 4;
    }

    if (remainingAmberBalls >= 8 && gameSize > 3) {
      addBallToGameWorld('amber', amberCollisionGroup, 4);
      amberBallsCreated += 8;
      remainingAmberBalls -= 8;
    }

    if (remainingAmberBalls >= 16 && gameSize > 4) {
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

    if (remainingRubyBalls >= 2 && gameSize > 1) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 2);
      rubyBallsCreated += 2;
      remainingRubyBalls -= 2;
    }

    if (remainingRubyBalls >= 4 && gameSize > 2) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 3);
      rubyBallsCreated += 4;
      remainingRubyBalls -= 4;
    }

    if (remainingRubyBalls >= 8 && gameSize > 3) {
      addBallToGameWorld('ruby', rubyCollisionGroup, 4);
      rubyBallsCreated += 8;
      remainingRubyBalls -= 8;
    }

    if (remainingRubyBalls >= 16 && gameSize > 4) {
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

    if (remainingSapphireBalls >= 2 && gameSize > 1) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 2);
      sapphireBallsCreated += 2;
      remainingSapphireBalls -= 2;
    }

    if (remainingSapphireBalls >= 4 && gameSize > 2) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 3);
      sapphireBallsCreated += 4;
      remainingSapphireBalls -= 4;
    }

    if (remainingSapphireBalls >= 8 && gameSize > 3) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 4);
      sapphireBallsCreated += 8;
      remainingSapphireBalls -= 8;
    }

    if (remainingSapphireBalls >= 16 && gameSize > 4) {
      addBallToGameWorld('sapphire', sapphireCollisionGroup, 5);
      sapphireBallsCreated += 16;
      remainingSapphireBalls -= 16;
    }
  }, gameSpeed);

  //confetti

  let confettiContainer = new PIXI.Container();
  app.stage.addChild(confettiContainer);

  let characters = ['🥳', '🎉', '✨'];
  //turn characters into textures
  let textures = characters.map((c) => {
    const counterStyle = new PIXI.TextStyle({
      fontSize: 100,
    });

    const confettiIcon = new PIXI.Text(c, counterStyle);
    return app.renderer.generateTexture(confettiIcon);
  });

  let confettiAmount = confettiDropAmount;
  let confetti = new Array(confettiAmount)
    .fill(null)
    .map((_, i) => {
      return {
        character: characters[i % characters.length],
        x: Math.random() * window.innerWidth - 10,
        y: -200 - Math.random() * 1000,
        r: 0.1 + Math.random(),
      };
    })
    .sort((a, b) => a.r - b.r);

  for (let i = 0; i < confettiAmount; i++) {
    const confettiIconSprite = new PIXI.Sprite(textures[i % textures.length]);
    confettiIconSprite.x = confetti[i].x;
    confettiIconSprite.y = confetti[i].y;
    confettiIconSprite.zIndex = confetti[i].r;
    confettiIconSprite.scale.set(confetti[i].r);
    confettiIconSprite.cullable = true;

    confettiContainer.addChild(confettiIconSprite);
  }

  window.addEventListener('resize', () => {
    //resize confetti
    confettiContainer.children.forEach((child) => {
      child.x = Math.random() * window.innerWidth - 10;
    });

    //resize Text
    rubyCounterText.x = window.innerWidth / 8;
    rubyCounterText.y = window.innerHeight;

    amberCounterText.x = window.innerWidth * (3 / 8);
    amberCounterText.y = window.innerHeight;

    pearlCounterText.x = window.innerWidth * (5 / 8);
    pearlCounterText.y = window.innerHeight;

    sapphireCounterText.x = window.innerWidth - window.innerWidth / 8;
    sapphireCounterText.y = window.innerHeight;

    sapphireTextObject.x = window.innerWidth - window.innerWidth / 8;
    sapphireTextObject.y = -100;

    rubyTextObject.x = window.innerWidth / 8;
    rubyTextObject.y = -100;

    amberTextObject.x = window.innerWidth * (3 / 8);
    amberTextObject.y = -100;

    pearlTextObject.x = window.innerWidth * (5 / 8);
    pearlTextObject.y = -100;

    buttonLabel.anchor.set(0.5);

    floatContainer.children.forEach((child) => {
      child.x = Math.random() * window.innerWidth * 2;
      child.y = Math.random() * window.innerHeight * 2;
    });

    buttonContainer.x = window.innerWidth / 2;
    buttonContainer.y = window.innerHeight / 2;
    buttonLabel.x = 50;
    buttonLabel.y = 50;
  });

  app.ticker.add((delta) => {
    if (dropsFinished == 4) {
      stopSimulation = true;
      envBalls.forEach((ball) => {
        ball.definition.radius += 0.01;
      });

      confettiContainer.children.forEach((confettiIcon) => {
        confettiIcon.y += 0.1 * confettiIcon.zIndex * delta * 10;
        if (confettiIcon.y > window.innerHeight) confettiIcon.y = -100;
      });
    }

    amberCounterText.text = amberBallsCreated.toString();
    rubyCounterText.text = rubyBallsCreated.toString();
    sapphireCounterText.text = sapphireBallsCreated.toString();
    pearlCounterText.text = pearlBallsCreated.toString();

    const d = delta * 0.1;

    drawWalls(walls);

    drawEnvBalls(envBalls);

    step(d); // step physics
    app.render(); // pixi render
  });
}

start();
