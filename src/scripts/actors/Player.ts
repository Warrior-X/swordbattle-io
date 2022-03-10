import { ApiPlayer } from "../api/player";
import Actor from "./Actor";

type Movement = {
    "up": Phaser.Input.Keyboard.Key | null;
    "down": Phaser.Input.Keyboard.Key | null;
    "left": Phaser.Input.Keyboard.Key | null;
    "right": Phaser.Input.Keyboard.Key | null;
}

export default class Player extends Actor {
    private player = new ApiPlayer();
    private movement: Movement = {"up": null, "down": null, "left": null, "right": null};

    constructor(scene: Phaser.Scene) {
        super(scene, 200, 200, "player");

        this.scale = 0.3;

        this.movement.up = scene.input.keyboard.addKey("W");
        this.movement.down = scene.input.keyboard.addKey("R");
        this.movement.left = scene.input.keyboard.addKey("A");
        this.movement.right = scene.input.keyboard.addKey("S");
    }

    update(): void {
        if (this.movement["up"] && this.movement["up"].isDown) {
            this.player.pos.y -= 10;
        }
        if (this.movement["down"] && this.movement["down"].isDown) {
            this.player.pos.y += 10;
        }
        if (this.movement["left"] && this.movement["left"].isDown) {
            this.player.pos.x -= 10;
        }
        if (this.movement["right"] && this.movement["right"].isDown) {
            this.player.pos.x += 10;
        }

        this.setPosition(this.player.pos.x, this.player.pos.y);
    }
}
