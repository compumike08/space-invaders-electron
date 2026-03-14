import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { DifficultySelectScene } from "./scenes/DifficultySelectScene";
import { InstructionsControlsScene } from "./scenes/InstructionsControlsScene";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#000000",
  physics: {
    default: "arcade"
  },
  scene: [
    Preloader,
    MainMenu,
    InstructionsControlsScene,
    DifficultySelectScene,
    MainGame,
    GameOver
  ]
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
