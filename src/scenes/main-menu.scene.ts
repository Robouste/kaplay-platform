export class MainMenuScene {
  constructor() {
    this.buildMenu();
  }

  private buildMenu(): void {
    add([rect(width(), height()), color(25, 25, 25)]);
  }
}
