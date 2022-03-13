import Player from "../actors/Player";
import { config } from "../config";
import io, { Socket } from "socket.io-client";

export default class GameScene extends Phaser.Scene {
    private player: Player;
    private socket: Socket;

    constructor(version: string) {
        super({ key: "GameScene" });
    }

    create() {
        this.setWorldBounds();
        this.addBg();
        this.addPlayer();
        this.showVersion();

        this.socket = io(config.serverLink);

        this.socket.on("connect", function () {
            console.log("Connected!");
        });
    }

    update() {
        this.player.update();
    }

    private setWorldBounds() {
        const mapTotalSize = config.mapSize * config.tileSize;
        this.cameras.main.setBounds(0, 0, mapTotalSize, mapTotalSize);
        this.physics.world.setBounds(0, 0, mapTotalSize, mapTotalSize);
    }

    private addBg() {
        for (let x = 0; x < config.mapSize; x++) {
            for (let y = 0; y < config.mapSize; y++) {
                let image = this.add
                    .image(x * config.tileSize, y * config.tileSize, "bg")
                    .setOrigin(0, 0);
                image.displayWidth = config.tileSize;
                image.displayHeight = config.tileSize;
            }
        }
    }

    private addPlayer() {
        this.player = new Player(this);
        this.add.existing(this.player);
        let physicsPlayer = this.physics.add.existing(this.player);
        let physicsBody = physicsPlayer.body as Phaser.Physics.Arcade.Body;

        physicsBody.setCollideWorldBounds(true);
        physicsBody.setAllowGravity(false);

        this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
    }

    private showVersion() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        this.add
            .text(
                screenWidth - 15,
                screenHeight - 15,
                `Swordbattle.io v${config.version}`,
                config.gameTextStyle,
            )
            .setOrigin(1, 1)
            .setScrollFactor(0);
    }
}
