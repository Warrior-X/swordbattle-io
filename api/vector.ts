export class Vector {
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    public setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
