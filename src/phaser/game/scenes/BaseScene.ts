import { Scene } from 'phaser';
import { DifficultyLevel } from '../DifficultyLevel';

export class BaseScene extends Scene
{
    difficultyLevels: Array<DifficultyLevel> = [
        {
            levelName: "Easy",
            ufoSpeed: 0.3,
            scoreAmt: 1,
            weaponFireCooldown: 300,
            lives: 10
        },
        {
            levelName: "Medium",
            ufoSpeed: 0.5,
            scoreAmt: 1,
            weaponFireCooldown: 400,
            lives: 8
        },
        {
            levelName: "Hard",
            ufoSpeed: 0.7,
            scoreAmt: 1,
            weaponFireCooldown: 500,
            lives: 5
        }
    ];

    currentDiffLevel: DifficultyLevel;

    get gameHeight() {
        return this.game.config.height as number;
    }

    get gameWidth() {
        return this.game.config.width as number;
    }

    get allDifficultyLevels() {
        return this.difficultyLevels;
    }
    
    constructor (key: string)
    {
        super(key);
    }
}