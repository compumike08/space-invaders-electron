import { BaseScene } from "./BaseScene";
import { Menu } from "./Menu";

export class MainMenu extends BaseScene {
  menu: Array<Menu>;
  fontSize: number;
  lineHeight: number;
  fontOptions: {
    fontSize: string;
    fill: string;
  };

  constructor() {
    super("MainMenu");

    this.fontSize = 32;
    this.lineHeight = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: "#fff"
    };

    this.menu = [
      {
        scene: "DifficultySelectScene",
        text: "Play"
      },
      {
        scene: "InstructionsControlsScene",
        text: "Instructions/Controls"
      }
    ];
  }

  create() {
    this.createMenu(
      this.menu,
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
      menuItem.scene && this.scene.start(menuItem.scene);
    });
  }
}
