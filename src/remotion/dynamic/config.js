import { AfterEffect } from "./AfterEffect";

export const config = {
  id: "after-effect",
  title: "Dynamic",
  durationInFrames: 300,
  extraDuration: 4,
  fps: 30,
  template: AfterEffect,
  defaultProps: {
    bgType: "video"
  },
  height: 600,
  width: 1066,
  authors: ["VS"],
  inputPropsSchema: [
    {
      type: "file",
      defaultValue: "",
      defaultRef: "profile",
      accept: 'image/*',
      name: "Logo",
      key: "logo",
    },
    {
      type: "text",
      defaultValue: "",
      defaultRef: "profile",
      name: "Business Name",
      key: "name",
    },
    {
      type: "text",
      defaultValue: "",
      defaultRef: "profile",
      name: "Tagline",
      key: "tagline",
    },
    {
      type: "color",
      defaultValue: { hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255, a: 1 } },
      name: "Logo Background Color",
      key: "logoColor"
    },
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
      defaultValue: "videos/t.mp4",
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
