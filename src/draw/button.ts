import * as PIXI from 'pixi.js';

let buttonContainer = new PIXI.Container();
// let button = new PIXI.Graphics();
// button.beginFill(0xffffff);
// button.drawRect(0, 0, 100, 100);
// button.endFill();
// buttonContainer.addChild(button);
buttonContainer.x = window.innerWidth / 2;
buttonContainer.y = window.innerHeight / 2;
buttonContainer.pivot.x = 50;
buttonContainer.pivot.y = 50;
// buttonContainer.eventMode = 'static';
// buttonContainer.cursor = 'pointer';

let buttonLabel = new PIXI.Text('Press Any Key To Start', {
  fontFamily: 'Arial',
  fontSize: 100,
  fill: 0xcccccc,
  align: 'center',
});

buttonLabel.x = 50;
buttonLabel.y = 50;

buttonLabel.anchor.x = 0.5;
buttonLabel.anchor.y = 0.5;

buttonContainer.addChild(buttonLabel);

export { buttonContainer };
