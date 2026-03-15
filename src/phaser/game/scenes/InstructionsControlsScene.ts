import { BaseScene } from "./BaseScene";
import type { FontConfig } from "./Menu";

export class InstructionsControlsScene extends BaseScene {
  textContainer: Phaser.GameObjects.Container;

  constructor() {
    super("InstructionsControlsScene");
  }

  init() {
    const headerConfigFontSize = 30;
    const headerTextFontConfig: FontConfig = {
      fontSize: headerConfigFontSize,
      lineHeight: 40,
      fontOptions: {
        fontSize: `${headerConfigFontSize}px`,
        fill: "#fff"
      }
    };

    const bodyConfigFontSize = 16;
    const bodyTextFontConfig: FontConfig = {
      fontSize: bodyConfigFontSize,
      lineHeight: 20,
      fontOptions: {
        fontSize: `${bodyConfigFontSize}px`,
        fill: "#fff"
      }
    };

    const headerText = this.add
      .text(0, 0, "Instructions/Controls", headerTextFontConfig)
      .setOrigin(0.5);

    const bodyLine1 = this.add
      .text(
        0,
        80,
        "- Press left arrow key to move player ship left\n- Press right arrow key to move player ship right\n- Press spacebar to fire weapon upwards when weapon power bar is green\n- Press 'n' key to fire Nova Blast when special power bar is green\n- Press 't' key to trigger Time Freeze when special power bar is green\n- Press 'w' key to trigger Weapon Boost when special power bar is green\n- You will lose a life every time a ufo reaches the bottom of the screen\n- Your score will increase by one every time you destory a ufo",
        bodyTextFontConfig
      )
      .setOrigin(0.5);

    const backButton = this.add
      .text(0, 180, "Back", headerTextFontConfig)
      .setOrigin(0.5)
      .setInteractive();

    backButton.on("pointerover", () => {
      backButton.setStyle({
        fill: "#ff0"
      });
    });

    backButton.on("pointerout", () => {
      backButton.setStyle({
        fill: "#fff"
      });
    });

    backButton.on("pointerup", () => {
      this.scene.start("MainMenu");
    });

    this.textContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 3,
      [headerText, bodyLine1, backButton]
    );
  }
}
