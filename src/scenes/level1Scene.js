import Phaser from "phaser";
import Player from "../components/Player"; // Import Player class
import Enemy from "../components/Enemy"; // Import Enemy class

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({
            key: "Level1Scene" // Key to identify this scene
        });
    }

    create() {
        // Create a group of static platforms
        this.platforms = this.physics.add.staticGroup();
        
        // Create a group of enemies with updates run on each child
        this.enemies = this.physics.add.group({
            runChildUpdate: true
        });

        this.addBackground(); // Add the background to the scene
        this.addPlatforms(); // Add platforms to the scene
        this.addPlayer(); // Add player to the scene
        this.addEnemies(); // Add enemies to the scene
    }

    addPlayer() {
        // Create a new player at position (400, 500) with "player_idle" sprite
        this.player = new Player(this, 400, 500, "player_idle");

        // Add collision detection between the player and platforms
        this.physics.add.collider(this.player, this.platforms, (player, platform) => {
            if (platform.platformName !== "side_boundry") {
                this.player.isOnPlatform = true; // Set player on platform flag
            }
        });
    }

    addEnemies() {
        // Create 9 enemies at specified positions
        for (let i = 0; i < 9; i++) {
            const enemy = new Enemy(this, 900 + i * 300, 200, "enemy_idle");
            this.enemies.add(enemy);
        }

        // Add collision detection between enemies and platforms
        this.physics.add.collider(this.enemies, this.platforms, (enemy, platform) => {
            enemy.isOnPlatform = true;
        });

        // Add overlap detection between player and enemies
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            player.damage(); // Call damage method on player when overlapping with an enemy
        });
    }

    addBackground() {
        // Add background images for the sky and moon
        for(let i = 0; i < 3; i++) {
            const bg_sky = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_sky");
            bg_sky.setScale(0.65);
            bg_sky.setX(this.game.config.width / 2 + (bg_sky.displayWidth * i));
        }
        const bg_moon = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_moon");
        bg_moon.setScale(0.65);

        // Add background images for the houses
        for(let i = 0; i < 3; i++) {
            const bg_houses4 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_houses4");
            bg_houses4.setScale(0.65);
            bg_houses4.setX(this.game.config.width / 2 + (bg_houses4.displayWidth * i));

            const bg_houses3 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_houses3");
            bg_houses3.setScale(0.65);
            bg_houses3.setX(this.game.config.width / 2 + (bg_houses3.displayWidth * i));

            const bg_houses2 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_houses2");
            bg_houses2.setScale(0.65);
            bg_houses2.setX(this.game.config.width / 2 + (bg_houses2.displayWidth * i));

            const bg_houses1 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_houses1");
            bg_houses1.setScale(0.65);
            bg_houses1.setX(this.game.config.width / 2 + (bg_houses1.displayWidth * i));
        }
    }

    addPlatforms() {
        // Create left boundary platform
        this.left_boundry = this.platforms.create(-50, this.game.config.height / 2 + 100, "level1_platform");
        this.left_boundry.setAlpha(0);
        this.left_boundry.setSize(10, 500);
        this.left_boundry.platformName = "side_boundry";

        // Create right boundary platform
        this.right_boundry = this.platforms.create(3620, this.game.config.height / 2 + 100, "level1_platform");
        this.right_boundry.setAlpha(0);
        this.right_boundry.setSize(10, 500);
        this.right_boundry.platformName = "side_boundry";

        // Create ground platform
        this.ground = this.platforms.create(this.game.config.width / 2, this.game.config.height / 2, "level1_road");
        this.ground.setScale(0.65);
        this.ground.setImmovable();
        this.ground.setSize(4000, 20);
        this.ground.setOffset(this.ground.body.offset.x + 1700, this.ground.body.offset.y + 450);

        // Create additional platforms
        this.platform_1 = this.platforms.create(this.game.config.width / 2 + 600, this.game.config.height / 2 + 100, "level1_platform");
        this.platform_1.setScale(0.65);
        this.platform_1.refreshBody();
        
        this.platform_2 = this.platforms.create(this.game.config.width / 2 + 2000, this.game.config.height / 2 + 100, "level1_platform");
        this.platform_2.setScale(0.65);
        this.platform_2.refreshBody();

        // Add more ground images to extend the road
        for (let i = 1; i < 3; i++) {
            const g = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "level1_road");
            g.setScale(0.65);
            g.setX(this.game.config.width / 2 + (g.displayWidth * i));
        }
    }

    update() {
        this.player.update(); // Update player state

        // Check if all enemies are defeated and the game is not over
        if (this.enemies.getChildren().length === 0 && !this.isGameOver) {
            this.isGameOver = true;
            setTimeout(() => {
                this.scene.start("Level2Scene"); // Start Level 2 scene after a delay
            }, 1000);
        }
    }
}
