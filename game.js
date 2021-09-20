class Game {
    constructor() {
    }
    init() {
        this.gameWorld = new GameWorld();
    }
    start() {
        poolGame.init();
        poolGame.mainLoop();
    }
    mainLoop() {
        canvas.clear();
        poolGame.gameWorld.update();
        poolGame.gameWorld.draw();

        Mouse.reset();

        requestAnimationFrame(poolGame.mainLoop);
    }
}




let poolGame = new Game();