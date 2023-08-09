import { Composition } from "remotion";
import LogoReveal from "./LogoReveal";

const Root = () => {
  return (
    <Composition
      component={LogoReveal}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
      id="quick-teaser"
      borderRadius={30}
    />
  );
};

export default Root;
