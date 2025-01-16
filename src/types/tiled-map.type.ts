export type TiledMap = {
  compressionlevel: number;
  height: number;
  infinite: boolean;
  layers: Layer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: Tileset[];
  tilewidth: number;
  type: string;
  version: string;
  width: number;
};

export type LayerType = "tilelayer" | "objectgroup";

export interface BaseLayer<LayerType> {
  id: number;
  name: string;
  opacity: number;
  type: LayerType;
  visible: boolean;
  x: number;
  y: number;
}

export interface TileLayer extends BaseLayer<"tilelayer"> {
  chunks?: Chunk[];
  data: number[];
  height: number;
  width: number;
  startx: number;
  starty: number;
}

export interface ObjectLayer extends BaseLayer<"objectgroup"> {
  draworder: string;
  objects: TileObject[];
}

export type Layer = TileLayer | ObjectLayer;

export interface Chunk {
  data: number[];
  height: number;
  width: number;
  x: number;
  y: number;
}

export type ObjectGroup = "collider" | "position";

export interface BaseObject<ObjectGroup> {
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: ObjectGroup;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

export interface ColliderObject extends BaseObject<"collider"> {}

export interface PositionObject extends BaseObject<"position"> {
  pointer: true;
}

export type TileObject = ColliderObject | PositionObject;

export interface Tileset {
  columns: number;
  firstgid: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tileheight: number;
  tilewidth: number;
}
