export interface DifficultyLevel {
  levelName: string;
  ufoSpeed: number;
  scoreAmt: number;
  weaponFireCooldown: number; // time in milliseconds
  specialFireCooldown: number; // time in milliseconds
  lives: number;
}
