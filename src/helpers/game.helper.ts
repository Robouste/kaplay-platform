import { GameObj, SpriteComp } from "kaplay";

export type AnimationName = string;

export class GameHelper {
  public static playAnim(
    game: GameObj<SpriteComp>,
    anim: AnimationName,
    params?: {
      exceptIf?: AnimationName | AnimationName[];
    }
  ): void {
    const currentAnimation = game.getCurAnim()?.name;

    if (!currentAnimation) {
      game.play(anim);
      return;
    }

    const exceptIf: string[] = [];

    if (params?.exceptIf) {
      if (Array.isArray(params.exceptIf)) {
        exceptIf.push(...params.exceptIf);
      } else {
        exceptIf.push(params.exceptIf);
      }
    }

    if (currentAnimation === anim || exceptIf.includes(currentAnimation)) {
      return;
    }

    game.play(anim);
  }
}
