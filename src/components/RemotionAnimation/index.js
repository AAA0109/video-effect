import { useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { md5 } from "pure-md5";
const Animation = (props) => {
  let uniqid =
    "c_" +
    md5(
      Object.keys(props)
        .map((key) => {
          if (key != "children") {
            return key + JSON.stringify(props[key]);
          }
        })
        .join(" ")
    ).substr(0, 8);

  let { children, duration = null, delay = 0, style, animateName = null } = props;
  if (animateName != null) {
    uniqid = animateName;
  }
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  if (duration == null) duration = durationInFrames / fps;
  let currentFrame = 0;
  if (frame/fps >= delay)
    currentFrame = (frame / fps < duration + delay) ? frame / fps - delay : duration - 0.00001;
  const convertCss = (cssObject) =>
    typeof cssObject === "string"
      ? cssObject
      : Object.keys(cssObject).reduce((accumulator, key) => {
          const cssKey = key.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`);
          const cssValue = cssObject[key].toString().replace("'", "");
          return `${accumulator}${cssKey}:${cssValue};`;
        }, "");
  return (
    <div style={{width:"100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <style>
        {animateName == null
          ? `@keyframes ${uniqid} {
        ${Object.keys(props)
          .map((key) => {
            return ["from", "to"].includes(key)
              ? `${key} { ${convertCss(props[key])} }`
              : /^f[0-9]+$/.test(key)
              ? `${key.replace("f", "")}% { ${convertCss(props[key])} }`
              : "";
          })
          .join(" ")}
      }`
          : ""}
      </style>
      <div
        style={{
          width:"100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          ...style,
          animationPlayState: "paused",
          animationName: uniqid,
          animationDelay: `-${currentFrame}s`,
          animationDuration: `${duration}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
export { Animation };
