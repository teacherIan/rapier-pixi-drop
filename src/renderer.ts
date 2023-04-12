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
      antialias: true,
      autoDensity: true,
      premultipliedAlpha: false,
      backgroundAlpha: 1,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
      resizeTo: window,
      
    });
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.app.view as any);
    // this.app.view.id = "pixi-view";
    
    this.stage = this.app.stage;

    

    // this.resize();

    window.addEventListener('resize', () => {
      
      console.log("Resized")
        // this.app.view.width = window.innerWidth;
        // this.app.view.height = 500;


        // this.app.resizeTo
        
    });
  }

  // public resize() {
  //   // resize canvas and webgl renderer when window sizeChanges
    
  //   this.app.view.height = window.innerHeight
  //   this.app.resizeTo = window

  // }
}
