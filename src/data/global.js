import { GitHub, Twitter } from "icons";

export const header = {
  navbarLinks: [
    { href: "/", children: "home" },
    { href: "#reviews", children: "reviews" },
    { href: "#features", children: "features" },
  ],
  bannerButtons: [
    {
      href: "https://github.com/Just-Moh-it/Mockoops",
      children: <GitHub color="var(--color-foreground)" />,
    },
    {
      href: "https://twitter.com/just_moh_it",
      children: <Twitter color="var(--color-foreground)" />,
    },
  ],
  ctas: [{ href: "/create", children: "Get Started" }],
};

export const Footer = {};
