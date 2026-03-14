import { BEST_SCORE_KEY, FINAL_SCORE_KEY } from "../constants/constants";
import { BaseScene } from "./BaseScene";

export class GameOver extends BaseScene {
  textContainer: Phaser.GameObjects.Container;
  finalScore: number;
  bestScore: number;

  constructor() {
    super("GameOver");
  }

  init() {
    this.finalScore = -1;
    this.bestScore = -1;

    const finalScoreString = localStorage.getItem(FINAL_SCORE_KEY);

    if (
      finalScoreString !== null &&
      finalScoreString !== undefined &&
      finalScoreString.length > 0
    ) {
      this.finalScore = parseInt(finalScoreString, 10);
    }

    const bestScoreString = localStorage.getItem(BEST_SCORE_KEY);

    if (
      bestScoreString !== null &&
      bestScoreString !== undefined &&
      bestScoreString.length > 0
    ) {
      this.bestScore = parseInt(bestScoreString, 10);
    }

    if (this.bestScore < this.finalScore) {
      localStorage.setItem(BEST_SCORE_KEY, this.finalScore.toString());
    }
  }

  create() {
    const gameOverText = this.add.text(0, 0, "Game Over", {
      fontFamily: "Arial Black",
      fontSize: 40,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center"
    });
    gameOverText.setOrigin(0.5);

    const endingScoreText = this.add.text(
      0,
      42,
      `Final Score ${this.finalScore < 0 ? "error" : this.finalScore}`,
      {
        fontFamily: "Arial Black",
        fontSize: 35,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
        align: "center"
      }
    );
    endingScoreText.setOrigin(0.5);

    const bestScoreText = this.add.text(
      0,
      84,
      `Previous Best Score: ${this.bestScore === -1 ? "none" : this.bestScore}`,
      {
        fontFamily: "Arial Black",
        fontSize: 35,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
        align: "center"
      }
    );
    bestScoreText.setOrigin(0.5);

    this.textContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2,
      [gameOverText, endingScoreText, bestScoreText]
    );

    this.input.once("pointerup", () => {
      this.scene.start("MainMenu");
    });
  }
}
