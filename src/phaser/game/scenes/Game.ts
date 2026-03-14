import { QuitButton } from "../../hud/QuitButton";
import { SpriteWithDynamicBody } from "../../global";
import { FINAL_SCORE_KEY } from "../constants/constants";
import { Player } from "../entities/Player";
import { Ufo, UFO_MAX_INIT_Y } from "../entities/Ufo";
import { BaseScene } from "./BaseScene";
import { DIFFICULTY_SELECTED_KEY } from "./DifficultySelectScene";

const WEAPON_PULSE_SPEED = 10;
const MINUS_LIVES = 1;

export class Game extends BaseScene {
  player: Player;
  weaponPulses: Phaser.Physics.Arcade.Group;
  ufoGroup: Phaser.Physics.Arcade.Group;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  isGameRunning: boolean;
  quitButton: QuitButton;

  constructor() {
    super("Game");
  }

  init() {
    this.cursors = (
      this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
    ).createCursorKeys();
    this.isGameRunning = true;

    const currentDiffLevelName = localStorage.getItem(DIFFICULTY_SELECTED_KEY);

    if (currentDiffLevelName === undefined || currentDiffLevelName === null) {
      throw new Error("Game scene started with invalid difficulty level");
    }

    const diffLevel = this.allDifficultyLevels.find(
      (level) => level.levelName === currentDiffLevelName
    );

    if (diffLevel === undefined || diffLevel === null) {
      throw new Error("Game scene started with invalid difficulty level");
    }

    this.currentDiffLevel = diffLevel;

    this.quitButton = new QuitButton(
      this,
      this.gameWidth - 5,
      0,
      this.handleQuitClicked.bind(this)
    );
  }

  create() {
    this.weaponPulses = this.physics.add.group();

    this.createPlayer();

    this.generateUfos();
  }

  update() {
    if (!this.isGameRunning) {
      return false;
    }

    Phaser.Actions.IncY(this.weaponPulses.getChildren(), -WEAPON_PULSE_SPEED);

    Phaser.Actions.IncY(
      this.ufoGroup.getChildren().filter((ufo: Ufo) => !ufo.isExploding),
      this.currentDiffLevel.ufoSpeed
    );

    this.weaponPulses
      .getChildren()
      .forEach((weaponPulse: SpriteWithDynamicBody) => {
        if (weaponPulse.getBounds().y <= -26) {
          weaponPulse.destroy(true);
        }
      });

    this.ufoGroup.getChildren().forEach((ufo: Ufo) => {
      if (ufo.getBounds().bottom >= this.gameHeight) {
        ufo.recycleUfo();
        this.player.decreaseLives(MINUS_LIVES);
      }
    });
  }

  handleQuitClicked() {
    this.gameOverCallback();
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.gameWidth / 2,
      this.gameHeight - 20,
      this.weaponPulses,
      this.gameOverCallback.bind(this),
      this.fireNovaBlastCallback.bind(this)
    );
  }

  fireNovaBlastCallback() {
    this.ufoGroup.getChildren().forEach((ufo: Ufo) => {
      if (ufo.getBounds().bottom > 0) {
        ufo.explodeUfo();
        this.player.increaseScore(this.currentDiffLevel.scoreAmt);
      }
    });
  }

  gameOverCallback() {
    this.isGameRunning = false;
    this.physics.pause();
    this.ufoGroup.getChildren().forEach((ufo: Ufo) => {
      ufo.anims.pause();
    });

    localStorage.setItem(
      FINAL_SCORE_KEY,
      this.player.scoreText.score.toString()
    );

    this.scene.start("GameOver");
  }

  generateUfos() {
    this.ufoGroup = this.physics.add.group();

    for (let i = 0; i < 10; i++) {
      const randomY = Phaser.Math.Between(0, UFO_MAX_INIT_Y);
      const newUfo = new Ufo(this, (this.gameWidth / 10) * i, -randomY, i);
      this.ufoGroup.add(newUfo);
    }

    this.physics.add.overlap(
      this.weaponPulses,
      this.ufoGroup,
      this.detectCollision,
      null,
      this
    );
  }

  detectCollision(weaponPulse: SpriteWithDynamicBody, ufo: Ufo) {
    if (ufo.isExploding) {
      return;
    }

    weaponPulse.destroy(true);
    ufo.explodeUfo();
    this.player.increaseScore(this.currentDiffLevel.scoreAmt);
  }
}
