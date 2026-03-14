import { BaseScene } from "./BaseScene";

export class Preloader extends BaseScene {
  constructor() {
    super("Preloader");
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("../main_window/static");

    this.load.spritesheet("ufo", "ufo_spritesheet.png", {
      frameWidth: 66,
      frameHeight: 49
    });

    this.load.image("ship", "main_ship.png");

    this.load.image("weapon-pulse", "weapon_pulse.png");

    this.load.spritesheet("explosion", "explosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
