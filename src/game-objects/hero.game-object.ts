import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp, Vec2 } from "kaplay";

export type HeroParams = { direction: Vec2 };

export type HeroGameObj = GameObj<
  SpriteComp | PosComp | AreaComp | BodyComp | HeroParams
>;
