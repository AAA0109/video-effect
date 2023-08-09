import {
  AbsoluteFill,
  Sequence,
  Video,
  Img,
  Audio,
  continueRender,
  delayRender,
  staticFile,
  useVideoConfig,
  useCurrentFrame
} from "remotion";
import "animate.css";
import { useEffect, useState, useCallback } from "react";
import { Lottie } from "@remotion/lottie";
import { Animation } from './RemotionAnimation';
import { convertColorToLottieColor } from "./colorify";

import {
  deviceStyle, animContainerStyle, fullStyle, logoScreenStyle, logoImgStyle, bgVBStyle
} from "./styles";

export const AfterEffect = ({
  bgVideo, bgImage, bgType, video, audio, logo, name, tagline, logoColor
}) => {

  const [animationData, setAnimationData] = useState(null);
  const [wait, setWait] = useState(true);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender("Loading Lottie animation"));

  useEffect(() => {
    const updateAsssets = (json = animationData) => {
      if (!json) return;
      console.log(json);
      const color = convertColorToLottieColor(logoColor.hex || '#FF0000');
      // json = flatten(logoColor.hex || '#FF0000', json);

      json.layers[0].ef[0].ef[0].v.k = color;
      json.layers[0].ef[1].ef[0].v.k = color;
      json.layers[0].ef[2].ef[0].v.k = color;
      json.layers[0].ef[3].ef[0].v.k = color;

      json.assets[0].u = "";
      json.assets[0].p = logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png";
      json.assets[1].u = "";
      json.assets[1].p = logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png";
      json.assets[4].layers[0].t.d.k[0].s.t = (tagline || '').toUpperCase();
      json.assets[5].layers[0].t.d.k[0].s.t = (name || '').toUpperCase();
      setAnimationData({ ...json });
    }

    fetch(staticFile("json/lottie.json"))
      .then((data) => data.json())
      .then((json) => {
        updateAsssets(json);
      })
      .catch((err) => {
        console.log("Animation failed to load", err);
      });
  }, [handle]);

  useEffect(() => {
    const updateAsssets = (json = animationData) => {
      if (!json) return;
      console.log(json);
      const color = convertColorToLottieColor(logoColor.hex || '#FF0000');
      // json = flatten(logoColor.hex || '#FF0000', json);

      json.layers[0].ef[0].ef[0].v.k = color;
      json.layers[0].ef[1].ef[0].v.k = color;
      json.layers[0].ef[2].ef[0].v.k = color;
      json.layers[0].ef[3].ef[0].v.k = color;

      json.assets[0].u = "";
      json.assets[0].p = logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png";
      json.assets[1].u = "";
      json.assets[1].p = logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png";
      json.assets[4].layers[0].t.d.k[0].s.t = (tagline || '').toUpperCase();
      json.assets[5].layers[0].t.d.k[0].s.t = (name || '').toUpperCase();
      setAnimationData({ ...json });
    }

    updateAsssets();
  }, [name, tagline, logo, logoColor])

  useEffect(() => {
    if (!animationData) return;
    setTimeout(() => {
      continueRender(handle);
      setWait(false);
    }, 1000);
  }, [animationData, handle])

  if (!animationData || wait) {
    return null;
  }

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
          <Video style={bgVBStyle} src={bgVideo || "https://travel-content-studio.s3.amazonaws.com/Clouds.mp4"} />
        }
        {/* <Audio src={ audio || "https://travel-content-studio.s3.amazonaws.com/default.mp3" } /> */}
        {/* </Loop> */}
      </AbsoluteFill>

      {/* Screen Video */}
      {(frame / fps < 4) ?
        <AbsoluteFill style={deviceStyle}>
          <Animation style={animContainerStyle} duration="1" delay={3} animateName="flipOutY">
            <Lottie animationData={animationData} />
          </Animation>
        </AbsoluteFill>
        :
        <AbsoluteFill style={{ ...deviceStyle, ...fullStyle }}>
          <Sequence from={4 * fps}>
            <Animation duration="1" animateName="fadeIn">
              {/* Logo Section */}
              <div style={logoScreenStyle}>
                <img src={logo || "https://magic-remotion.s3.amazonaws.com/magic-remotion/logo-placeholder.png"} style={logoImgStyle} alt="Logo" />
              </div>
              <Video src={video || "https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4"} style={{ width: "100%", height: "100%" }} startFrom={0} muted />
            </Animation>
          </Sequence>
        </AbsoluteFill>
      }
    </AbsoluteFill>
  );
};
