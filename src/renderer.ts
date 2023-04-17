import * as PIXI from 'pixi.js';

export class Renderer {
  app: PIXI.Application;
  stage: PIXI.Container;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      resolution: 1,
      antialias: false,
      autoDensity: true,
      premultipliedAlpha: true,
      backgroundAlpha: 1,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      resizeTo: window,
    });
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.app.view as any);

    this.stage = this.app.stage;
  }
}
