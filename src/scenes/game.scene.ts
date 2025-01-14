import { GameConfig } from "../configs/game.config";
import { Hero } from "../objects/hero.object";

export class GameScene {
  constructor() {
    onKeyPress(["d"], () => {
      if (isKeyDown("shift")) {
        debug.inspect = !debug.inspect;
      }
    });

    setGravity(1600);
    debug.inspect = true;

    const hero = new Hero();
    hero.add();

    this.addBackground();
    this.addGround();
  }

  private addBackground(): void {
    add([rect(width(), height()), color(25, 25, 125), z(-1)]);
  }

  private addGround(): void {
    add([
      rect(width(), GameConfig.groundHeight),
      pos(0, height() - GameConfig.groundHeight),
      area(),
      body({
        isStatic: true,
      }),
      color(0, 0, 0),
    ]);
  }
}
