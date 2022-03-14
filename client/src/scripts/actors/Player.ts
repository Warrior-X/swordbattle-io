import { Socket } from "socket.io-client";
import { ApiPlayer } from "api/player";
import Actor from "./Actor";

type Movement = {
    up: Phaser.Input.Keyboard.Key | null;
    down: Phaser.Input.Keyboard.Key | null;
    left: Phaser.Input.Keyboard.Key | null;
    right: Phaser.Input.Keyboard.Key | null;
};

export default class Player extends Actor {
    private player = new ApiPlayer();
    private speed = 250;

    private movement: Movement = {
        up: null,
        down: null,
        left: null,
        right: null,
    };

    constructor(scene: Phaser.Scene) {
        super(scene, 500, 500, "player");

        this.scale = 0.3;

        this.movement.up = scene.input.keyboard.addKey("W");
        this.movement.down = scene.input.keyboard.addKey("R");
        this.movement.left = scene.input.keyboard.addKey("A");
        this.movement.right = scene.input.keyboard.addKey("S");
    }

    update(socket: Socket): void {
        (this.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);

        if (this.movement["up"] && this.movement["up"].isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-this.speed);
        }
        if (this.movement["down"] && this.movement["down"].isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(this.speed);
        }
        if (this.movement["left"] && this.movement["left"].isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.speed);
        }
        if (this.movement["right"] && this.movement["right"].isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this.speed);
        }

        const position = (this.body as Phaser.Physics.Arcade.Body).position;

        if (
            this.player.pos.x != position.x ||
            this.player.pos.y != position.y
        ) {
            this.player.pos.setPosition(position.x, position.y);

            if (this.player.id) {
                socket.emit("playerMoved", this.player.id, this.player.pos);
            }
        }
    }

    public setPlayerId(id: string) {
        this.player.id = id;
    }
}
