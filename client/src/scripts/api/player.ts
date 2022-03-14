import { Vector } from "./vector";

export class ApiPlayer {
    public pos = new Vector(500, 500);
    public id: string;

    constructor(id?: string) {
        this.id = id ?? "";
    }
}
