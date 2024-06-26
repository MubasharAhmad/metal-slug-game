import Phaser from "phaser";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadingScene" // Key to identify this scene
        });
    }

    init() {
        // Create a rectangle for the loading bar background
        this.add
            .rectangle(
                this.scale.canvas.width / 2, // X position
                this.scale.canvas.height / 2, // Y position
                318, // Width
                32 // Height
            )
            .setStrokeStyle(1, 0xDEC56C); // Border style

        // Create a rectangle for the loading bar progress
        const bar = this.add.rectangle(
            this.scale.canvas.width / 2 - 155, // X position
            this.scale.canvas.height / 2, // Y position
            4, // Initial width
            28, // Height
            0xDEC56C // Fill color
        );

        // Update the loading bar width based on the progress
        this.load.on("progress", (progress) => {
            bar.width = 4 + 310 * progress;
        });
    }

    preload() {
        // Load images
        this.load.image("metal_slug", "/images/metal_slug.PNG");
        this.load.image("bg", "/images/bg.png");
        this.load.image("play_btn", "/images/play.png");
        this.load.image("replay_btn", "/images/replay.png");
        this.load.image("gun", "/images/gun.png");
        this.load.image("bullet", "/images/bullet.png");
        this.load.image("heart", "/images/heart.png");
        this.load.image("gameover", "/images/gameover.png");

        // Load player spritesheets
        this.load.spritesheet("player_idle", "/images/Player/idle.png", {
            frameWidth: 16,
            frameHeight: 32
        });
        this.load.spritesheet("player_run", "/images/Player/run.png", {
            frameWidth: 16,
            frameHeight: 32
        });

        // Load enemy spritesheets
        this.load.spritesheet("enemy_idle", "/images/Enemy/idle.png", {
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet("enemy_run", "/images/Enemy/run.png", {
            frameWidth: 16,
            frameHeight: 24
        });

        // Load level 1 background images
        this.load.image("level1_houses1", "/images/backgrounds/Level1/houses1.png");
        this.load.image("level1_houses2", "/images/backgrounds/Level1/houses2.png");
        this.load.image("level1_houses3", "/images/backgrounds/Level1/houses3.png");
        this.load.image("level1_houses4", "/images/backgrounds/Level1/houses4.png");
        this.load.image("level1_moon", "/images/backgrounds/Level1/moon.png");
        this.load.image("level1_road", "/images/backgrounds/Level1/road.png");
        this.load.image("level1_sky", "/images/backgrounds/Level1/sky.png");
        this.load.image("level1_wall", "/images/backgrounds/Level1/wall.png");
        this.load.image("level1_platform", "/images/backgrounds/Level1/platform.png");

        // Load level 2 background images
        this.load.image("level2_sky", "/images/backgrounds/Level2/sky.png");
        this.load.image("level2_sun", "/images/backgrounds/Level2/sun.png");
        this.load.image("level2_ruins", "/images/backgrounds/Level2/ruins.png");
        this.load.image("level2_houses3", "/images/backgrounds/Level2/houses3.png");
        this.load.image("level2_houses2", "/images/backgrounds/Level2/houses2.png");
        this.load.image("level2_houses1", "/images/backgrounds/Level2/houses1.png");
        this.load.image("level2_fence", "/images/backgrounds/Level2/fence.png");
        this.load.image("level2_road", "/images/backgrounds/Level2/road.png");
        this.load.image("level2_platform", "/images/backgrounds/Level2/platform.png");

        // Load level 3 background images
        this.load.image("level3_sky", "/images/backgrounds/Level3/sky.png");
        this.load.image("level3_houses4", "/images/backgrounds/Level3/houses4.png");
        this.load.image("level3_houses3", "/images/backgrounds/Level3/houses3.png");
        this.load.image("level3_houses2", "/images/backgrounds/Level3/houses2.png");
        this.load.image("level3_houses1", "/images/backgrounds/Level3/houses1.png");
        this.load.image("level3_wall", "/images/backgrounds/Level3/wall.png");
        this.load.image("level3_road", "/images/backgrounds/Level3/road.png");
        this.load.image("level3_platform", "/images/backgrounds/Level3/platform.png");

        // Load level 4 background images
        this.load.image("level4_sky", "/images/backgrounds/Level4/sky.png");
        this.load.image("level4_sun", "/images/backgrounds/Level4/sun.png");
        this.load.image("level4_houses3", "/images/backgrounds/Level4/houses3.png");
        this.load.image("level4_houses2", "/images/backgrounds/Level4/houses2.png");
        this.load.image("level4_houses1", "/images/backgrounds/Level4/houses1.png");
        this.load.image("level4_trees", "/images/backgrounds/Level4/trees.png");
        this.load.image("level4_fence", "/images/backgrounds/Level4/fence.png");
        this.load.image("level4_road", "/images/backgrounds/Level4/road.png");
        this.load.image("level4_bricks3", "/images/backgrounds/Level4/bricks3.png");
        this.load.image("level4_bricks2", "/images/backgrounds/Level4/bricks2.png");
        this.load.image("level4_bricks1", "/images/backgrounds/Level4/bricks1.png");
        this.load.image("level4_platform", "/images/backgrounds/Level4/platform.png");

        // Load sounds
        this.load.audio("button_click", "/sounds/button_click.mp3");
        this.load.audio("enemy_hit", "/sounds/enemy_hit.wav");
        this.load.audio("game_over", "/sounds/game_over.wav");
        this.load.audio("music", "/sounds/music.wav");
        this.load.audio("player_hit", "/sounds/player_hit.wav");
        this.load.audio("shoot", "/sounds/shoot.wav");
    }

    create() {
        // Create player idle animation
        this.anims.create({
            key: "player_idle_anim",
            frames: this.anims.generateFrameNumbers("player_idle", {
                start: 0,
                end: 3
            }),
            frameRate: 10, // Frames per second
            repeat: -1 // Loop indefinitely
        });

        // Create player run animation
        this.anims.create({
            key: "player_run_anim",
            frames: this.anims.generateFrameNumbers("player_run", {
                start: 0,
                end: 3
            }),
            frameRate: 6, // Frames per second
            repeat: -1 // Loop indefinitely
        });

        // Create enemy idle animation
        this.anims.create({
            key: "enemy_idle_anim",
            frames: this.anims.generateFrameNumbers("enemy_idle", {
                start: 0,
                end: 3
            }),
            frameRate: 10, // Frames per second
            repeat: -1 // Loop indefinitely
        });

        // Create enemy run animation
        this.anims.create({
            key: "enemy_run_anim",
            frames: this.anims.generateFrameNumbers("enemy_run", {
                start: 0,
                end: 3
            }),
            frameRate: 5, // Frames per second
            repeat: -1 // Loop indefinitely
        });

        // Start the main game scene
        this.scene.start("MainScene");
    }
}
