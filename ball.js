const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;

class Ball {
    constructor(position, color) {
        this.position = position;
        this.velocity = new Vector2();
        this.moving = false;
        this.sprite = getBallSpriteByColor(color);
    }
    update(delta) {
        this.position.addTo(this.velocity.mult(delta));

        this.velocity = this.velocity.mult(0.984); // friction

        if (this.velocity.length() < 5) {
            this.velocity = new Vector2();
            this.moving = false;
        }
    }
    draw() {
        canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    }
    shoot(power, rotation) {
        this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
        this.moving = true;
    }
    collideWithBall(ball) {

        // find a normal vector to the line between the two balls
        const n = this.position.subtract(ball.position);

        // find the distance between the two points
        const dist = n.length();

        if (dist > BALL_DIAMETER) {
            return;
        }

        // find the minimum distance between the two points
        const mtd = n.mult((BALL_DIAMETER - dist) / dist);

        // push-pull the balls based on the minimum distance
        this.position = this.position.add(mtd.mult(1 / 2));
        ball.position = ball.position.subtract(mtd.mult(1 / 2));

        // find unit vector between the two points
        const un = n.mult(1 / n.length());

        // find unit tangent vector
        // const ut = new Vector2(un.y, -un.x);
        const ut = new Vector2(-un.y, un.x);

        // Project velocities onto the normal and tangent vectors.
        // This gives you the new velocities based on the collision.
        const v1n = un.dot(this.velocity);
        const v1t = ut.dot(this.velocity);
        const v2n = un.dot(ball.velocity);
        const v2t = ut.dot(ball.velocity);

        // find the new normal velocities based on the collision
        let v1nTag = v2n;
        let v2nTag = v1n;

        // find the new tangent velocities based on the collision
        //skip
        // Convert the scalar normal and tangent velocities to vectors
        v1nTag = un.mult(v1nTag);
        const v1tTag = ut.mult(v1t);
        v2nTag = un.mult(v2nTag);
        const v2tTag = ut.mult(v2t);

        // update the ball velocities based on the collision
        this.velocity = v1nTag.add(v1tTag);
        ball.velocity = v2nTag.add(v2tTag);

        // update the ball positions based on the collision
        this.moving = true;
        ball.moving = true;
    }
    collideWithTable(table) {

        if (!this.moving) {
            return;
        }

        let collided = false;

        if (this.position.y <= table.topY + BALL_RADIUS) {
            this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
            collided = true;
        }

        if (this.position.x >= table.rightX - BALL_RADIUS) {
            this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
            collided = true;
        }

        if (this.position.x <= table.leftX + BALL_RADIUS) {
            this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
            collided = true;
        }

        if (this.position.y >= table.bottomY - BALL_RADIUS) {
            this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
            collided = true;
        }

        if (collided) {
            this.velocity = this.velocity.mult(0.984); // friction on collision
        }

    }
    collidesWith(object) {

        if (object instanceof Ball) {
            this.collideWithBall(object);
        }
        else {
            this.collideWithTable(object);
        }

    }
}






