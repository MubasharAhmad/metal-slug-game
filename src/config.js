import Phaser from "phaser";
import GameScene from "./scenes/gameScene";
import LoadingScene from "./scenes/loadingScene";
import MainScene from "./scenes/mainScene";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    min: {
        width: 400,
        height: 400
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [LoadingScene, MainScene, GameScene]
}

export default config;