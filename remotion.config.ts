import { Config } from "remotion";
import { enableSass } from "./src/enable-sass";


Config.Bundling.overrideWebpackConfig(enableSass);
Config.Bundling.setCachingEnabled(false);
Config.Log.setLevel("verbose");
