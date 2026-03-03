import { BaseScene } from './BaseScene';

export class GameOver extends BaseScene
{
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.gameover_text = this.add.text(this.gameWidth / 2, this.gameHeight / 2, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerup', () => {

            this.scene.start('MainMenu');

        });
    }
}
