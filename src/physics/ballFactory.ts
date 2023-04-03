import { Vector2, World } from "@dimforge/rapier2d-compat";
import { RAPIER } from "./core";

let amount = 0

export const makeBall = (
  world: World,
  RAPIER: RAPIER,
  definition: BallDefinition
) => {
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.newDynamic().setTranslation(
      definition.position.x,
      definition.position.y
    )
  );

  // let num = Math.floor(Math.random() * 5)
  let colliderDesc = new RAPIER.ColliderDesc(new RAPIER.Ball(definition.radius))
    .setTranslation(0, 0)
    .setRestitution(0.5)

  const collider = world.createCollider(colliderDesc, body);
  
  
  setInterval(() => {
    //made object static after 10 seconds
    body.setBodyType(1,true)

  }, 10000)
  


  return { body, collider, definition };
};

export const spawnRandomBall = (
  world: World,
  RAPIER: RAPIER,
  maxRadius?: number,
  house?: string
) => {
  if (!maxRadius) {
    maxRadius = Math.random();
  }

  //sapphire balls
  const sapphireDefinition: BallDefinition = {
    position: {
      x: (window.innerWidth - window.innerWidth / 5) + (0.05 + Math.random() * 0.8) * window.innerWidth / 5,
      y:  -1000 - amount * 10
    },
    radius: maxRadius,
  };

  const rubyDefinition: BallDefinition = {
    position: {
      x: (window.innerWidth / 8 * Math.random()) + 3 ,
      y:  -1000 - amount * 10
    },
    radius: maxRadius,
  };

  const amberDefinition: BallDefinition = {
    position: {
      x: (window.innerWidth / 4 + window.innerWidth / 10  * Math.random()),
      y:  -1000 - amount * 10
    },
    radius: maxRadius,
  };

  const pearlDefinition: BallDefinition = {
    position: {
      x: window.innerWidth * 0.55 + Math.random() * window.innerWidth * .10 ,
      y:  -1000 - amount * 10
    },
    radius: maxRadius,
  };

  if(house === 'pearl') {
    return makeBall(world, RAPIER, pearlDefinition);
  }

  if(house === 'sapphire') {
    return makeBall(world, RAPIER, sapphireDefinition);
  }

  if(house === 'ruby') {
    return makeBall(world, RAPIER, rubyDefinition);
  }

  if(house === 'amber') {
    return makeBall(world, RAPIER, amberDefinition);
  }




  // return makeBall(world, RAPIER, definition);
  
  
};

export interface BallDefinition {
  position: Vector2;
  radius: number;
}
