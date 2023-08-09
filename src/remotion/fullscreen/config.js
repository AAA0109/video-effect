import LogoReveal from "./LogoReveal";

export const config = {
  id: "logo-reveal",
  title: "Fullscreen",
  durationInFrames: 600,
  extraDuration: 10,
  fps: 30,
  template: LogoReveal,
  defaultProps: {
    bgType: "image",
    bgVideo: "",
    bgImage: "",
    video: "",
    audio: "",
    logo: "",
    name: "",
    tagline: "",
    website: "",
    phone: ""
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
      defaultValue: "image",
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
      defaultValue: "https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4",
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
      type: "text",
      defaultValue: "",
      defaultRef: "profile",
      name: "Website",
      key: "website",
    },
    {
      type: "text",
      defaultValue: "",
      defaultRef: "profile",
      name: "Phone",
      key: "phone",
    }
  ],
};
