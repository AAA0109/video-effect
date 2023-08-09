import { useMemo } from "react";
import {
  AbsoluteFill,
  Video,
  Img,
  Loop,
  useCurrentFrame,
  interpolate,
  Easing,
  Audio,
} from "remotion";
import {
  wrapperStyles,
  bgVideoStyles,
  deviceStyles,
  deviceVideoStyles,
} from "./index.style";
import MenuBar from "./MenuBar";

const AngledPresentation = ({ bgVideo, bgImage, bgType, video, audio }) => {
  const frame = useCurrentFrame();

  const keyframes = {
    0: {
      z: 330,
      rotateY: -20,
      rotateX: 15,
      rotate: -7,
      easing: Easing.bezier(0, 0, 0, 1),
    },
    60: {
      z: 0,
      rotateY: 0,
      rotateX: 0,
      rotate: 0,
      easing: Easing.linear,
    },
    160: {
      z: 330,
      rotateY: 20,
      rotateX: 15,
      rotate: 7,
      easing: Easing.bezier(0, 0, 0, 1),
    },
    300: {
      z: 0,
      rotateY: 0,
      rotateX: 0,
      rotate: 0,
    },
  };

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes);
    const keyframeFrames = Object.keys(keyframes).map((v) => Number(v));

    const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
      ([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
        toBeCheckedFrame <= frame % 300
          ? [index, toBeCheckedFrame]
          : [lastIndex, makeshiftCurrentFrame],
      [0, 0]
    );

    if (!keyframeValues[currentBaseFrameIndex + 1]) return null;

    const val = Object.keys(keyframeValues[currentBaseFrameIndex])
      .map(
        (key) =>
          key !== "easing" && {
            [key]: interpolate(
              frame % 300,
              [currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]],
              [
                keyframeValues[currentBaseFrameIndex][key],
                keyframeValues[currentBaseFrameIndex + 1][key],
              ],
              {
                easing:
                  keyframeValues[currentBaseFrameIndex]?.easing ??
                  Easing.linear,
              }
            ),
          }
      )
      .reduce((prev, curr) => ({ ...prev, ...curr }));

    return val;
  }, [frame]);

  return (
    <AbsoluteFill style={wrapperStyles}>
      {/* Background Video */}
      <AbsoluteFill>
        {/* <Loop durationInFrames={300}> */}
          {(bgType === 'image') ? 
            <Img style={{ ...bgVideoStyles }} src={ bgImage || "https://magic-remotion.s3.amazonaws.com/magic-remotion/bg.png" } />
          : 
            <Video style={{ ...bgVideoStyles }} src={ bgVideo || "https://travel-content-studio.s3.amazonaws.com/Plasma.mp4" } />
          }
          {/* <Audio src={ audio || "https://travel-content-studio.s3.amazonaws.com/default.mp3" } /> */}
        {/* </Loop> */}
      </AbsoluteFill>

      {/* Device */}
      <div
        style={{
          ...deviceStyles,
          transform: `translateZ(${currentFromKeyframe?.z}px) rotateY(${currentFromKeyframe?.rotateY}deg) rotateX(${currentFromKeyframe?.rotateX}deg) rotate(${currentFromKeyframe?.rotate}deg)`,
        }}
      >
        <MenuBar />
        <Video src={ video || "https://travel-content-studio.s3.amazonaws.com/Clouds.mp4" } style={{ ...deviceVideoStyles }} muted />
      </div>
    </AbsoluteFill>
  );
};

export default AngledPresentation;
