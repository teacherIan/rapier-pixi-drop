import * as PIXI from 'pixi.js'

const sapphireStyle = new PIXI.TextStyle({
    align: "center",
    fill: [
        "#1271b5",
        "#000000"
    ],
    fontFamily: "\"Trebuchet MS\", Helvetica, sans-serif",
    fontStyle: "oblique",
    fontVariant: "small-caps",
    fontSize: 75,
    fontWeight: '900',
    letterSpacing: 0,
    padding: 46,
    stroke: "#1271b5",
    strokeThickness: 5,
    whiteSpace: "pre-line"
});
export const sapphireText = new PIXI.Text('Sapphire', sapphireStyle);


const rubyStyle = new PIXI.TextStyle({
    align: "center",
    fill: [
        "#c91313",
        "#000000"
    ],
    fontFamily: "\"Times New Roman\", Times, serif",
    fontSize: 75,
    // fontStyle: "oblique",
    fontVariant: "small-caps",
    fontWeight: '800',
    letterSpacing: 0,
    miterLimit: 1,
    stroke: "#7e2a2a",
    strokeThickness: 5,
    
});
export const rubyText = new PIXI.Text('Ruby', rubyStyle);


const amberStyle = new PIXI.TextStyle({
    align: "center",
    fill: [
        "#e46725",
        "#000000"
    ],
    fontFamily: "\"Times New Roman\", Times, serif",
    fontSize: 75,
    // fontStyle: "oblique",
    fontVariant: "small-caps",
    fontWeight: '800',
    letterSpacing: 0,
    miterLimit: 1,
    stroke: "#e46725",
    strokeThickness: 5,
    
});
export const amberText = new PIXI.Text('Amber', amberStyle);


const pearlStyle = new PIXI.TextStyle({
    align: "center",
    fill: [
        "#ffffff",
        "#000000"
    ],
    fontFamily: "\"Times New Roman\", Times, serif",
    fontSize: 75,
    // fontStyle: "oblique",
    fontVariant: "small-caps",
    fontWeight: '800',
    letterSpacing: 0,
    miterLimit: 1,
    stroke: "#000000",
    strokeThickness: 5,
    
});
export const pearlText = new PIXI.Text('Pearl', pearlStyle);


const counterStyle = new PIXI.TextStyle({
    align: "center",
    fill: [
        "#ffffff",
        "#ffffff"
    ],
    fontFamily: "\"Times New Roman\", Times, serif",
    fontSize: 150,
    fontStyle: "oblique",
    fontVariant: "small-caps",
    fontWeight: '800',
    letterSpacing: 2,
    miterLimit: 1,
    whiteSpace: "pre-line",
    
});

export const rubyCounter = new PIXI.Text('0', counterStyle);
export const amberCounter = new PIXI.Text('0', counterStyle);
export const pearlCounter = new PIXI.Text('0', counterStyle);
export const sapphireCounter = new PIXI.Text('0', counterStyle);

