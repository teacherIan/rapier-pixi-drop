import { Vector2, World } from "@dimforge/rapier2d-compat";
import { RAPIER } from "./core";

export const makeWall = (
  world: World,
  RAPIER: RAPIER,
  definition: WallDefinition
) => {
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.newStatic().setTranslation(
      definition.position.x,
      definition.position.y
    )
  );
  let colliderDesc = new RAPIER.ColliderDesc(
    new RAPIER.Cuboid(definition.size.x / 2, definition.size.y / 2)
  ).setTranslation(0, 0);
  const collider = world.createCollider(colliderDesc, body);
  collider.setCollisionGroups(0b00000000000111110000000000011111)

  return { body, collider, definition };
};

export const wallScreenArea = (
  world: World,
  RAPIER: RAPIER,
  thickness: number

) => {
  const walls = [];

  //left
  walls.push(
    makeWall(world, RAPIER, {
      angle: 0,
      size: { y: window.innerHeight * 5, x: thickness },
      position: { x: 0, y: window.innerHeight / 2 },
    })
  );

    //right
  walls.push(
    makeWall(world, RAPIER, {
      angle: 0,
      size: { y: window.innerHeight * 5, x: thickness },

      position: { x: window.innerWidth, y: window.innerHeight / 2 },
    })
  );

  //bottom
  walls.push(
    makeWall(world, RAPIER, {
      size: { y: thickness * 2, x: window.innerWidth },
      position: { x: window.innerWidth / 2, y: window.innerHeight },
      angle: 0,
    })
  );

    // create middle wall

    walls.push(
      makeWall(world, RAPIER, {
        size: { y: window.innerHeight * 5, x: thickness },
        position: { x: window.innerWidth / 2 - thickness / 2, y: window.innerHeight / 2 },
        angle: 0,
      })
    );

    // create wall between left and middle

    walls.push(
      makeWall(world, RAPIER, {
        size: { y: window.innerHeight * 5, x: thickness },
        position: { x: window.innerWidth / 4 - thickness / 2, y: window.innerHeight / 2 },
        angle: 0,
      })
    );

    // create wall between right and middle

    walls.push(
      makeWall(world, RAPIER, {
        size: { y: window.innerHeight * 5, x: thickness },
        position: { x: window.innerWidth / 4 * 3 - thickness / 2, y: window.innerHeight / 2 },
        angle: 0,
      })
    );

  return walls;
};

export interface WallDefinition {
  position: Vector2;
  size: Vector2;
  angle: number;
}

