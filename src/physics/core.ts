import { Vector2 } from "@dimforge/rapier2d";
import { getRapier } from "../rapier";
import { gameStarted } from "../main";


export type RAPIER =
  //@ts-ignore
  typeof import("D:/gamedev-experiments/rapier-pixi-shooter/node_modules/@dimforge/rapier2d-compat/exports");

export const initPhysics = async (gravity: Vector2) => {
  const RAPIER = await getRapier();
  // Use the RAPIER module here.

  const world = new RAPIER.World(gravity);

  const step = (delta?: number) => {
    if (delta) {
      world.timestep = delta;
    }

    if(gameStarted) {
      world.step();
    }
    
  };

  return { RAPIER, step, world };
};
