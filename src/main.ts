import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { AssetsLoader } from "./helpers/";
import { GameScene, MainMenuScene } from "./scenes";
import { SceneTag } from "./tags";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later

AssetsLoader.loadSprites();
AssetsLoader.loadSounds();

scene(SceneTag.MainMenu, () => new MainMenuScene());
scene(SceneTag.Game, () => new GameScene());

go(SceneTag.Game);
