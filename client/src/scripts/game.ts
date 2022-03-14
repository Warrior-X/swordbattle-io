import "phaser";
import GameScene from "./scenes/gameScene";
import PreloadScene from "./scenes/preloadScene";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 400 },
        },
    },
    scene: [PreloadScene, GameScene],
};

window.addEventListener("load", () => {
    const game = new Phaser.Game(config);
});

window.onerror = function(msg, url, lineNo, columnNo, error) {
    document.writeln('Message: ' + msg + "<br><br>");
    document.writeln('URL: ' + url + "<br><br>");
    document.writeln('Line: ' + lineNo + "<br><br>");
    document.writeln('Column: ' + columnNo + "<br><br>");
    document.writeln('Error object: ' + JSON.stringify(error));
};
