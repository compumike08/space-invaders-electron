import { BaseScene } from "./BaseScene";
import type { Menu } from "./Menu";

export const DIFFICULTY_SELECTED_KEY = "DIFFICULTY_SELECTED_KEY";

export class DifficultySelectScene extends BaseScene {
  fontSize: number;
  lineHeight: number;
  fontOptions: {
    fontSize: string;
    fill: string;
  };

  constructor() {
    super("DifficultySelectScene");

    this.fontSize = 32;
    this.lineHeight = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: "#fff"
    };
  }

  create() {
    this.createMenu(
      this.allDifficultyLevels.map((level) => {
        return {
          text: level.levelName
        };
      }),
      (menuItem: Menu) => this.setupMenuEvents(menuItem),
      {
        fontSize: this.fontSize,
        lineHeight: this.lineHeight,
        fontOptions: this.fontOptions
      }
    );
  }

  setupMenuEvents(menuItem: Menu) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({
        fill: "#ff0"
      });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({
        fill: "#fff"
      });
    });

    textGO.on("pointerup", () => {
      const currDiffLevel = this.allDifficultyLevels.find(
        (level) => level.levelName === menuItem.text
      );
      if (currDiffLevel === undefined || currDiffLevel === null) {
        throw new Error("Invalid menu option selected");
      }

      localStorage.setItem(DIFFICULTY_SELECTED_KEY, currDiffLevel.levelName);

      this.scene.start("Game");
    });
  }
}
