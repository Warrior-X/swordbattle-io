import { Socket } from "socket.io-client";
import { ApiPlayer } from "../api/player";
import { Vector } from "../api/vector";
import Actor from "./Actor";

export default class Enemy extends Actor {
    private player: ApiPlayer;

    constructor(scene: Phaser.Scene, apiPlayer: ApiPlayer) {
        super(scene, 700, 500, "player");

        this.scale = 0.3;

        this.player = apiPlayer;

        this.setOrigin(0);
    }

    update(): void {
        this.setPosition(this.player.pos.x, this.player.pos.y);}

    public getPlayerId(): string {
        return this.player.id;
    }

    public moveTo(pos: Vector) {
        this.player.pos.x = pos.x;
        this.player.pos.y = pos.y;
    }
}
