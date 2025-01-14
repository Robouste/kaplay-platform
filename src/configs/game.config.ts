import { ButtonBinding } from "kaplay/dist/declaration/app";
import { HeroInput } from "../enums/hero/hero-input.type";

export class GameConfig {
  public static get groundHeight(): number {
    return height() / 2;
  }

  public static get soundVolume(): number {
    return this._soundVolume;
  }
  public static set soundVolume(value: number) {
    this._soundVolume = value;
  }

  public static get musicVolume(): number {
    return this._musicVolume;
  }
  public static set musicVolume(value: number) {
    this._musicVolume = value;
  }

  public static get ambientSoundVolume(): number {
    return this._ambientSoundVolumne;
  }
  public static set ambientSoundVolume(value: number) {
    this._ambientSoundVolumne = value;
  }

  public static get buttonsConfig(): Record<HeroInput, ButtonBinding> {
    return {
      [HeroInput.JUMP]: {
        keyboard: ["up"],
        gamepad: ["south"],
      },
      [HeroInput.SHOOT]: {
        keyboard: ["space"],
        gamepad: ["rtrigger"],
      },
      [HeroInput.MOVE_RIGHT]: {
        keyboard: ["right"],
        gamepad: ["dpad-right"],
      },
      [HeroInput.MOVE_LEFT]: {
        keyboard: ["left"],
        gamepad: ["dpad-left"],
      },
    };
  }

  private static _soundVolume = 1;
  private static _musicVolume = 1;
  private static _ambientSoundVolumne = 0.6;
}
