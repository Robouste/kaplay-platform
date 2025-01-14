import { HeroGameObj } from "../../game-objects/hero.game-object";
import { GameEventTag } from "../../tags";

export class HeroInputHandler {
  private _isLeftStickPushingLeft = false;
  private _isLeftStickPushingRight = false;

  constructor(hero: HeroGameObj) {
    onGamepadStick("left", (value) => {
      this._isLeftStickPushingLeft = value.x < -0.5;
      this._isLeftStickPushingRight = value.x > 0.5;

      if (this._isLeftStickPushingLeft) {
        hero.trigger(GameEventTag.HERO_MOVE_LEFT);
      }
      if (this._isLeftStickPushingRight) {
        hero.trigger(GameEventTag.HERO_MOVE_RIGHT);
      }
    });
  }

  public isMovingRight(): boolean {
    return (
      isKeyDown("right") ||
      isGamepadButtonDown("dpad-right") ||
      this._isLeftStickPushingRight
    );
  }

  public isMovingLeft(): boolean {
    return (
      isKeyDown("left") ||
      isGamepadButtonDown("dpad-left") ||
      this._isLeftStickPushingLeft
    );
  }
}
