import { Collider, RigidBody } from "@dimforge/rapier2d-compat";
import { Graphics } from "pixi.js";
import { BallDefinition } from "../physics/ballFactory";
import { ENV_BALL } from "./_colorTheme";

export const initEnvBallGraphics = () => {
  const envBallGraphics = new Graphics();
  
  const drawEnvBalls = (
    balls: {
      body: RigidBody;
      collider: Collider;
      definition: BallDefinition;
      
    }[],color: string
  ) => {
    envBallGraphics.clear();

    for (const ball of balls) {
      const { x, y } = ball.body.translation();
      if(x < window.innerWidth / 4) {
        envBallGraphics.beginFill(0x9b1b30, ENV_BALL.alpha);
      }
      else if(x > window.innerWidth / 4 && x < window.innerWidth / 2) {
        envBallGraphics.beginFill(0xe46725, ENV_BALL.alpha);
      }
      else if(x > window.innerWidth / 2 && x < window.innerWidth * .75) {
        envBallGraphics.beginFill(0x000000, ENV_BALL.alpha);
      }
      else {
        envBallGraphics.beginFill(0x1271b5, ENV_BALL.alpha);
      }

      const radius = ball.definition.radius
      envBallGraphics.drawCircle(x, y, radius);
    }
    envBallGraphics.endFill();
  };

  return { envBallGraphics, drawEnvBalls };
};
