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
            specialFireCooldown: 15000,
            lives: 10
        },
        {
            levelName: "Medium",
            ufoSpeed: 0.5,
            scoreAmt: 1,
            weaponFireCooldown: 400,
            specialFireCooldown: 30000,
            lives: 8
        },
        {
            levelName: "Hard",
            ufoSpeed: 0.7,
            scoreAmt: 1,
            weaponFireCooldown: 500,
            specialFireCooldown: 45000,
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