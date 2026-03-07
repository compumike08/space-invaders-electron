export interface Menu {
    text: string;
    scene?: string;
    textGO?: Phaser.GameObjects.Text;
}

export interface FontConfig {
    fontSize: number;
    lineHeight: number;
    fontOptions: {
        fontSize: string;
        fill: string;
    }
}
