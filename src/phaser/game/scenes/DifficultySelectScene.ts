import { DIFFICULTY_SELECTED_KEY } from '../constants/constants';
import { BaseScene } from './BaseScene';
import { Menu } from './Menu';

export class DifficultySelectScene extends BaseScene
{
    fontSize: number;
    lineHeight: number;
    fontOptions: {
        fontSize: string;
        fill: string;
    }
    menu: Array<Menu>;

    constructor ()
    {
        super('DifficultySelectScene');

        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {
            fontSize: `${this.fontSize}px`,
            fill: '#fff'
        };
    }

    create() {
        this.createMenu(this.allDifficultyLevels.map(level => {
            return {
                text: level.levelName
            };
        }), (menuItem: Menu) => this.setupMenuEvents(menuItem));
    }

    createMenu(menu: Array<Menu>, setupMenuEvents: Function) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.gameWidth / 2, this.gameHeight / 2 + lastMenuPositionY];
            menuItem.textGO = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions)
                .setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem);
        });
    }

    setupMenuEvents(menuItem: Menu) {
        const textGO = menuItem.textGO;
        textGO.setInteractive();

        textGO.on('pointerover', () => {
            textGO.setStyle({
                fill: '#ff0'
            });
        });

        textGO.on('pointerout', () => {
            textGO.setStyle({
                fill: '#fff'
            });
        });

        textGO.on('pointerup', () => {
            const currDiffLevel = this.allDifficultyLevels.find(level => level.levelName === menuItem.text);
            if (currDiffLevel === undefined || currDiffLevel === null) {
                throw new Error("Invalid menu option selected");
            }

            localStorage.setItem(DIFFICULTY_SELECTED_KEY, currDiffLevel.levelName);

            this.scene.start("Game");
        });
    }
}
