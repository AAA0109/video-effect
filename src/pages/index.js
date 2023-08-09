import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useDirectus } from 'react-directus'
import Layout from "components/App/Layout";
import RenderHandler from "lib/handleRender";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

// State
import { profileState } from "../state/global";

const pubAPI = process.env.DIRECTUS_PUBLIC_API || 'https://vs.contentportal.link/';

const CreatePage = () => {
  const { data: session, status } = useSession({ required: true });
  
  const [profile, setProfile] = useRecoilState(profileState);

  const router = useRouter();
  const { directus } = useDirectus();

  useEffect(() => {
    // return setProfile({email: 'aaa'});
    const signin = async () => {
      const authState = await directus.auth.static(session.user.accessToken);
      if (!authState) return router.push('/sign-in');
      const profile = await directus.users.me.read();

      if (profile?.business_profile?.length) {
        const response = (await directus.items('business_profile').readByQuery({ filter: {id: profile.business_profile[0]} })).data;
        if (response.length) {
          const pro = response[0];
          
          // const logo = await directus.assets.readOne(pro.logo);
          setProfile({
            email: profile.email,
            name: pro.name,
            phone: pro.phone,
            tagline: pro.tagline,
            website: pro.website,
            logo: pubAPI + 'assets/' + pro.logo
          });
        } else {
          setProfile(profile)
        }
      }
    }

    console.log(session, status)
    if (status === 'authenticated' && !profile.email) {
      signin();
    }
  }, [session, status, directus, router, setProfile])

  return (
    <>
      <Head>
        <title>Create | Mockoops</title>
      </Head>
      {(profile.email) ? <Layout /> : ''}      
      <RenderHandler />
    </>
  );
};

export default CreatePage;





// // React Stuff
// import { useState, useRef, useEffect } from "react";
// import styles from "styles/Home.module.scss";
// // Next Stuff
// import Head from "next/head";
// import Link from "next/link";
// import Image from "next/image";

// import Layout from "components/Layout";

// // 3rdP stuff
// import { motion } from "framer-motion";
// import { slap, fadeFromBottom } from "styles/animations";
// import { PlayBtn } from "icons";

// // States, Data
// import { homepageData } from "data";
// import { useRecoilState } from "recoil";
// import { modalState } from "state/global";

// export default function Home() {
//   const [modal, setModal] = useRecoilState(modalState);
//   const vid = useRef();
//   const widgetRef = useRef();

//   const toggleModal = () => {
//     setModal({
//       isOpen: true,
//       content: (
//         <div className="" style={{ width: "900px", height: "500px" }}>
//           <Embed
//             type={homepageData?.hero?.video?.content?.type}
//             config={homepageData?.hero?.video?.content}
//           />
//         </div>
//       ),
//     });
//   };

//   useEffect(() => {
//     const playVideo = () => {
//       vid.current.play();
//     };
//     playVideo();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         widgetRef.current.style.bottom = "100px";
//       } else {
//         widgetRef.current.style.bottom = "50px";
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <Layout>
//       <Head>
//         <title>Mockoops</title>
//         <meta
//           name="description"
//           content="Create stunning product mockups and simply drag-drop to present your screen-recordings beautifully"
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Main Content */}
//       <main className={styles.wrapper}>
//         {/* Product hunt image */}
//         <Link
//           href="https://www.producthunt.com/posts/mockoops?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mockoops"
//           passHref
//         >
//           <a
//             className={styles.productHunt}
//             target="_blank"
//             rel="noopener noreferrer"
//             ref={widgetRef}
//           >
//             <Image
//               src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=351692&theme=light"
//               alt="Mockoops - Create&#0032;jaw&#0045;dropping&#0032;animations&#0032;from&#0032;boring&#0032;screencasts | Product Hunt"
//               width={250}
//               height={54}
//             />
//           </a>
//         </Link>

//         {/* Hero */}
//         <div className={styles.hero}>
//           {/* Headings */}
//           <div className={styles.headingWrapper}>
//             {/* Heading item */}
//             {homepageData?.hero?.headingItems.map((item, idx) => (
//               <motion.h1
//                 key={idx}
//                 className={styles.item}
//                 {...{
//                   ...slap,
//                   transition: { ...slap.transition, delay: 0.3 * idx },
//                 }}
//               >
//                 {item}
//               </motion.h1>
//             ))}
//           </div>

