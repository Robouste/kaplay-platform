import { SpriteAnim } from "kaplay";
import { HeroAnimation } from "../enums/hero/hero-animation.type";
import { SoundTag, SpriteTag } from "../tags";
import { AmbientSoundTag } from "../tags/ambient-sound.tag";

export class AssetsLoader {
  public loadSprites(): void {
    loadSprite(SpriteTag.HERO, "sprites/hero/hero-spritesheet.webp", {
      sliceX: 5,
      sliceY: 5,
      anims: this.getHeroAnims(),
    });

    loadSprite(SpriteTag.PROJECTILE_ARROW, "sprites/projectiles/arrow.webp");
  }

  public loadSounds(): void {
    loadSound(SoundTag.ARROW_SHOOT, "sounds/arrow-shoot.ogg");
    loadSound(SoundTag.JUMP, "sounds/jump.ogg");
    loadSound(SoundTag.LAND, "sounds/land.ogg");
  }

  public loadAmbientSounds(): void {
    loadSound(
      AmbientSoundTag.RIVER_FLOWING_INSECT,
      "sounds/ambience/river-flowing-insects.ogg"
    );
  }

  private getHeroAnims(): Record<HeroAnimation, SpriteAnim> {
    return {
      [HeroAnimation.IDLE]: { from: 0, to: 3, loop: true, speed: 7 },
      [HeroAnimation.WALK]: { from: 5, to: 8, loop: true },
      [HeroAnimation.HURT]: { from: 10, to: 11 },
      [HeroAnimation.DIE]: { from: 12, to: 13 },
      [HeroAnimation.SHOOT]: { from: 15, to: 19, speed: 15 },
      [HeroAnimation.JUMP]: { from: 20, to: 22 },
    };
  }
}
