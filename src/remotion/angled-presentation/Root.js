import { Composition } from "remotion";
import AngledPresentation from "./AngledPresentation";

export const Root = () => {
  return (
    <Composition
      durationInFrames={300}
      fps={30}
      component={AngledPresentation}
      id="angled-presentation"
      width={1066}
      height={600}
      defaultProps={{
        bgVideo:
          "https://travel-content-studio.s3.amazonaws.com/Clouds.mp4",
        video:
          "https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4",
        audio:
          "https://travel-content-studio.s3.amazonaws.com/default.mp3",
      }}
    />
  );
};
