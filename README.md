## 📐 Tech Stack

- 🔥 **NextJS** - Because it's one of the best frontend JS Frameworks
- ▶️ **Remotion** - For the video and rendering
- 🪣 **Linode S3 Storage** - For quickly storing uploaded video files in storage buckets
- 💅 **Sass** - For making the app look beautiful
- 🌱 **MongoDB (w/ Linode)** - For caching renders with the same input params
- 🔫 **React Recoil** - For app-wide state management
- 🍞 **React Hot Toast** - For the notifications
- 🎉 **React Confetti** - For the joyous animations
- 💦 **React Dropzone** - For handling advanced drag-drop animations

## 💾 Installation

### Pre-Requisites

1. NodeJS 14+
1. NPM installation
1. A S-3 compatible storage bucket with read and write access. (Optional)
1. An [Serverless account](https://aws.amazon.com/lambda) for rendering, (Optional)

The videos will only render to an mp4 file if you have all of this set-up. However, you would still be able to preview the videos in the browser without the last two.

### Install steps

1. Setup an Object storage bucket with Linode or any other cloud provider.
1. Rename the `.env.example` file to `.env`.
1. Install packatges using `npm install`
1. Follow the installation instructions at [Remotion Lambda Installation docs](https://www.remotion.dev/docs/lambda/setup#1-install-remotionlambda), **till step 6** .
1. Once you have the key ID and Secret from the lambda console, edit these values into the `.env` file along with other values.
1. Verify `.env` setup using `npx remotion lambda policies validate`. Only proceed if you get checkmarks on everything, else repeat from step `4`.
1. Edit your preferred regions in `src/deploy/regions.ts` file.
1. Deploy the functions using the command `npm run deploy`. Wait for deployment.

### Run the app

1. Run the development server using `npm run dev`. Navigate to the address displayed in the terminal to view the app. Verify that everything works.
1. Create a production build using `npm run build` and serve using `npm start`.
