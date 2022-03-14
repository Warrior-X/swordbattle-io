import Player from "../actors/Player";
import { config } from "../config";
import io, { Socket } from "socket.io-client";
import { ApiPlayer } from "../api/player";
import Enemy from "../actors/Enemy";
import { Vector } from "../api/vector";

export default class GameScene extends Phaser.Scene {
    private player: Player;
    private socket: Socket;
    private enemies: Phaser.GameObjects.Group;

    constructor(version: string) {
        super({ key: "GameScene" });
    }

    create() {
        this.setWorldBounds();
        this.addBg();
        this.addPlayer();
        this.showVersion();
        this.initEnemies();
        this.initSocket(config.serverLink);
    }

    update() {
        this.player.update(this.socket);
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

    private initEnemies() {
        this.enemies = this.add.group();
        this.enemies.runChildUpdate = true;
    }

    private initSocket(serverLink: string) {
        this.socket = io(serverLink);

        this.socket.on("connect", function () {
            console.log("Connected!");
        });

        this.socket.on("data", (id: string) => {
            this.onSocketData(id);
        });
    }

    private onSocketData(id: string) {
        this.player.setPlayerId(id);

        this.socket.on("playerJoined", (player: ApiPlayer) => {
            this.onPlayerJoin(player);
        });

        this.socket.on("playerMoved", (id: string, pos: Vector) => {
            this.onPlayerMoved(id, pos);
        });
    }

    private onPlayerJoin(player: ApiPlayer) {
        const sprite = this.add.existing(new Enemy(this, player));
        this.enemies.add(sprite);
    }

    private onPlayerMoved(id: string, pos: Vector) {
        for (const enemy of this.enemies.getChildren() as Enemy[]) {
            if (enemy.getPlayerId() === id) {
                enemy.moveTo(pos);
            }
        }
    }
}
