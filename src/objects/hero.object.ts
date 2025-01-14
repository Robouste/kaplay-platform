import { GameConfig } from "../configs/game.config";
import { HeroGameObj, HeroParams } from "../game-objects/hero.game-object";
import { SpriteTag } from "../tags";

export class Hero {
  public gameObj: HeroGameObj;

  private _height = 60;
  private _width = 60;
  private _typeHelper;
  private _isShooting = false;

  constructor() {
    this.gameObj = this._typeHelper = make([
      sprite(SpriteTag.HERO, {
        height: this._height,
      }),
      pos(128, GameConfig.groundHeight - 128),
      area({
        shape: new Rect(vec2(0), this._width, this._height),
      }),
      body(),
      {
        direction: RIGHT,
      } satisfies HeroParams,
    ]);

    this.gameObj.play("idle");
    this.gameObj.onAnimEnd(() => (this._isShooting = false));

    this.handleInputs();
  }

  public add(): void {
    add(this.gameObj);
  }

  private handleInputs(): void {
    onKeyPress("space", () => {
      if (this._isShooting) {
        console.log("is shooting");
        return;
      }

      this._isShooting = true;
      this.shoot();
      this.gameObj.play("shoot", {
        onEnd: () => wait(0, () => this.gameObj.play("idle")),
      });
    });
    onKeyPress("right", () => {
      this.gameObj.flipX = false;
      this.gameObj.play("walk");
      this.gameObj.area.offset = vec2(0);
      this.gameObj.direction = RIGHT;
    });
    onKeyPress("left", () => {
      this.gameObj.flipX = true;
      this.gameObj.play("walk");
      this.gameObj.area.offset = vec2(12, 0);
      this.gameObj.direction = LEFT;
    });
    onKeyRelease(["right", "left"], () => this.gameObj.play("idle"));

    this.gameObj.onUpdate(() => {
      const currentAnimName = this.gameObj.getCurAnim()?.name;

      if (isKeyDown("right")) {
        if (!["walk", "shoot"].includes(currentAnimName ?? "")) {
          this.gameObj.play("walk");
        }
        this.gameObj.move(200, 0);
      }
      if (isKeyDown("left")) {
        if (!["walk", "shoot"].includes(currentAnimName ?? "")) {
          this.gameObj.play("walk");
        }
        this.gameObj.move(-200, 0);
      }
    });
  }

  private shoot(): void {
    const arrow = make([
      sprite(SpriteTag.PROJECTILE_ARROW),
      pos(this.gameObj.pos.x, this.gameObj.pos.y + this._height / 2),
      area(),
      move(this.gameObj.direction, 1000),
      offscreen({
        destroy: true,
      }),
    ]);

    arrow.onDestroy(() => console.log("destroyed"));

    add(arrow);
  }
}
