import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { GameConfig } from "./configs/game.config";
import { AssetsLoader } from "./helpers/";
import { GameScene, MainMenuScene } from "./scenes";
import { SceneTag } from "./tags";

kaplay({
  debugKey: "d",
  touchToMouse: false,
  buttons: GameConfig.buttonsConfig,
});

loadRoot("./"); // A good idea for Itch.io publishing later

const assetsLoader = new AssetsLoader();

assetsLoader.loadSprites();
assetsLoader.loadMaps();
assetsLoader.loadSounds();
assetsLoader.loadAmbientSounds();

scene(SceneTag.MainMenu, () => new MainMenuScene());
scene(SceneTag.Game, () => new GameScene());

go(SceneTag.Game);
