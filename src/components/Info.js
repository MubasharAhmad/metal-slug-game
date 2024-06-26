import Phaser from "phaser";

export default class Info extends Phaser.GameObjects.Container {
    constructor(scene, lives, score) {
        super(scene);
        this.scene = scene;
        this.lives = lives;
        this.score = score;

        this.setScrollFactor(0);
        this.scene.add.existing(this);

        this.lifeImages = [];
        this.addLives();
        this.addScore();
        this.showHighestScore();
    }

    addLives() {
        for (let i = 0; i < this.lives; i++) {
            const life = this.scene.add.image(985 + i * 44, 32, "heart");
            life.setScale(0.1);
            this.lifeImages.push(life);
            this.add(life);
        }
    }

    removeLife() {
        this.lifeImages.pop().destroy();
        this.lives--;
    }

    addScore() {
        this.scoreText = this.scene.add.text(970, 58, `SCORE: ${this.score}`, {
            fontSize: "24px",
            fill: "#fff",
            fontStyle: "bold",
            fontFamily: "Arial"
        });

        this.add(this.scoreText);
    }

    updateScore() {
        this.scoreText.setText(`SCORE: ${this.score}`);
    }

    saveHighScore() {
        const savedScore = localStorage.getItem("metal-slug-game-score");
        if (this.score > savedScore) {
            localStorage.setItem("metal-slug-game-score", this.score);
        }
    }

    showHighestScore() {
        const savedScore = localStorage.getItem("metal-slug-game-score");
        this.bestScoreText = this.scene.add.text(900, 90, `BEST SCORE: ${savedScore ?? 0}`, {
            fontSize: "24px",
            fill: "#fff",
            fontStyle: "bold",
            fontFamily: "Arial"
        });

        this.add(this.bestScoreText);
    }
}