import Store from 'electron-store';
import { FINAL_SCORE_KEY } from '../constants/constants';
import { BaseScene } from './BaseScene';
import { GameDataStore } from '../GameDataStore';

export class GameOver extends BaseScene
{
    textContainer: Phaser.GameObjects.Container;
    finalScore: number;
    bestScore: number;
    store: Store<GameDataStore>;

    constructor ()
    {
        super('GameOver');
    }

    init() {
        this.store = new Store<GameDataStore>({
            defaults: {
                bestScore: -1
            }
        });

        this.finalScore = -1;

        const finalScoreString = localStorage.getItem(FINAL_SCORE_KEY);

        if (finalScoreString !== null && finalScoreString !== undefined && finalScoreString.length > 0) {
            this.finalScore = parseInt(finalScoreString, 10);
        }

        this.bestScore = this.store.get("bestScore");

        if (this.bestScore < this.finalScore) {
            this.store.set("bestScore", this.finalScore);
        }
    }

    create ()
    {
        const gameOverText = this.add.text(0, 0, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        gameOverText.setOrigin(0.5);

        const endingScoreText = this.add.text(0, 42, `Final Score ${this.finalScore < 0 ? 'error' : this.finalScore}`, {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        })
        endingScoreText.setOrigin(0.5);

        const bestScoreText = this.add.text(0, 84, `Previous Best Score: ${this.bestScore === -1 ? 'none': this.bestScore}`, {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        });
        bestScoreText.setOrigin(0.5);

        this.textContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2, [
            gameOverText,
            endingScoreText,
            bestScoreText
        ]);

        this.input.once('pointerup', () => {
            localStorage.removeItem(FINAL_SCORE_KEY);
            this.scene.start('MainMenu');
        });
    }
}
