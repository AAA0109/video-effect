import Laptop from "./Laptop";

export const config = {
  id: "laptop",
  title: "Laptop Zoom",
  durationInFrames: 300,
  extraDuration: 0,
  fps: 30,
  template: Laptop,
  defaultProps: {
    bgType: "video",
    bgVideo: "",
    bgImage: "",
    video: "",
    audio: "",
  },
  height: 800,
  width: 1516,
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
  ],
};
