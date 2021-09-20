let sprites = {}; // create an object called sprites that contains the sprites loaded

let assetsStillLoading = 0;

function assetsLoadingLoop(callBack) {
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callBack)); // call assetsLoadingLoop again
    } else {
        callBack(); // callBack is a parameter of assetsLoadingLoop
    }
}

function loadAssets(callBack) {
    function loadSprites(fileName) {
        assetsStillLoading++; // increment assetsStillLoading

        let spritesImage = new Image(); // create a new Image object
        spritesImage.src = "./assets/sprites/" + fileName; // set the image source to the sprites folder

        spritesImage.onload = function () {
            assetsStillLoading--; // decrement assetsStillLoading
        }

        return spritesImage; // return the Image object
    }
    sprites.background = loadSprites('spr_background4.png'); // load the background image
    sprites.stick = loadSprites('spr_stick.png'); // load the stick image
    sprites.whiteBall = loadSprites('spr_ball2.png'); // load the white ball image
    sprites.redBall = loadSprites('spr_redBall2.png'); // load the white ball image
    sprites.yellowBall = loadSprites('spr_yellowBall2.png'); // load the white ball image
    sprites.blackBall = loadSprites('spr_blackBall2.png'); // load the white ball image

    assetsLoadingLoop(callBack);    // call assetsLoadingLoop with the parameter callBack
}

function getBallSpriteByColor(color) {
    switch (color) {
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}