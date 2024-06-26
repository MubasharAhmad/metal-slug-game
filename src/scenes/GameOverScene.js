import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameOverScene"
        });
    }

    init(data) {
        this.score = data.score ?? 0;
    }

    create() {
        // Add button click sound
        this.button_click_sound = this.sound.add("button_click");
        
        // Add background image and set its scale
        this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "bg");
        this.bg.setScale(0.7);

        this.gameoverImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 150, "gameover");

        // show score
        this.scoreText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `SCORE: ${this.score}`, {
            fontSize: "40px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        });
        this.scoreText.setOrigin(0.5);

        // get best score from local storage
        const savedScore = localStorage.getItem("metal-slug-game-score");
        this.bestScoreText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, `BEST SCORE: ${savedScore ?? 0}`, {
            fontSize: "40px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        });
        this.bestScoreText.setOrigin(0.5);

        // Add play button image, set its scale, and make it interactive
        this.play_button = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 130, "replay_btn");
        this.play_button.setScale(0.7);
        this.play_button.setInteractive();

        // Add event listener for play button click
        this.play_button.on("pointerdown", () => {
            this.button_click_sound.play(); // Play button click sound
            window.location.reload();
        });
    }
}
