import { Vector } from "./vector";

/**
 * This is the API representation of a player.
 * Do not confuse this with the sprite of the player.
 * 
 * Note that, while there is a difference between the sprites of the Player class and the Enemy class, they both use this as their representation.
 */
export class ApiPlayer {
    public pos = new Vector(500, 500);

    /** The id of the player is the id from the socket.io server. */
    public id: string;

    constructor(id?: string) {
        this.id = id ?? "";
    }
}
