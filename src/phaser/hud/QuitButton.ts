import { Scene } from "phaser";

export class QuitButton {
  x: number;
  y: number;
  quitButtonText: Phaser.GameObjects.Text;

  constructor(scene: Scene, x: number, y: number, handleQuitClicked: Function) {
    this.x = x;
    this.y = y;

    this.quitButtonText = scene.add.text(this.x, this.y, "Quit", {
      fontFamily: "Arial Black",
      fontSize: 30,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center"
    });
    this.quitButtonText.setOrigin(1, 0).setDepth(5).setInteractive();

    this.quitButtonText.on("pointerup", () => {
      handleQuitClicked();
    });
  }
}
