import Player from "../actors/Player";
import { config } from "../config";
import io, {Socket} from 'socket.io-client';

export default class GameScene extends Phaser.Scene {
    private player: Player;
    private socket: Socket;

    constructor(version: string) {
        super({ key: "GameScene" });
    }

    create() {
        const mapTotalSize = config.mapSize * config.tileSize;
        this.cameras.main.setBounds(0, 0, mapTotalSize, mapTotalSize);
        this.physics.world.setBounds(0, 0, mapTotalSize, mapTotalSize);

        for (let x = 0; x < config.mapSize; x++) {
            for (let y = 0; y < config.mapSize; y++) {
                let image = this.add.image(x*config.tileSize, y*config.tileSize, "bg").setOrigin(0, 0);
                image.displayWidth = config.tileSize;
                image.displayHeight = config.tileSize;
            }
        }

        this.add
            .text(this.cameras.main.width - 15, 15, `Swordbattle.io v0.1.0`, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0)
            .setScrollFactor(0);
            
        this.player = new Player(this);
        let aPlayer = this.add.existing(this.player);
        let physicsPlayer = this.physics.add.existing(this.player);

        (physicsPlayer.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        (physicsPlayer.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        this.cameras.main.startFollow(this.player, true, 0.2, 0.2);

        this.socket = io("https://5000-warriorx-swordbattleio-wg76yx9a0ut.ws-us34.gitpod.io"); // I'm developing this in GitPod
        this.socket.on('connect', function () {
        	console.log('Connected!');
        });
    }

    update() {
        this.player.update();
    }
}
