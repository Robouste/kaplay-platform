import { spriteConfig } from "../configs/sprite-assets.config";
import { SoundTag, SpriteTag } from "../tags";
import { AmbientSoundTag } from "../tags/ambient-sound.tag";
import { TiledMapTag } from "../tags/tile-map.tag";

export class AssetsLoader {
  public loadSprites(): void {
    Object.keys(spriteConfig).forEach((key) => {
      const tag = key as SpriteTag;
      loadSprite(tag, spriteConfig[tag].path, spriteConfig[tag].options);
    });
  }

  public loadMaps(): void {
    loadJSON(TiledMapTag.FOREST, "tiled-maps/forest-map.json");
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
}
