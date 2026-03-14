import { BaseScene } from "../scenes/BaseScene";

export const DURATION_OF_EXPLOSION_ANIM = 800; // value in milliseconds
export const UFO_MAX_INIT_Y = 1000;

export class Ufo extends Phaser.Physics.Arcade.Sprite {
  channelNum: number;
  isExploding: boolean;

  constructor(scene: BaseScene, x: number, y: number, channelNum: number) {
    super(scene, x, y, "ufo", 0);

    this.channelNum = channelNum;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.isExploding = false;
    this.setOrigin(0, 0.5).setPushable(false).setCollideWorldBounds(true);

    this.registerAnimations();
    this.playUfoAnim();
  }

  playUfoAnim() {
    this.setScale(1, 1);
    this.play("ufo");
  }

  recycleUfo() {
    const randomY = Phaser.Math.Between(0, UFO_MAX_INIT_Y);
    this.y = -randomY;
  }

  update() {}

  explodeUfo() {
    this.isExploding = true;
    this.setScale(2, 2);
    this.play("explosion");
    this.scene.time.delayedCall(
      DURATION_OF_EXPLOSION_ANIM,
      this.endExplosion,
      null,
      this
    );
  }

  endExplosion() {
    this.isExploding = false;
    this.recycleUfo();
    this.playUfoAnim();
  }

  registerAnimations() {
    this.anims.create({
      key: "ufo",
      frames: this.anims.generateFrameNumbers("ufo", {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1 //infinite repeat
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 7
      }),
      duration: DURATION_OF_EXPLOSION_ANIM,
      repeat: 0
    });
  }
}
