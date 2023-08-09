import TextReveal from "./TextReveal";

export const config = {
  id: "text-reveal",
  title: "Text Reveal",
  durationInFrames: 112,
  extraDuration: 0,
  fps: 30,
  template: TextReveal,
  defaultProps: {
    video:
      "https://travel-content-studio.s3.amazonaws.com/5-Reasons_to_Cruise.mp4",
    audio:
      "https://travel-content-studio.s3.amazonaws.com/default.mp3",
  },
  height: 1080,
  width: 1920,
  authors: ["VS"],
  inputPropsSchema: [
    {
      type: "file",
      defaultValue:
        "https://travel-content-studio.s3.amazonaws.com/5-Reasons_to_Cruise.mp4",
      name: "Video",
      key: "video",
    },
    {
      type: "file",
      defaultValue:
        "https://travel-content-studio.s3.amazonaws.com/default.mp3",
      name: "Audio",
      key: "audio",
    },
    {
      type: "text",
      defaultValue: "Coming soon...",
      name: "Text",
      key: "text",
    },
  ],
};
