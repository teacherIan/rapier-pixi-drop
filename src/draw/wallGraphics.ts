import { Collider, RigidBody } from '@dimforge/rapier2d-compat';
import { Graphics } from 'pixi.js';
import { WallDefinition } from '../physics/wallFactory';
import { WALL } from './_colorTheme';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';
import { startWallAnimation } from '../main';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

//start animation after button click

let animationStarted = false;

let value = {
  alpha: 0,
};

let animation = gsap.to(value, {
  delay: 5,
  alpha: 1,
  duration: 20,
  ease: 'power1.inOut',
});

animation.pause();

export const initWallGraphics = () => {
  const wallGraphics = new Graphics();
  console.log('From initWall');

  const drawWalls = (
    walls: {
      body: RigidBody;
      collider: Collider;
      definition: WallDefinition;
    }[]
  ) => {
    if (startWallAnimation && !animationStarted) {
      animationStarted = true;
      animation.play();
    }

    wallGraphics.clear();
    wallGraphics.beginFill(WALL.fill, value.alpha);

    wallGraphics.lineStyle({
      alpha: 0,
      color: 0xffffff,
      width: WALL.strokeWidth,
    });

    for (const wall of walls) {
      const { x, y } = wall.body.translation();
      const halfW = wall.collider.halfExtents().x;
      const halfH = wall.collider.halfExtents().y;
      wallGraphics.drawRect(
        x - halfW,
        y - halfH,
        wall.collider.halfExtents().x * 2,
        wall.collider.halfExtents().y * 2
      );
    }
    wallGraphics.endFill();
  };

  return { wallGraphics, drawWalls };
};
