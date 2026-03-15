import { SpecialPowerBar } from "../../hud/SpecialPowerBar";
import { LivesText } from "../../hud/LivesText";
import { ScoreText } from "../../hud/ScoreText";
import { WeaponPowerBar } from "../../hud/WeaponPowerBar";
import { BaseScene } from "../scenes/BaseScene";

const SHIP_VELOCITY = 300;
const TIME_FREEZE_DURATION = 10000; // time in milliseconds
const WEAPON_BOOST_DURATION = 20000; // time in milliseconds

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  livesText: LivesText;
  weaponPowerBar: WeaponPowerBar;
  weaponPower: number;
  specialPowerBar: SpecialPowerBar;
  weaponPulses: Phaser.Physics.Arcade.Group;
  weaponFireTime: number;
  specialFireTime: number;
  gameOverCallback: () => void;
  fireNovaBlastCallback: () => void;
  isGameRunning: boolean;
  scoreText: ScoreText;
  weaponFireCooldown: number;
  specialFireCooldown: number;
  specialPower: number;
  isTimeFrozen: boolean;
  isWeaponBoostActive: boolean;

  constructor(
    scene: BaseScene,
    x: number,
    y: number,
    weaponPulses: Phaser.Physics.Arcade.Group,
    gameOverCallback: () => void,
    fireNovaBlastCallback: () => void
  ) {
    super(scene, x, y, "ship");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.gameOverCallback = gameOverCallback;
    this.fireNovaBlastCallback = fireNovaBlastCallback;
    this.weaponPulses = weaponPulses;
    this.weaponFireCooldown = scene.currentDiffLevel.weaponFireCooldown;
    this.specialFireCooldown = scene.currentDiffLevel.specialFireCooldown;

    this.init(scene);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.scene.input.keyboard.on("keydown-N", this.fireNovaBlast.bind(this));
    this.scene.input.keyboard.on("keydown-T", this.fireFreezeTime.bind(this));
    this.scene.input.keyboard.on("keydown-W", this.fireWeaponBoost.bind(this));
  }

  init(scene: BaseScene) {
    this.isTimeFrozen = false;
    this.isWeaponBoostActive = false;

    this.cursors = (
      this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
    ).createCursorKeys();

    this.weaponPower = this.weaponFireCooldown;
    this.specialPower = 0;

    this.weaponPowerBar = new WeaponPowerBar(scene, 5, 5, this.weaponPower);
    this.specialPowerBar = new SpecialPowerBar(scene, 5, 25, this.specialPower);
    this.livesText = new LivesText(
      this.scene,
      5,
      45,
      scene.currentDiffLevel.lives
    );
    this.scoreText = new ScoreText(this.scene, 5, 65, 0);

    this.isGameRunning = true;

    this.weaponFireTime = this.weaponFireCooldown;
    this.specialFireTime = 0;

    this.setOrigin(0.5, 0.5).setPushable(false).setCollideWorldBounds(true);
  }

  fireWeaponBoost() {
    if (this.specialFireTime >= this.specialFireCooldown) {
      this.specialPower = 0;
      this.specialFireTime = 0;
      this.specialPowerBar.setPower(this.specialPower);

      this.weaponPower = this.weaponFireCooldown;
      this.weaponPowerBar.setPower(this.weaponPower);
      this.isWeaponBoostActive = true;

      this.scene.time.delayedCall(
        WEAPON_BOOST_DURATION,
        this.endWeaponBoost,
        null,
        this
      );
    }
  }

  endWeaponBoost() {
    this.isWeaponBoostActive = false;
  }

  fireNovaBlast() {
    if (this.specialFireTime >= this.specialFireCooldown) {
      this.specialPower = 0;
      this.specialFireTime = 0;
      this.specialPowerBar.setPower(this.specialPower);
      this.fireNovaBlastCallback();
    }
  }

  fireFreezeTime() {
    if (this.specialFireTime >= this.specialFireCooldown) {
      this.specialPower = 0;
      this.specialFireTime = 0;
      this.specialPowerBar.setPower(this.specialPower);

      this.isTimeFrozen = true;
      this.scene.cameras.main.setBackgroundColor("rgba(255, 0, 0, 0.5)");

      this.scene.time.delayedCall(
        TIME_FREEZE_DURATION,
        this.unfreezeTime,
        null,
        this
      );
    }
  }

  unfreezeTime() {
    this.isTimeFrozen = false;
    this.scene.cameras.main.setBackgroundColor("rgba(0, 0, 0, 1)");
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

  increaseSpecialPower(delta: number) {
    this.specialFireTime += delta;
    this.specialPower =
      this.specialFireTime > this.specialFireCooldown
        ? this.specialFireCooldown
        : this.specialFireTime;
    this.specialPowerBar.setPower(this.specialPower);
  }

  increaseWeaponPower(delta: number) {
    this.weaponFireTime += delta;
    this.weaponPower =
      this.weaponFireTime > this.weaponFireCooldown
        ? this.weaponFireCooldown
        : this.weaponFireTime;
    this.weaponPowerBar.setPower(this.weaponPower);
  }

  update(_time: number, delta: number) {
    if (!this.isGameRunning) {
      return;
    }

    this.increaseWeaponPower(delta);

    if (!this.isTimeFrozen && !this.isWeaponBoostActive) {
      this.increaseSpecialPower(delta);
    }

    const { left, right, space } = this.cursors;

    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    if (
      isSpaceJustDown &&
      (this.isWeaponBoostActive ||
        this.weaponFireTime >= this.weaponFireCooldown)
    ) {
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
    if (!this.isWeaponBoostActive) {
      this.weaponFireTime = 0;
      this.weaponPower = 0;
      this.weaponPowerBar.setPower(0);
    }

    this.weaponPulses
      .create(this.getTopCenter().x, this.getTopCenter().y, "weapon-pulse")
      .setOrigin(0.5, 0)
      .setPushable(false);
  }
}
