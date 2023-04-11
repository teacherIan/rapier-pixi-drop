import * as PIXI from "pixi.js";

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
      autoDensity: false,
      premultipliedAlpha: false,
      backgroundAlpha: 0,
      preserveDrawingBuffer: false,
      forceCanvas: false,
      powerPreference: "high-performance",
      
      
    });
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.app.view as any);
    // this.app.view.id = "pixi-view";

    this.stage = this.app.stage;

    this.resize();
  }

  private resize() {
    // resize canvas and webgl renderer when window sizeChanges
    window.addEventListener("resize", () => {
      this.app.view.width = window.innerWidth;
      this.app.view.height = window.innerHeight;
    });
  }
}
