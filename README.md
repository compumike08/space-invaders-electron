# Space Invaders (Electron App)

This game is a remake of the old space invaders arcade game.

## Installation Instructions

1. Download the correct installer file for your operating system type from this repository's [latest release](https://github.com/compumike08/space-invaders-electron/releases/latest) page.
2. Run the installer file to install the game on your computer.
3. Run the game file (an icon should have been created in the default location during the prior step).

## Gameplay Instructions

Once you start the application, click "Play", then select a difficulty level. Then the game starts.

### Keyboard Controls

- Press the left arrow key to move your player ship to the left
- Press the right arrow key to move your player ship to the right
- Press the spacebar to fire your weapon upwards from your ship
- Press the `n` key to trigger the [Nova Blast](#nova-blast) special ability
- Press the `t` key to trigger the [Time Freeze](#time-freeze) special ability
- Press the `w` key top trigger the [Weapon Boost](#weapon-boost) special ability

### Weapon Power Bar

In the upper left corner of the screen there is a bar labeled "Weapon Power". When the bar is full and green, you can fire your weapon. Firing deletes the power to zero, which drains the bar. There is a brief recharge time, during which the bar will be red, and start filling back up. Once the bar is full it turns green again, and you can fire again.

### Special Power Bar

In the upper left corner of the screen there is a bar labeled "Special Power". When the bar is full and green, you can use a special ability (see [Special Abilities](#special-abilities) below).

### Special Abilities

#### Nova Blast

By pressing the `n` key on the keyboard when the special power bar is full, you can activate the Nova Blast ability. When activated, Nova Blast will instantly destory all Ufos that are currently on the screen.

#### Time Freeze

By pressing the `t` key on the keyboard when the special power bar is full, you can activate the Time Freeze ability. When activated, all of the ufos on the screen will freeze. You can still move around and fire your weapon to destory the frozen ufos. Time will resume after about 10 seconds.

_NOTE: While time is frozen, the weapon power bar will continue to recharge, but the special power bar will remain at zero until time resumes._

#### Weapon Boost

By pressing the `w` key on the keyboard when the special power bar is full, you can activate the Weapon Boost ability. When activated, you can fire the main weapon as quickly as you can, without waiting for the weapon power bar to recharge. Weapon Boost will last about 20 seconds.

_NOTE: While Weapon Boost is active, the special power bar will remain at zero until Weapon Boost expires._

### Lives

Each ufo that reaches the bottom of the screen without being shot down reduces your lives by 1. Your remaining lives are shown at the upper left corner of the screen.

### Score

Each ufo you shoot down increases your score by 1. Your current score is shown in the upper left corner of the screen.

### Difficulty Levels

There are three difficulty levels. As you increase the difficulty, the ufos will move down faster and your weapon will take longer to recharge.

## Disclaimer

This game is provided for free on an "as-is" basis. The maker of this game is not responsible for any damages that may occur by installing and/or using this game.

## Copyright

Copyright &copy; 2026 compumike08 - See [LICENSE](LICENSE) file.
