import AngledPresentation from "./AngledPresentation";

export const config = {
  id: "angled-presentation",
  title: "Angled Presentation",
  durationInFrames: 300,
  extraDuration: 0,
  fps: 30,
  template: AngledPresentation,
  defaultProps: {
    bgType: "video",
    bgVideo: "",
    bgImage: "",
    video: "",
    audio: "",
  },
  height: 600,
  width: 1066,
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
