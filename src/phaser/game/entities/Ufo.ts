import { BaseScene } from "../scenes/BaseScene";

export class Ufo extends Phaser.Physics.Arcade.Sprite {
    channelNum: number;

    constructor(scene: BaseScene, x: number, y: number, channelNum: number) {
        super(scene, x, y, 'ufo', 0);

        this.channelNum = channelNum;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    init() {
        this
            .setOrigin(0, 0.5)
            .setPushable(false)
            .setCollideWorldBounds(true);
        
        this.registerAnimations();
    }

    update() {

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

        this.play("ufo");
    }

}
