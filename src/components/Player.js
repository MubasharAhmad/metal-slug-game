import Phaser from "phaser";
import Gun from "./Gun";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, infoObj) {
        super(scene, x, y, key);
        this.scene = scene;
        this.isOnPlatform = false;
        this.setScale(3); // Set scale of the player sprite
        this.infoObj = infoObj;
        this.isShooting = true;

        // Add this player to the scene and enable physics on it
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setBounce(0.3); // Set bounce value for the player
        this.setSize(10, 28); // Set the size of the player
        this.health = 100; // Initialize player's health

        this.anims.play("player_idle_anim", true); // Play idle animation

        // Custom properties to store the camera and follow logic
        this.camera = this.scene.cameras.main;

        // Input handling
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.spaceBar = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.KeyZ = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Z
        );
        this.KeyU = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.U
        );
        this.KeyI = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.I
        );

        // Fire the gun when the "Z" key is pressed
        this.KeyZ.on("down", () => {
            this.gun.fire({ isLeft: this.flipX });
            if (!this.isShooting) {
                this.scene.tweens.add({
                    targets: this.gun,
                    rotation: 0,
                    duration: 150,
                })
            }
            this.isShooting = true;
        });
        
        // Knife when U is pressed
        this.KeyU.on("down", () => {
            this.gun.fire({ isLeft: this.flipX, bulletType: "knife" });
            if (this.isShooting) {
                this.scene.tweens.add({
                    targets: this.gun,
                    rotation: this.gun.flipX ? -0.5 : 0.5,
                    duration: 150,
                })
            }
            this.isShooting = false;
        });
        
        // Bomb when I is pressed
        this.KeyI.on("down", () => {
            this.gun.fire({ isLeft: this.flipX, bulletType: "bomb" });
            if (this.isShooting) {
                this.scene.tweens.add({
                    targets: this.gun,
                    rotation: this.gun.flipX ? -0.5 : 0.5,
                    duration: 150,
                })
            }
            this.isShooting = false;
        });

        // Create a new gun and attach it to the player
        this.gun = new Gun(this.scene, this.x, this.y, "gun");

        // Create health bar background and health bar
        this.healthBarBg = this.scene.add.rectangle(0, 0, this.displayWidth, 5, 0x262b44).setOrigin(0, 0.5);
        this.healthBar = this.scene.add.rectangle(0, 0, this.displayWidth, 5, 0xff0000).setOrigin(0, 0.5);

        // Add player hit and game over sounds
        this.player_hit_sound = this.scene.sound.add("player_hit");
        this.game_over_sound = this.scene.sound.add("game_over");
    }

    rotateGun() {
        if (this.isShooting) {
            this.scene.tweens.add({
                targets: this.gun,
                rotation: 0,
                duration: 300,
            })
        } else {
            
        }
    }

    damage() {
        if (this.isDamaged) return; // Prevent taking damage if already damaged
        this.player_hit_sound.play(); // Play hit sound
        this.setTint(0xff0000); // Change player color to red
        this.isDamaged = true;
        this.scene.time.delayedCall(300, () => {
            this.setTint(0xffffff); // Reset player color
            this.isDamaged = false;
        });
        this.scene.cameras.main.shake(100, 0.01); // Shake the camera
        this.health -= 8; // Decrease player's health
        this.healthBar.setSize((this.displayWidth) * this.health / 100, 5); // Update health bar
        if (this.health <= 0) {
            this.scene.time.delayedCall(200, () => {
                this.game_over_sound.play(); // Play game over sound
                this.infoObj.removeLife();
                if (this.infoObj.lives <= 0) {
                    this.infoObj.saveHighScore();
                    this.scene.scene.start("GameOverScene", { score: this.infoObj.score }); // Start the game over scene
                } else {
                    this.scene.scene.restart({ lives: this.infoObj.lives, score: this.infoObj.score }); // Restart the scene
                }
            });
        }
    }

    update() {
        // Manually set the camera's x position to follow the player's x position
        this.camera.scrollX = this.x - this.camera.width / 2;

        this.setVelocityX(0); // Reset velocity

        // Handle left and right movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-220);
            this.flipX = true; // Flip sprite to face left

            if (this.body.touching.down && this.isOnPlatform) {
                this.anims.play("player_run_anim", true); // Play run animation
            }
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(220);
            this.flipX = false; // Flip sprite to face right

            if (this.body.touching.down && this.isOnPlatform) {
                this.anims.play("player_run_anim", true); // Play run animation
            }
        } else {
            if (this.body.touching.down && this.isOnPlatform) {
                this.anims.play("player_idle_anim", true); // Play idle animation
            }
        }

        // Handle jumping
        if ((this.cursors.up.isDown || this.spaceBar.isDown) && this.isOnPlatform) {
            this.setVelocityY(-500); // Set jump velocity
            this.isOnPlatform = false;
        }

        // Stop animations when not on a platform
        if (!this.isOnPlatform) {
            this.anims.stop();
        }

        // Update the gun position to follow the player
        this.gun.setPosition(this.x + (this.flipX ? -20 : 20), this.y - 8);
        this.gun.flipX = this.flipX;
        this.gun.setRotation(this.flipX ? -Math.abs(this.gun.rotation) : Math.abs(this.gun.rotation))

        // Update the health bar position to follow the player
        this.healthBarBg.x = this.x - this.displayWidth / 2;
        this.healthBarBg.y = this.y - this.displayHeight / 2;
        this.healthBar.x = this.x - this.displayWidth / 2;
        this.healthBar.y = this.y - this.displayHeight / 2;
    }
}
