const DELTA = 1 / 177;

class GameWorld {
    constructor() {
        this.balls = [
            [new Vector2(1022, 413), COLOR.YELLOW],
            [new Vector2(1056, 393), COLOR.YELLOW],
            [new Vector2(1056, 433), COLOR.RED],
            [new Vector2(1090, 374), COLOR.RED],
            [new Vector2(1090, 413), COLOR.BLACK],
            [new Vector2(1090, 452), COLOR.YELLOW],
            [new Vector2(1126, 354), COLOR.YELLOW],
            [new Vector2(1126, 393), COLOR.RED],
            [new Vector2(1126, 433), COLOR.YELLOW],
            [new Vector2(1126, 472), COLOR.RED],
            [new Vector2(1162, 335), COLOR.RED],
            [new Vector2(1162, 374), COLOR.RED],
            [new Vector2(1162, 413), COLOR.YELLOW],
            [new Vector2(1162, 452), COLOR.RED],
            [new Vector2(1162, 491), COLOR.YELLOW],
            [new Vector2(413, 413), COLOR.WHITE] // white,
        ].map(params => new Ball(params[0], params[1])); // create balls

        this.whiteBall = this.balls[this.balls.length - 1];
        this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall));

        this.table = {
            topY: 57,
            rightX: 1443,
            bottomY: 768,
            leftX: 57
        };
    }
    update() {

        this.handleCollisions();

        this.stick.update();

        this.balls.forEach((ball, i) => {
            this.balls[i].update(DELTA);
        });

        if (!this.ballsMoving() && this.stick.shot) {
            this.stick.reposition(this.whiteBall.position);
        }
    }
    draw() {
        canvas.drawImage(sprites.background, { x: 0, y: 0 });
        this.stick.draw();

        this.balls.forEach((ball, i) => {
            this.balls[i].draw();
        });
    }
    ballsMoving() {
        let ballsMoving = false;

        this.balls.some((ball, i) => {
            if (this.balls[i].moving) {
                ballsMoving = true;
                return true;
            }
        });

        return ballsMoving;
    }
    handleCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].collidesWith(this.table);
            for (let j = i + 1; j < this.balls.length; j++) {
                if (this.balls[i].collidesWith(this.balls[j])) {
                    this.balls[i].handleCollision(this.balls[j]);
                    this.balls[j].handleCollision(this.balls[i]);
                }
                // this.balls[i].collidesWith(this.balls[j]);
            }
        }
    }
}




