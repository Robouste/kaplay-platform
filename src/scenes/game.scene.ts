import { GameConfig } from "../configs/game.config";
import { Hero } from "../objects/hero/hero.object";
import { SpriteTag } from "../tags";
import { AmbientSoundTag } from "../tags/ambient-sound.tag";
import { ObjectLayer, TiledMap } from "../types/";

export class GameScene {
  private _hero: Hero;

  constructor() {
    play(AmbientSoundTag.RIVER_FLOWING_INSECT, {
      volume: GameConfig.ambientSoundVolume,
      loop: true,
    });

    setGravity(1600);
    debug.inspect = true;
    this._hero = new Hero();
    this._hero.add();

    this.addMap();
  }

  private addMap(): void {
    onDraw(() => {
      drawSprite({
        sprite: SpriteTag.MAP_FOREST,
        pos: vec2(0, 0),
        anchor: "topleft",
        height: height(),
      });
    });

    // add([sprite(SpriteTag.MAP_FOREST), pos(100, 200)]);

    const asset = getAsset("forest-tiled-map_json");

    if (!asset) {
      throw Error("Tiled map asset not found");
    }

    asset.onLoad(() => {
      this.generateMap(asset.data);
    });
  }

  private generateMap(tiledMap: TiledMap): void {
    const tileLayers = tiledMap.layers.filter(
      (layer) => layer.type === "tilelayer"
    );

    if (tileLayers.length === 0) {
      throw Error("Tile layers not found");
    }

    // I don't know why, but the height property at the root is just wrong.
    const mapHeight = tileLayers[0].height * tiledMap.tilewidth;
    const mapRatio = this.getMapRatio(mapHeight);

    const objectGroups = tiledMap.layers.filter<ObjectLayer>(
      (layer) => layer.type === "objectgroup"
    );
    const colliderLayer = objectGroups.find(
      (layer) => layer.name === "Colliders"
    );

    if (!colliderLayer) {
      throw Error("Colliders layer not found");
    }

    for (const obj of colliderLayer.objects) {
      const collider = add([
        rect(obj.width * mapRatio, obj.height * mapRatio),
        pos(obj.x * mapRatio, obj.y * mapRatio),
        area(),
        body({
          isStatic: true,
        }),
        rotate(obj.rotation),
        opacity(0),
        obj.name,
      ]);
    }

    this._hero.gameObj.onCollideUpdate("stairs", () => {
      if (!this._hero.isMovingRight && !this._hero.isMovingLeft) {
        this._hero.gameObj.vel.x = 0;
      } else if (this._hero.isMovingLeft || this._hero.isMovingRight) {
        const direction = this._hero.isMovingLeft ? -1 : 1;
        this._hero.gameObj.vel.x = direction * this._hero.speed;
      }
    });
  }

  private getMapRatio(mapHeight: number): number {
    return height() / mapHeight;
  }
}
