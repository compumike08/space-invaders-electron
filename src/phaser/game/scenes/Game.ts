import { SpriteWithDynamicBody } from '../../global';
import { Player } from '../entities/Player';
import { Ufo } from '../entities/Ufo';
import { BaseScene } from './BaseScene';
import { DIFFICULTY_SELECTED_KEY } from './DifficultySelectScene';

const WEAPON_PULSE_SPEED = 10;
const UFO_MAX_INIT_Y = 1000;
const MINUS_LIVES = 1;

export class Game extends BaseScene
{
    player: Player;
    weaponPulses: Phaser.Physics.Arcade.Group;
    ufoGroup: Phaser.Physics.Arcade.Group;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    isGameRunning: boolean;

    constructor ()
    {
        super('Game');
    }

    init() {
        this.cursors = (this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).createCursorKeys();
        this.isGameRunning = true;

        const currentDiffLevelName = localStorage.getItem(DIFFICULTY_SELECTED_KEY);

        if (currentDiffLevelName === undefined || currentDiffLevelName === null) {
            throw new Error("Game scene started with invalid difficulty level");
        }

        const diffLevel = this.allDifficultyLevels.find(level => level.levelName === currentDiffLevelName);

        if (diffLevel === undefined || diffLevel === null) {
            throw new Error("Game scene started with invalid difficulty level");
        }

        this.currentDiffLevel = diffLevel;
    }

    create ()
    {
        this.weaponPulses = this.physics.add.group();

        this.createPlayer();

        this.generateUfos();
    }

    update() {
        if (!this.isGameRunning) {
            return false;
        }

        Phaser.Actions.IncY(this.weaponPulses.getChildren(), -WEAPON_PULSE_SPEED);

        Phaser.Actions.IncY(this.ufoGroup.getChildren(), this.currentDiffLevel.ufoSpeed);
        
        this.weaponPulses.getChildren().forEach((weaponPulse: SpriteWithDynamicBody) => {
            if (weaponPulse.getBounds().y <= -26) {
                weaponPulse.destroy(true);
            }
        });

        this.ufoGroup.getChildren().forEach((ufo: Ufo) => {
            if (ufo.getBounds().bottom >= this.gameHeight) {
                this.recycleUfo(ufo);
                this.player.decreaseLives(MINUS_LIVES);
            }
        });
    }

    createPlayer() {
        this.player = new Player(this, this.gameWidth / 2, this.gameHeight - 20, this.weaponPulses, this.gameOverCallback.bind(this));
    }

    gameOverCallback() {
        this.isGameRunning = false;
        this.physics.pause();
        this.ufoGroup.getChildren().forEach((ufo: Ufo) => {
            ufo.anims.pause();
        });

        this.scene.start("GameOver");
    }

    generateUfos() {
        this.ufoGroup = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            const randomY = Phaser.Math.Between(0, UFO_MAX_INIT_Y);
            const newUfo = new Ufo(this, (this.gameWidth / 10) * i, -randomY, i);
            this.ufoGroup.add(newUfo);
        }

        this.physics.add.overlap(this.weaponPulses, this.ufoGroup, this.detectCollision, null, this);
    }

    detectCollision(weaponPulse: SpriteWithDynamicBody, ufo: Ufo) {
        weaponPulse.destroy(true);
        this.recycleUfo(ufo);
        this.player.increaseScore(this.currentDiffLevel.scoreAmt);
    }

    recycleUfo(ufo: Ufo) {
        const randomY = Phaser.Math.Between(0, UFO_MAX_INIT_Y);
        ufo.y = -randomY;
    }
}
