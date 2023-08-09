import QuickTeaser from "./QuickTeaser";

export const config = {
  id: "quick-teaser",
  title: "Quick Teaser!",
  durationInFrames: 180,
  extraDuration: 0,
  fps: 30,
  template: QuickTeaser,
  defaultProps: {
    bgType: "video",
    bgVideo: "",
    bgImage: "",
    video: "",
    audio: "",
  },
  height: 1080,
  width: 1920,
  authors: ["VS"],
  inputPropsSchema: [
    {
      type: "file",
      defaultValue: "",
      name: "Background Video",
      key: "bgVideo",
    },
    {
      type: "Boolean",
      defaultValue: "video",
      name: "Background Type",
      key: "bgType",
    },
    {
      type: "file",
      defaultValue: "",
      name: "Background Image",
      key: "bgImage",
    },
    {
      type: "file",
      defaultValue: "",
      name: "Video",
      key: "video",
    },
    {
      type: "file",
      defaultValue: "",
      name: "Audio",
      key: "audio",
    },
    {
      type: "number",
      defaultValue: 30,
      name: "Border Radius (px)",
      key: "borderRadius",
      step: 5,
      min: 0,
      max: 200,
    },
  ],
};
