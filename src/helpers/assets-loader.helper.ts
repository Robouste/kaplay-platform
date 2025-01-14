import { SpriteTag } from "../tags";

export class AssetsLoader {
  public static loadSprites(): void {
    loadSprite(SpriteTag.HERO, "sprites/hero/hero-spritesheet.png", {
      sliceX: 5,
      sliceY: 4,
      anims: {
        idle: { from: 0, to: 3, loop: true, speed: 7 },
        walk: { from: 5, to: 8, loop: true },
        hurt: { from: 10, to: 11 },
        die: { from: 12, to: 13 },
        shoot: { from: 15, to: 19, speed: 15 },
      },
    });

    loadSprite(SpriteTag.PROJECTILE_ARROW, "sprites/projectiles/arrow.png");
  }

  public static loadSounds(): void {}
}
