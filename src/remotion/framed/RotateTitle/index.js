import { useEffect } from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  Loop,
  useCurrentFrame,
  Video,
  Img,
  spring,
  interpolate,
  Audio,
} from "remotion";

import {
  wrapperStyle,
  bgVideoStyle,
  deviceStyle,
  titleScreenStyle,
  headingStyle,
  subtitleStyle,
  videoWrapperStyle,
  videoScreenStyle,
  logoScreenStyle,
  logoImgStyle
} from "./styles";

export const RotateTitle = ({
  name,
  tagline,
  logo,
  video,
  bgVideo,
  bgImage,
  bgType,
  audio,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const appear = spring({ fps, frame, config: { mass: 10, damping: 50 } });

  const scale = interpolate(appear, [0, 1], [0, 1]);

  const flip = spring({
    fps,
    frame: frame - 70,
    config: { mass: 10, damping: 50 },
  });

  const flipValue = interpolate(flip, [0, 0.5, 1], [-1, 0, 1]);

  return (
    <AbsoluteFill style={wrapperStyle}>
      {/* Background Video */}
      {/* <Loop durationInFrames={145}> */}
      {(bgType === 'image') ?
        <Img style={bgVideoStyle} src={bgImage || "https://magic-remotion.s3.amazonaws.com/magic-remotion/bg.png"} />
        :
        <Video style={bgVideoStyle} src={bgVideo || "https://travel-content-studio.s3.amazonaws.com/ocean.mp4"} />
      }
      {/* </Loop> */}
      {/* <Audio
        src={
          audio ||
          "https://travel-content-studio.s3.amazonaws.com/default.mp3"
        }
      /> */}

      {/* Logo Section */}
      <div style={logoScreenStyle}>
        <img src={logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png"} style={logoImgStyle} alt="Logo" />
      </div>

      {/* Device */}
      <div
        style={{
          ...deviceStyle,
          transform: `scale(${scale}) rotateY(${90 - Math.abs(flipValue) * 90
            }deg)`,
        }}
      >
        {/* Title Screen */}
        {flipValue < 0 ? (
          <>
            <div style={titleScreenStyle}>
              <h1 style={headingStyle}>{name || "Hello there!"}</h1>
              <p style={subtitleStyle}>{tagline || "We're happy to hear!"}</p>
            </div>
          </>
        ) : (
          <div style={videoWrapperStyle}>
            <Video style={videoScreenStyle} startFrom={0} src={video || "https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4"}
              muted
            />
          </div>
        )}
        {/* Video Screen */}
      </div>
    </AbsoluteFill>
  );
};
