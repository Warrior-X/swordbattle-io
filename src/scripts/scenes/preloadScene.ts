export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("player", "assets/img/player.png");
        this.load.image("bg", "assets/img/bg.png");
    }

    create() {
        this.scene.start("GameScene");
    }
}
