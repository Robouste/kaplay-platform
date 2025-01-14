import { GameConfig } from "../../configs/game.config";
import { HeroAnimation } from "../../enums/hero/hero-animation.type";
import { HeroInput } from "../../enums/hero/hero-input.type";
import { HeroGameObj, HeroParams } from "../../game-objects/hero.game-object";
import { GameHelper } from "../../helpers/game.helper";
import { SoundTag, SpriteTag } from "../../tags";
import { GameSceneTag } from "../../tags/game-scene.tag";

export class Hero {
  public gameObj: HeroGameObj;

  private _spriteHeight = 70;
  private _hitboxWidth = 60;
  private _hitboxHeight = 60;
  private _isJumping = false;
  private _typeHelper;

  constructor() {
    this.gameObj = this._typeHelper = make([
      sprite(SpriteTag.HERO, {
        height: this._spriteHeight,
        anim: HeroAnimation.IDLE,
      }),
      pos(128, GameConfig.groundHeight - 128),
      area({
        shape: new Rect(vec2(0), this._hitboxWidth, this._hitboxHeight),
      }),
      body(),
      anchor("botleft"),
      {
        direction: RIGHT,
      } satisfies HeroParams,
    ]);

    this.handleInputs();
  }

  public add(): void {
    add(this.gameObj);
  }

  private handleInputs(): void {
    onGamepadButtonPress((btn) => console.log("btn", btn));

    //~ Bind left/right stick
    onGamepadStick("left", (stick) => {
      if (stick.x > 0.5) {
        pressButton(HeroInput.MOVE_RIGHT);
      }

      if (stick.x < -0.5) {
        pressButton(HeroInput.MOVE_LEFT);
      }
    });

    //~ Move right
    onButtonPress(HeroInput.MOVE_RIGHT, () => {
      if (this.gameObj.isGrounded()) {
        this.animate(HeroAnimation.WALK);
      }
      this.gameObj.area.offset = vec2(0);
      this.gameObj.direction = RIGHT;
    });

    //~ Move left
    onButtonPress(HeroInput.MOVE_LEFT, () => {
      if (this.gameObj.isGrounded()) {
        this.animate(HeroAnimation.WALK);
      }
      this.gameObj.area.offset = vec2(12, 0);
      this.gameObj.direction = LEFT;
    });

    onButtonPress(HeroInput.JUMP, () => {
      if (this.gameObj.isGrounded()) {
        this._isJumping = true;
        this.animate(HeroAnimation.JUMP);
        this.gameObj.jump();
        play(SoundTag.JUMP, {
          volume: GameConfig.soundVolume,
        });
      }
    });

    onButtonPress(HeroInput.SHOOT, () => {
      this.shoot();
      this.animate(HeroAnimation.SHOOT);
    });

    this.gameObj.onUpdate(() => {
      const isGrounded = this.gameObj.isGrounded();
      const isMovingRight =
        isButtonDown(HeroInput.MOVE_RIGHT) || getGamepadStick("left").x > 0.5;
      const isMovingLeft =
        isButtonDown(HeroInput.MOVE_LEFT) || getGamepadStick("left").x < -0.5;

      if (isGrounded) {
        if (isMovingRight || isMovingLeft) {
          this.animate(HeroAnimation.WALK, {
            exceptIf: HeroAnimation.SHOOT,
          });
        } else {
          this.animate(HeroAnimation.IDLE, {
            exceptIf: HeroAnimation.SHOOT,
          });
        }

        //~ is landing
        if (this._isJumping) {
          this._isJumping = false;
          play(SoundTag.LAND, {
            volume: GameConfig.soundVolume,
          });
        }
      }

      if (isMovingRight) {
        this.gameObj.direction = RIGHT;
        this.gameObj.flipX = false;
        this.gameObj.move(200, 0);
      }
      if (isMovingLeft) {
        this.gameObj.direction = LEFT;
        this.gameObj.flipX = true;
        this.gameObj.move(-200, 0);
      }
    });
  }

  private shoot(): void {
    const arrow = make([
      sprite(SpriteTag.PROJECTILE_ARROW),
      pos(this.gameObj.pos.x, this.gameObj.pos.y + -this._hitboxHeight / 2),
      area(),
      move(this.gameObj.direction, 1500),
      offscreen({
        destroy: true,
      }),
      GameSceneTag.TO_DESTROY,
    ]);

    play(SoundTag.ARROW_SHOOT, {
      volume: GameConfig.soundVolume,
    });
    add(arrow);
  }

  private animate(
    animation: HeroAnimation,
    params?: {
      exceptIf?: HeroAnimation;
    }
  ): void {
    GameHelper.playAnim(this.gameObj, animation, params);
  }
}
