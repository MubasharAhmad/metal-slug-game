import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, playerInfoObj) {
        super(scene, x, y, key);
        this.scene = scene;
        this.isOnPlatform = false;
        this.playerInfoObj = playerInfoObj;
        this.setScale(3.5); // Set scale of the enemy sprite
        this.flipX = true; // Flip sprite horizontally
        this.health = 100; // Set initial health
        this.speed = Phaser.Math.Between(100, 150); // Randomize speed between 100 and 150
        
        // Add this enemy to the scene and enable physics on it
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setBounce(0.5); // Set bounce value

        this.setSize(8, 24); // Set the size of the physics body

        // Play the idle animation
        this.anims.play("enemy_idle_anim", true);
        
        // Create health bar background and health bar
        this.healthBarBg = this.scene.add.rectangle(0, 0, this.displayWidth, 5, 0x262b44).setOrigin(0, 0.5);
        this.healthBar = this.scene.add.rectangle(0, 0, this.displayWidth, 5, 0xff0000).setOrigin(0, 0.5);
        
        // Add enemy hit sound
        this.enemy_hit_sound = this.scene.sound.add("enemy_hit");
    }

    damage() {
        if (this.isDamaged) return; // Prevent multiple damage calls
        this.enemy_hit_sound.play(); // Play hit sound
        this.setTint(0xff0000); // Change tint to red
        this.isDamaged = true; // Set damage flag
        this.scene.time.delayedCall(300, () => {
            this.setTint(0xffffff); // Reset tint after delay
            this.isDamaged = false; // Reset damage flag
        });
        this.health -= 25; // Reduce health
        this.healthBar.setSize((this.displayWidth) * this.health / 100, 5); // Update health bar size
        if (this.health <= 0) { // Check if health is depleted
            this.healthBarBg.destroy(); // Destroy health bar background
            this.healthBar.destroy(); // Destroy health bar
            this.destroy(); // Destroy the enemy
            this.playerInfoObj.score++;
            this.playerInfoObj.updateScore();
        }
    }

    update() {
        // Play idle animation if the enemy is touching the ground and not moving horizontally
        if (this.body.touching.down && this.body.velocity.x === 0) {
            this.anims.play("enemy_idle_anim", true);
        } else if (!this.body.touching.down) { // Stop animation if not touching the ground
            this.anims.stop();
        }

        // Flip sprite based on player's position
        if (this.x < this.scene.player.x) {
            this.flipX = false;
        } else if (this.x > this.scene.player.x) {
            this.flipX = true;
        }

        // Move towards the player if within range
        if (Math.abs(this.scene.player.x - this.x) < 400 && Math.abs(this.scene.player.x - this.x) > 10) {
            this.setVelocityX(this.flipX ? -this.speed : this.speed); // Set velocity based on direction
            this.anims.play("enemy_run_anim", true); // Play run animation
        } else {
            this.setVelocityX(0); // Stop moving if out of range
        }

        // Update the position of the health bar
        this.healthBarBg.x = this.x - this.displayWidth / 2;
        this.healthBarBg.y = this.y - this.displayHeight / 2;
        this.healthBar.x = this.x - this.displayWidth / 2;
        this.healthBar.y = this.y - this.displayHeight / 2;
    }
}
