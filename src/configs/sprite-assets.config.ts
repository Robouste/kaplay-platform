import { SpriteAnim } from "kaplay";
import { HeroAnimation } from "../enums/hero/hero-animation.type";
import { SpriteTag } from "../tags";
import { SpriteAsset } from "../types/sprite-asset.type";

const getHeroAnims = (): Record<HeroAnimation, SpriteAnim> => {
  return {
    [HeroAnimation.IDLE]: { from: 0, to: 3, loop: true, speed: 7 },
    [HeroAnimation.WALK]: { from: 5, to: 8, loop: true },
    [HeroAnimation.HURT]: { from: 10, to: 11 },
    [HeroAnimation.DIE]: { from: 12, to: 13 },
    [HeroAnimation.SHOOT]: { from: 15, to: 19, speed: 15 },
    [HeroAnimation.JUMP]: { from: 20, to: 22 },
  };
};

export const spriteConfig: Record<SpriteTag, SpriteAsset> = {
  [SpriteTag.HERO]: {
    path: "sprites/hero/hero-spritesheet.webp",
    options: {
      sliceX: 5,
      sliceY: 5,
      anims: getHeroAnims(),
    },
  },
  [SpriteTag.PROJECTILE_ARROW]: {
    path: "sprites/projectiles/arrow.webp",
  },
  [SpriteTag.MAP_FOREST]: {
    path: "tiled-maps/forest-map.webp",
  },
  [SpriteTag.FOREST_BACKGROUND_DAY_1]: {
    path: "sprites/forest/background-day-1.webp",
  },
  [SpriteTag.FOREST_BACKGROUND_DAY_2]: {
    path: "sprites/forest/background-day-2.webp",
  },
  [SpriteTag.FOREST_BACKGROUND_DAY_3]: {
    path: "sprites/forest/background-day-3.webp",
  },
  [SpriteTag.FOREST_BACKGROUND_DAY_4]: {
    path: "sprites/forest/background-day-4.webp",
  },
};
