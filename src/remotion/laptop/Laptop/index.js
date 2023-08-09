import { useMemo } from "react";
import {
  AbsoluteFill,
  Video,
  Img,
  useCurrentFrame,
  interpolate,
  Easing,
  Audio,
} from "remotion";

const Laptop = ({ video, audio, bgVideo, bgImage, bgType }) => {
  const frame = useCurrentFrame();

  const keyframes = {
    0: {
      scale: 0.94,
      translateX: 18,
      translateY: 263,
      width: 505,
      height: 320,
      easing: Easing.bezier(0.57, 0.46, 0.53, 0.53),
    },
    240: {
      scale: 1.15,
      translateX: 41,
      translateY: 210,
      width: 500,
      height: 320,
    },
    300: {
      scale: 1.21,
      translateX: 33,
      translateY: 200,
      width: 500,
      height: 320,
    },
  };

  const currentFromKeyframe = useMemo(() => {
    const keyframeValues = Object.values(keyframes);
    const keyframeFrames = Object.keys(keyframes).map((v) => Number(v));

    const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
      ([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
        toBeCheckedFrame <= frame
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
              frame,
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
    <AbsoluteFill>
      {/* Laptop Video */}
      {(bgType === 'image') ? 
        <Img src={ bgImage || "https://magic-remotion.s3.amazonaws.com/magic-remotion/bg.png" } />
      : 
        <Video src={ bgVideo || "https://travel-content-studio.s3.amazonaws.com/Plasma.mp4" } />
      }
      {/* <Audio src={ audio || "https://travel-content-studio.s3.amazonaws.com/default.mp3" } loop /> */}

      {/* Screen Video */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: "500px",
          transform: `
          scale(${currentFromKeyframe?.scale ?? 1})
          translateX(${currentFromKeyframe?.translateX ?? 0}px)
          translateY(${currentFromKeyframe?.translateY ?? 0}px)
          `,
          width: currentFromKeyframe?.width ?? 1,
          height: currentFromKeyframe?.height ?? 1,
          overflow: "hidden",
          outline: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <Video
          src={ video || "https://travel-content-studio.s3.amazonaws.com/Clouds.mp4" }
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Laptop;
