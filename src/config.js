import Phaser from "phaser";
import Level1Scene from "./scenes/level1Scene"; // Import Level 1 scene
import LoadingScene from "./scenes/loadingScene"; // Import Loading scene
import MainScene from "./scenes/mainScene"; // Import Main scene
import Level2Scene from "./scenes/level2Scene"; // Import Level 2 scene
import Level3Scene from "./scenes/level3Scene"; // Import Level 3 scene
import Level4Scene from "./scenes/level4Scene"; // Import Level 4 scene

// Configuration object for the Phaser game
const config = {
    type: Phaser.AUTO, // Automatically choose WebGL or Canvas rendering
    width: 1100, // Width of the game canvas
    height: 700, // Height of the game canvas
    backgroundColor: 0x000000, // Background color of the game
    pixelArt: true, // Enable pixel art mode
    physics: {
        default: "arcade", // Default physics engine
        arcade: {
            gravity: {
                y: 300, // Gravity in the y direction
            },
            debug: false, // Disable physics debug
        },
    },
    scale: {
        mode: Phaser.Scale.FIT, // Fit the game to the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game on the screen
    },
    scene: [LoadingScene, MainScene, Level1Scene, Level2Scene, Level3Scene, Level4Scene] // Array of scenes to be loaded
}

export default config; // Export the configuration object
