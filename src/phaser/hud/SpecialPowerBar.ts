import { HudBarSize } from "./hud";
import { BaseScene } from "../game/scenes/BaseScene";

export class SpecialPowerBar {
    bar: Phaser.GameObjects.Graphics;
    x: number;
    y: number;
    value: number;
    size: HudBarSize;
    pixelPerPower: number;
    specialStatusBarText: Phaser.GameObjects.Text;
    specialFireCooldown: number;

    constructor(scene: BaseScene, x: number, y: number, power: number) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(5);
        
        this.x = x;
        this.y = y + 3;
        this.value = power;
        this.specialFireCooldown = scene.currentDiffLevel.specialFireCooldown;

        this.size = {
            width: 80,
            height: 12
        };

        this.pixelPerPower = this.size.width / scene.currentDiffLevel.specialFireCooldown;
        scene.add.existing(this.bar);
        this.draw(this.x, this.y);

        this.specialStatusBarText = this.bar.scene.add.text(this.x, this.y - 3, 'Special Power: ', {
            fontFamily: 'Arial Black', fontSize: 12, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        });
        this.specialStatusBarText.setOrigin(0).setDepth(5);
    }

    setPower(amount: number) {
        if (amount <= 0) {
            this.value = 0;
        } else if (amount >= this.specialFireCooldown) {
            this.value = this.specialFireCooldown;
        } else {
            this.value = amount;
        }

        this.draw(this.x + 115, this.y);
    }

    draw(x: number, y: number) {
        this.bar.clear();
        const { width, height } = this.size;

        const margin = 2;

        this.bar.fillStyle(0x000);
        this.bar.fillRect(x, y, width + margin, height + margin);

        this.bar.fillStyle(0xFFFFFF);
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

        const powerWidth = Math.floor(this.pixelPerPower * this.value);


        if (powerWidth < this.size.width) {
            this.bar.fillStyle(0xFF0000);
        } else {
            this.bar.fillStyle(0x00FF00);
        }

        if (powerWidth > 0) {
            this.bar.fillRect(x + margin, y + margin, powerWidth - margin, height - margin);
        }

        return this.bar.setScrollFactor(0,0);
    }
}
