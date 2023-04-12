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
let gameSpeed = 300;

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
      pixi: { text: 3497, alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(rubyCounterText, {
      pixi: { text: 3436, alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(amberCounterText, {
      pixi: { text: 3403, alpha: 1, scaleY: 2, scaleX: 1 },
      duration: 25,
      snap: { text: 1 },
      delay: 15,
    });
    gsap.to(pearlCounterText, {
      pixi: { text: 3156, alpha: 1, scaleY: 2, scaleX: 1 },
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

  //create pearl balls

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
        localCircleSize = 20;
    }

    const bouncyBall = spawnRandomBall(world, RAPIER, circleSize, houseInput);
    envBalls.push(bouncyBall);
  }

  let pearlInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    const bouncyBall = spawnRandomBall(world, RAPIER, circleSize, 'pearl');
    pearlBallsCreated++;
    if (pearlBallsCreated >= pearlMaxAmount) {
      clearInterval(pearlInterval);
      return;
    }

    const bouncyBallLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414,
      'pearl'
    );
    pearlBallsCreated += 2;
    if (pearlBallsCreated >= pearlMaxAmount) {
      clearInterval(pearlInterval);
      return;
    }

    const bouncyBallExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.3,
      'pearl'
    );
    pearlBallsCreated += 4;
    if (pearlBallsCreated >= pearlMaxAmount) {
      clearInterval(pearlInterval);
      return;
    }

    const bouncyBallExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.5,
      'pearl'
    );
    pearlBallsCreated += 8;
    if (pearlBallsCreated >= pearlMaxAmount) {
      clearInterval(pearlInterval);
      return;
    }

    const bouncyBallExtraExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.7,
      'pearl'
    );
    pearlBallsCreated += 16;
    if (pearlBallsCreated >= pearlMaxAmount) {
      clearInterval(pearlInterval);
      return;
    }

    bouncyBall?.collider.setRestitution(0.5);
    bouncyBall?.collider.setCollisionGroups(0b00000000000010000000000000001000);
    bouncyBallLarge?.collider.setRestitution(0.5);
    bouncyBallLarge?.collider.setCollisionGroups(
      0b00000000000010000000000000001000
    );
    bouncyBallExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraLarge?.collider.setCollisionGroups(
      0b00000000000010000000000000001000
    );
    bouncyBallExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000010000000000000001000
    );
    bouncyBallExtraExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000010000000000000001000
    );

    envBalls.push(bouncyBall);
    envBalls.push(bouncyBallLarge);
    envBalls.push(bouncyBallExtraLarge);
    envBalls.push(bouncyBallExtraExtraLarge);
    envBalls.push(bouncyBallExtraExtraExtraLarge);
  }, gameSpeed);

  //create amber balls
  let amberInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    const bouncyBall = spawnRandomBall(world, RAPIER, circleSize, 'amber');
    amberBallsCreated++;
    if (amberBallsCreated >= amberMaxAmount) {
      clearInterval(amberInterval);
      return;
    }

    const bouncyBallLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414,
      'amber'
    );
    amberBallsCreated += 2;
    if (amberBallsCreated >= amberMaxAmount) {
      clearInterval(amberInterval);
      return;
    }

    const bouncyBallExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.3,
      'amber'
    );
    amberBallsCreated += 4;
    if (amberBallsCreated >= amberMaxAmount) {
      clearInterval(amberInterval);
      return;
    }

    const bouncyBallExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.5,
      'amber'
    );
    amberBallsCreated += 8;
    if (amberBallsCreated >= amberMaxAmount) {
      clearInterval(amberInterval);
      return;
    }

    const bouncyBallExtraExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.7,
      'amber'
    );
    amberBallsCreated += 16;
    if (amberBallsCreated >= amberMaxAmount) {
      clearInterval(amberInterval);
      return;
    }

    bouncyBall?.collider.setRestitution(0.5);
    bouncyBall?.collider.setCollisionGroups(0b00000000000001000000000000000100);
    bouncyBall?.collider.setFriction(0.5);
    bouncyBallLarge?.collider.setRestitution(0.5);
    bouncyBallLarge?.collider.setCollisionGroups(
      0b00000000000001000000000000000100
    );
    bouncyBallLarge?.collider.setFriction(0.5);
    bouncyBallExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraLarge?.collider.setCollisionGroups(
      0b00000000000001000000000000000100
    );
    bouncyBallExtraLarge?.collider.setFriction(0.5);
    bouncyBallExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000001000000000000000100
    );
    bouncyBallExtraExtraLarge?.collider.setFriction(0.5);
    bouncyBallExtraExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000001000000000000000100
    );
    envBalls.push(bouncyBallLarge!);
    envBalls.push(bouncyBall!);
    envBalls.push(bouncyBallExtraLarge!);
    envBalls.push(bouncyBallExtraExtraLarge!);
    envBalls.push(bouncyBallExtraExtraExtraLarge!);
  }, gameSpeed);

  // create ruby balls
  let rubyInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    const bouncyBall = spawnRandomBall(world, RAPIER, circleSize, 'ruby');
    rubyBallsCreated++;
    if (sapphireBallsCreated >= rubyMaxAmount) {
      clearInterval(rubyInterval);
      return;
    }

    const bouncyBallLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414,
      'ruby'
    );
    rubyBallsCreated += 2;
    if (rubyBallsCreated >= rubyMaxAmount) {
      clearInterval(rubyInterval);
      return;
    }

    const bouncyBallExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.3,
      'ruby'
    );
    rubyBallsCreated += 4;
    if (rubyBallsCreated >= rubyMaxAmount) {
      clearInterval(rubyInterval);
      return;
    }

    const bouncyBallExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.5,
      'ruby'
    );
    rubyBallsCreated += 8;
    if (rubyBallsCreated >= rubyMaxAmount) {
      clearInterval(rubyInterval);
      return;
    }

    const bouncyBallExtraExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.7,
      'ruby'
    );
    rubyBallsCreated += 16;
    if (rubyBallsCreated >= rubyMaxAmount) {
      clearInterval(rubyInterval);
      return;
    }

    bouncyBall?.collider.setRestitution(0.5);
    bouncyBall?.collider.setCollisionGroups(0b00000000000000100000000000000010);
    bouncyBall?.collider.setFriction(0.5);
    bouncyBallLarge?.collider.setRestitution(0.5);
    bouncyBallLarge?.collider.setCollisionGroups(
      0b00000000000000100000000000000010
    );
    bouncyBallLarge?.collider.setFriction(0.5);
    bouncyBallExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraLarge?.collider.setCollisionGroups(
      0b00000000000000100000000000000010
    );
    bouncyBallExtraLarge?.collider.setFriction(0.5);
    bouncyBallExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000000100000000000000010
    );
    bouncyBallExtraExtraLarge?.collider.setFriction(0.5);
    bouncyBallExtraExtraExtraLarge?.collider.setRestitution(0.5);
    bouncyBallExtraExtraExtraLarge?.collider.setCollisionGroups(
      0b00000000000000100000000000000010
    );
    envBalls.push(bouncyBallLarge!);
    envBalls.push(bouncyBall!);
    envBalls.push(bouncyBallExtraLarge!);
    envBalls.push(bouncyBallExtraExtraLarge!);
    envBalls.push(bouncyBallExtraExtraExtraLarge!);
  }, gameSpeed);

  //create sapphire balls
  let sapphireInterval = setInterval(() => {
    if (!gameStarted) {
      return;
    }

    const bouncyBall = spawnRandomBall(world, RAPIER, circleSize, 'sapphire');
    sapphireBallsCreated++;
    if (sapphireBallsCreated >= sapphireMaxAmount) {
      clearInterval(sapphireInterval);
      return;
    }

    const bouncyBallLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414,
      'sapphire'
    );
    sapphireBallsCreated += 2;
    if (sapphireBallsCreated >= sapphireMaxAmount) {
      clearInterval(sapphireInterval);
      return;
    }

    const bouncyBallExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.3,
      'sapphire'
    );
    sapphireBallsCreated += 4;
    if (sapphireBallsCreated >= sapphireMaxAmount) {
      clearInterval(sapphireInterval);
      return;
    }

    const bouncyBallExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.5,
      'sapphire'
    );
    sapphireBallsCreated += 8;
    if (sapphireBallsCreated >= sapphireMaxAmount) {
      clearInterval(sapphireInterval);
      return;
    }

    const bouncyBallExtraExtraExtraLarge = spawnRandomBall(
      world,
      RAPIER,
      circleSize * 1.414 * 1.7,
      'sapphire'
    );
    sapphireBallsCreated += 16;
    if (sapphireBallsCreated >= sapphireMaxAmount) {
      clearInterval(sapphireInterval);
      return;
    }

    bouncyBall.collider.setCollisionGroups(0b00000000000000010000000000000001);
    bouncyBall.collider.setRestitution(0.5);
    bouncyBallLarge.collider.setRestitution(0.5);
    bouncyBallLarge.collider.setCollisionGroups(
      0b00000000000000010000000000000001
    );

    bouncyBallExtraLarge.collider.setRestitution(0.5);
    bouncyBallExtraLarge.collider.setCollisionGroups(
      0b00000000000000010000000000000001
    );
    bouncyBallExtraExtraLarge.collider.setRestitution(0.5);
    bouncyBallExtraExtraLarge.collider.setCollisionGroups(
      0b00000000000000010000000000000001
    );
    bouncyBallExtraExtraExtraLarge.collider.setCollisionGroups(
      0b00000000000000010000000000000001
    );
    envBalls.push(bouncyBallLarge);
    envBalls.push(bouncyBall);
    envBalls.push(bouncyBallExtraLarge);
    envBalls.push(bouncyBallExtraExtraLarge);
    envBalls.push(bouncyBallExtraExtraExtraLarge);
  }, gameSpeed);

  app.ticker.add((delta) => {
    const d = delta * 0.1;

    drawWalls(walls);
    // drawEnvBalls(envBalls,'sapphire');

    drawEnvBalls(envBalls, 'ruby');
    // drawEnvBalls(sapphireBalls,'sapphire');

    step(d); // step physics
    app.render(); // pixi render
  });
}

start();
