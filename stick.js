const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7050;

class Stick {
    constructor(position, onShoot) {
        this.position = position;
        this.rotation = 0;
        this.orgin = STICK_ORIGIN.copy();
        this.power = 0;
        this.onShoot = onShoot;
        this.shot = false;
    }
    update() {

        if (Mouse.left.down) {
            this.incresePower();
        } else if (this.power > 0) {
            this.shoot();
        }
        this.updateRotation();
    }

    draw() {
        canvas.drawImage(sprites.stick, this.position, this.orgin, this.rotation);
    }
    updateRotation() {
        let opposite = Mouse.position.y - this.position.y;
        let adjacent = Mouse.position.x - this.position.x;
        this.rotation = Math.atan2(opposite, adjacent);
    }
    incresePower() {
        if (this.power > MAX_POWER) {
            return;
        }
        this.power += 120;
        this.orgin.x += 5;
    }
    shoot() {
        this.onShoot(this.power, this.rotation);
        this.power = 0;
        this.orgin = STICK_SHOT_ORIGIN.copy();
        this.shot = true;
    }
    reposition(position) {
        this.position = position.copy();
        this.orgin = STICK_ORIGIN.copy();
        this.shot = false;
    }
}