//           {/* Demo Video */}
//           <motion.div
//             className={[styles.demoVideo, "perspective"].join(" ")}
//             onClick={toggleModal}
//             {...{
//               ...slap,
//               transition: { ...slap.transition, delay: 0.6, duration: 1 },
//             }}
//           >
//             <div className={styles.playBtn}>
//               <PlayBtn />
//             </div>
//             <video
//               className={styles.video}
//               src={homepageData?.hero?.video?.preview?.src}
//               alt={homepageData?.hero?.video?.preview?.alt}
//               autoPlay
//               loop
//               muted
//               ref={vid}
//             ></video>
//           </motion.div>

//           {/* Description */}
//           <motion.div className={styles.description} {...slap}>
//             {homepageData?.hero?.description}
//           </motion.div>

//           {/* CTAs */}
//           <motion.div className={styles.ctas} {...slap}>
//             {homepageData?.hero?.ctas?.map(({ href, children, type }, idx) => (
//               <Link href={href} passHref key={idx}>
//                 <a
//                   className={[
//                     "ctaBtn",
//                     styles.ctaBtn,
//                     type === "outline" ? "outline" : "",
//                   ].join(" ")}
//                 >
//                   {children}
//                 </a>
//               </Link>
//             ))}
//           </motion.div>
//         </div>

//         {/* Reviews */}
//         <div className={styles.reviews} id="reviews">
//           {homepageData?.reviewData?.map(
//             (
//               {
//                 author: {
//                   name,
//                   avatar: { src, alt },
//                   description,
//                 },
//                 review,
//               },
//               idx
//             ) => (
//               <motion.div
//                 key={idx}
//                 className={styles.review}
//                 {...{
//                   ...slap,
//                   transition: { ...slap.transition, delay: 0.3 * idx },
//                 }}
//               >
//                 <div className={styles.author}>
//                   <div className={styles.avatar}>
//                     <Image
//                       src={src}
//                       alt={alt}
//                       layout="fill"
//                       object-fit="cover"
//                       object-position="center"
//                     />
//                   </div>
//                   <div className={styles.info}>
//                     <div className={styles.name}>{name}</div>
//                     <div className={styles.description}>{description}</div>
//                   </div>
//                 </div>
//                 <div className={styles.content}>{review}</div>
//               </motion.div>
//             )
//           )}
//         </div>

//         {/* Features */}
//         <div className={styles.features} id="features">
//           {homepageData?.features?.map(
//             ({ info: { heading, description }, image, video }, idx) => (
//               <div
//                 key={idx}
//                 className={[
//                   styles.feature,
//                   idx % 2 !== 0 ? styles.even : styles.odd,
//                 ].join(" ")}
//               >
//                 <motion.div
//                   className={styles.info}
//                   {...{
//                     ...slap,
//                     transition: { ...slap.transition, delay: 0.3 },
//                   }}
//                 >
//                   <div className={styles.heading}>
//                     <h2>{heading[0]}</h2>
//                     <h2>{heading[1]}</h2>
//                   </div>
//                   <h4 className={styles.description}>{description}</h4>
//                 </motion.div>
//                 <motion.div className={styles.image} {...slap}>
//                   {
//                     {
//                       image: (
//                         <Image
//                           src={image?.src}
//                           alt={image?.alt}
//                           layout="fill"
//                           object-fit="cover"
//                           object-position="center"
//                         />
//                       ),
//                       video: (
//                         <video
//                           src={video?.src}
//                           alt={video?.alt}
//                           autoPlay
//                           loop={video?.loop ?? true}
//                           muted
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ),
//                     }[(video && "video") || (image && "image")]
//                   }
//                 </motion.div>
//               </div>
//             )
//           )}
//         </div>

//         {/* CTA Banner */}
//         <motion.div className={styles.ctaBanner} {...fadeFromBottom}>
//           {/* Heading */}
//           <h2 className={styles.heading}>{homepageData?.ctaBanner?.heading}</h2>
//           {/* Description */}
//           <h4 className={styles.description}>
//             {homepageData?.ctaBanner?.description}
//           </h4>

//           {/* Ctas */}
//           <div className={styles.ctas}>
//             {homepageData?.ctaBanner?.ctas?.map(
//               ({ href, children, type }, idx) => (
//                 <Link href={href} passHref key={idx}>
//                   <a
//                     className={[
//                       "ctaBtn",
//                       styles.ctaBtn,
//                       type === "outline" ? styles.outline : "",
//                     ].join(" ")}
//                   >
//                     {children}
//                   </a>
//                 </Link>
//               )
//             )}
//           </div>
//         </motion.div>
//       </main>
//     </Layout>
//   );
// }

