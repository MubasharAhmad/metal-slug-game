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

        // Create the explosions group and disable gravity for explosions
        this.explosions = this.scene.physics.add.group({
            defaultKey: 'explosion',
            createCallback: (explosion) => {
                explosion.body.setAllowGravity(false);
            }
        });

        // Add overlap check between explosions and enemies
        this.scene.physics.add.overlap(this.explosions, this.scene.enemies, (explosion, enemy) => {
            if (explosion.enemy === enemy) return;
            enemy.damage(50); // Call damage method on enemy
            explosion.enemy = enemy;
        });
        
        // Create the bombs group
        this.bombs = this.scene.physics.add.group({
            runChildUpdate: true,
        });

        this.scene.physics.add.collider(this.bombs, this.scene.platforms, (bomb, platform) => {
            const explosion = this.explosions.create(bomb.x, bomb.y - 25, "explosion");
            explosion.anims.play("explosion_anim");
            explosion.on("animationcomplete", () => {
                explosion.destroy();
            })
            bomb.destroy();
        })

        // Add overlap check between bullets and enemies
        this.scene.physics.add.overlap(this.bullets, this.scene.enemies, (bullet, enemy) => {
            enemy.damage(bullet.bulletType === "knife" ? 20 : 35); // Call damage method on enemy
            bullet.destroy(); // Destroy bullet on collision
        });

        // Add shoot sound
        this.shoot_sound = this.scene.sound.add("shoot");
    }

    fire({ isLeft, bulletType = "bullet" }) {
        this.shoot_sound.play(); // Play shoot sound

        // Create bullet at the gun's position, offset depending on direction
        const offsetX = bulletType === "bullet" ? 35 : 10;
        let bullet;
        if (bulletType === "bomb") {
            bullet = this.bombs.create(this.x + (isLeft ? -offsetX : offsetX), this.y - 4, bulletType);
        } else {
            bullet = this.bullets.create(this.x + (isLeft ? -offsetX : offsetX), this.y - 4, bulletType);
            bullet.bulletType = bulletType;
        }
        bullet.setScale(bulletType === "bullet" ? 1 : 2);

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
