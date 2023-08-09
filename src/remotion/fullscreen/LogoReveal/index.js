import {
  AbsoluteFill,
  Video,
  Img,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Audio,
} from "remotion";
import { Animation } from './RemotionAnimation';
import "animate.css";

import {
  deviceStyle, logoStyle, nameStyle, taglineStyle, detailStyle, deviceContentStyle, animContainerStyle, fullStyle, bgVBStyle
} from "./styles"

const LogoReveal = ({ bgVideo, bgImage, bgType, video, audio, logo, name, tagline, website, phone }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        perspective: "1200px",
      }}
    >
      {/* LogoReveal Video */}

      <AbsoluteFill>
        {/* <Loop durationInFrames={300}> */}
        {(bgType === 'image') ?
          <Img style={bgVBStyle} src={bgImage || "https://magic-remotion.s3.amazonaws.com/magic-remotion/bg.png"} />
          :
          <Video style={bgVBStyle} src={bgVideo || "https://travel-content-studio.s3.amazonaws.com/Plasma.mp4"} />
        }
        {/* <Audio src={ audio || "https://travel-content-studio.s3.amazonaws.com/default.mp3" } /> */}
        {/* </Loop> */}
      </AbsoluteFill>

      {/* Screen Video */}
      {(frame / fps < 10) ?
        <AbsoluteFill style={deviceStyle}>
          <Animation style={animContainerStyle} duration="1" delay={9} animateName="flipOutY">
            <div style={deviceContentStyle}>
              <Animation duration="2" animateName="zoomInDown">
                <img style={logoStyle} src={logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png"} />
              </Animation>
              <Animation duration="2" delay={2} animateName="bounceIn">
                <span style={nameStyle}>{name}</span>
              </Animation>
              <Animation duration="2" delay={3} animateName="bounceIn">
                <span style={taglineStyle}>{tagline}</span>
              </Animation>
            </div>
            <div style={deviceContentStyle}>
              <Animation duration="2" delay={4} animateName="lightSpeedInLeft">
                <span style={detailStyle}>{website}</span>
              </Animation>
              <Animation duration="2" delay={4} animateName="lightSpeedInRight">
                <span style={detailStyle}>{phone}</span>
              </Animation>
            </div>
          </Animation>
        </AbsoluteFill>
        :
        <AbsoluteFill style={{ ...deviceStyle, ...fullStyle }}>
          <Sequence from={10 * fps}>
            <Animation duration="1" animateName="fadeIn">
              <Video src={video || "https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4"} style={{ width: "100%", height: "100%" }} startFrom={0} muted />
            </Animation>
          </Sequence>
        </AbsoluteFill>
      }
    </AbsoluteFill>
  );
};

export default LogoReveal;
