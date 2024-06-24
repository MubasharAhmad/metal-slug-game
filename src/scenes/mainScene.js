import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene" // Key to identify this scene
        });
    }

    create() {
        // Add background music and play it in a loop
        this.bg_music = this.sound.add("music");
        this.bg_music.play({ loop: true });

        // Add button click sound
        this.button_click_sound = this.sound.add("button_click");

        // Add background image and set its scale
        this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "bg");
        this.bg.setScale(0.7);

        // Add title text image and set its color tint
        this.text = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 50, "metal_slug");
        this.text.setTintFill(0xffffff);

        // Add play button image, set its scale, and make it interactive
        this.play_button = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 100, "play_btn");
        this.play_button.setScale(0.7);
        this.play_button.setInteractive();

        // Add event listener for play button click
        this.play_button.on("pointerdown", () => {
            this.scene.start("Level1Scene"); // Start Level 1 scene
            this.button_click_sound.play(); // Play button click sound
        });
    }
}
