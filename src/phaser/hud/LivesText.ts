import { Scene } from "phaser";

export class LivesText {
    x: number;
    y: number;
    lives: number;
    livesText: Phaser.GameObjects.Text;

    constructor(scene: Scene, x: number, y: number, lives: number) {
        this.x = x + 60;
        this.y = y;
        this.lives = lives;

         this.livesText = scene.add.text(this.x - 60, this.y, `Lives: ${this.lives}`, {
            fontFamily: 'Arial Black', fontSize: 16, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        });
        this.livesText.setOrigin(0).setDepth(5);
    }

    decrease(amount: number) {
        if (amount <= 0) {
            this.lives = 0;
        } else {
            this.lives = this.lives - amount;
        }

        this.livesText.setText(`Lives: ${this.lives}`);
    }
}
