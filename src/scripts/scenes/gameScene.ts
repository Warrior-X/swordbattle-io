export default class GameScene extends Phaser.Scene {
    constructor(version: string) {
        super({ key: "GameScene" });
    }

    create() {
        this.add
            .text(this.cameras.main.width - 15, 15, `Swordbattle.io v0.1.0`, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);
    }

    update() {}
}
