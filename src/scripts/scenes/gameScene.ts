import Player from "../actors/Player";

export default class GameScene extends Phaser.Scene {
    private player: Player;

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
        this.player = this.add.existing(new Player(this));

        this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    }

    update() {
        this.player.update();
    }
}
