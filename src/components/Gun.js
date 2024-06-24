import Phaser from "phaser";

export default class Gun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.setScale(2.5); // Set scale of the gun sprite

        // Initialize pointer coordinates
        this.pointerWorldX = 0;
        this.pointerWorldY = 0;

        // Add this gun to the scene
        this.scene.add.existing(this);

        // Create the bullets group and disable gravity for bullets
        this.bullets = this.scene.physics.add.group({
            defaultKey: 'bullet',
            runChildUpdate: true,
            createCallback: (bullet) => {
                bullet.body.setAllowGravity(false);
            }
        });

        // Add overlap check between bullets and enemies
        this.scene.physics.add.overlap(this.bullets, this.scene.enemies, (bullet, enemy) => {
            bullet.destroy(); // Destroy bullet on collision
            enemy.damage(); // Call damage method on enemy
        });

        // Add shoot sound
        this.shoot_sound = this.scene.sound.add("shoot");
    }

    fire({ isLeft }) {
        this.shoot_sound.play(); // Play shoot sound

        // Create bullet at the gun's position, offset depending on direction
        const bullet = this.bullets.create(this.x + (isLeft ? -35 : 35), this.y - 4, "bullet");

        // Destroy bullet after 2 seconds
        setTimeout(() => {
            if (bullet)
                bullet.destroy();
        }, 2000);

        // Set bullet velocity based on the direction
        if (isLeft) {
            bullet.setVelocityX(-500); // Move left
        } else {
            bullet.setVelocityX(500); // Move right
        }
    }
}
