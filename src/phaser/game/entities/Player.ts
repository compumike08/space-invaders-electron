import { LivesText } from "../../hud/LivesText";
import { ScoreText } from "../../hud/ScoreText";
import { WeaponPowerBar } from "../../hud/WeaponPowerBar";
import { BaseScene } from "../scenes/BaseScene";

const SHIP_VELOCITY = 300;

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    livesText: LivesText;
    weaponPowerBar: WeaponPowerBar;
    weaponPower: number;
    weaponPulses: Phaser.Physics.Arcade.Group;
    weaponFireTime: number;
    gameOverCallback: Function;
    isGameRunning: boolean;
    scoreText: ScoreText;
    weaponFireCooldown: number;

    constructor(scene: BaseScene, x: number, y: number, weaponPulses: Phaser.Physics.Arcade.Group, gameOverCallback: Function) {
        super(scene, x, y, 'ship');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.gameOverCallback = gameOverCallback;
        this.weaponPulses = weaponPulses;
        this.weaponFireCooldown = scene.currentDiffLevel.weaponFireCooldown;

        this.init(scene);
        
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    init(scene: BaseScene) {
        this.cursors = (this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).createCursorKeys();

        this.weaponPower = this.weaponFireCooldown;

        this.livesText = new LivesText(this.scene, 5, 5, scene.currentDiffLevel.lives);
        this.weaponPowerBar = new WeaponPowerBar(scene, scene.gameWidth - 160, 5, this.weaponPower);

        this.scoreText = new ScoreText(this.scene, 5, 30, 0);

        this.isGameRunning = true;

        this.weaponFireTime = this.weaponFireCooldown;

        this
            .setOrigin(0.5, 0.5)
            .setPushable(false)
            .setCollideWorldBounds(true);
    }

    increaseScore(addToScore: number) {
        this.scoreText.increaseScore(addToScore);
    }

    decreaseLives(minusLives: number) {
        this.livesText.decrease(minusLives);

        if (this.livesText.lives <= 0) {
            this.isGameRunning = false;
            this.gameOverCallback();
        }
    }

    update(_time: number, delta: number) {
        if (!this.isGameRunning) {
            return;
        }

        this.weaponFireTime += delta;
        this.weaponPower = this.weaponFireTime > this.weaponFireCooldown ? this.weaponFireCooldown : this.weaponFireTime;
        this.weaponPowerBar.setPower(this.weaponPower);

        const { left, right, space } = this.cursors;

        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

        if (isSpaceJustDown && this.weaponFireTime >= this.weaponFireCooldown) {
            this.fireWeapon();
        }

        if (left.isDown && this.body) {
            this.body.velocity.x = -SHIP_VELOCITY;
        } else if (right.isDown && this.body) {
            this.body.velocity.x = SHIP_VELOCITY;
        } else if (left.isUp && right.isUp && this.body) {
            this.body.velocity.x = 0;
        }
    }

    fireWeapon() {
        this.weaponFireTime = 0;
        this.weaponPower = 0;
        this.weaponPowerBar.setPower(0);
        this.weaponPulses.create(this.getTopCenter().x, this.getTopCenter().y, 'weapon-pulse')
            .setOrigin(0.5, 0)
            .setPushable(false);
    }
}
