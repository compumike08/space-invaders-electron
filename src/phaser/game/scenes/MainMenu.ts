import { GameObjects } from 'phaser';
import { BaseScene } from './BaseScene';

export class MainMenu extends BaseScene
{
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.title = this.add.text(this.gameWidth / 2, this.gameHeight / 2, 'Play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#000000',
            stroke: '#FFFFFF', strokeThickness: 4,
            align: 'center'
        }).setInteractive().setOrigin(0.5);

        this.title.on('pointerup', () => {
            this.scene.start('DifficultySelectScene');
        });
    }
}
