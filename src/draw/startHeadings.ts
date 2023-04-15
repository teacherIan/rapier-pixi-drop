import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

let buttonContainer = new PIXI.Container();

buttonContainer.x = window.innerWidth / 2;
buttonContainer.y = window.innerHeight / 2;
buttonContainer.pivot.x = 50;
buttonContainer.pivot.y = 50;

let buttonLabel = new PIXI.Text('Press Any Key To Start', {
  fill: '#ffffff',
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 170,
  // fontStyle: 'oblique',
  fontVariant: 'small-caps',
  fontWeight: '800',
  letterSpacing: 1,
  miterLimit: 1,
  stroke: '#943d3d',
  strokeThickness: 5,
  textBaseline: 'alphabetic',
  dropShadow: true,
  dropShadowBlur: 20,
  dropShadowColor: '#d4d4d4',

  // whiteSpace: 'pre-line',
});

buttonLabel.x = 50;
buttonLabel.y = 50;
buttonLabel.scale.y = 1.3;
buttonLabel.scale.x = 0.8;

buttonLabel.anchor.x = 0.5;
buttonLabel.anchor.y = 0.5;

buttonContainer.addChild(buttonLabel);

export let headerTimeLine = gsap
  .timeline({ repeat: -1 })
  .to(buttonLabel, {
    duration: 3,
    pixi: {
      alpha: 0.0,
    },
  })
  .to(buttonLabel, {
    duration: 3,
    pixi: {
      alpha: 1,
    },
  });

export { buttonContainer };
