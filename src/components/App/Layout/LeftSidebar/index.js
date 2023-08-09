import { useState, useRef, useCallback } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";
import getBlobDuration from "get-blob-duration";
import { getBlobDimension } from "utils";
// Miscelaneous
import { useTheme } from "next-themes";
import { Shortcut } from "@shopify/react-shortcuts";
import { useRecoilState, useRecoilValue } from "recoil";
// import { templates } from "remotion/templates";
import { BusniessProfile } from "icons";
import { templates } from "../../../../remotion/templates";
import { secondsToTime } from "utils";

import { IoVideocamOutline, IoImageOutline, IoClose, IoSunny, IoMoon } from "react-icons/io5"

import Uppy from "components/Uppy";
import FeaturedVideo from "components/FeaturedVideo";

// State
import {
  inputPropsState,
  templateState,
  templateIdState,
  profileState
} from "state/global";

// Icons
import { Menu, Logo } from "icons";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';

const LeftSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [videoMode, setVideoMode] = useState(false); //false: Content Library, true: Upload Video
  const [showBusniessModal, setShowBusinessModal] = useState(false);

  const [currentTemplateId, setCurrentTemplateId] = useRecoilState(templateIdState);
  const [inputProps, setInputProps] = useRecoilState(inputPropsState);
  const currentTemplate = useRecoilValue(templateState);
  const [profile] = useRecoilState(profileState);

  const templateRef = useRef();

  const updateVideoDuration = useCallback((fileURL) => {
    getBlobDuration(fileURL).then(async (duration) => {
      const { extraDuration } = currentTemplate;

      const newDuration = currentTemplate
        ? Math.floor(duration) + extraDuration
        : Math.floor(duration);

      // Notify Error if current video is more than 2 min long
      if (newDuration > 120) {
        toast.error(
          "Added video is too lengthy. Please trim and keep the length below 2 min"
        );

        return setInputProps((currentProps) => ({
          ...currentProps,
          [key]: null,
        }));
      }

      const dimension = await getBlobDimension(fileURL);

      setInputProps((currentProps) => ({
        ...currentProps,
        durationInSeconds: newDuration,
        width: dimension.width,
        height: dimension.height
      }));
    });
  }, [])

  const handleUppyFileUpload = useCallback((fileURL, key) => {
    setInputProps((currentProps) => ({ ...currentProps, [key]: fileURL }))
    if (key === "video") {
      updateVideoDuration(fileURL);
    }
  }, [setInputProps, updateVideoDuration])

  const deleteFile = useCallback(
    (key) => {
      setInputProps((currentProps) => ({ ...currentProps, [key]: null }));
    },
    [setInputProps]
  );

  const setVideoType = (type) => {
    setInputProps((currentProps) => ({ ...currentProps, 'bgType': type }));
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleChangeTemplate = ({ target: { value } }, _) => {
    setCurrentTemplateId(value);
    if(templateRef.current) {
      templateRef.current.click();
    }
  };

  const handleSelectFeaturedVideo = (fileURL) => {
    setInputProps((currentProps) => ({ ...currentProps, 'video': fileURL }));
    updateVideoDuration(fileURL);
  }

  const closeBusinessModal = () => {
    setShowBusinessModal(false);
  }
  const openBusinessModal = () => {
    setShowBusinessModal(true);
  }

  return (
    <div
      className={[styles.wrapper, isCollapsed ? styles.collapsed : ""].join(
        " "
      )}
    >
      {/* Top Header */}
      <header className={styles.header}>
        {/* Menu Items */}
        {/* <button
          className={styles.menu}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu color="var(--color-tertiary)" />
        </button> */}
        {/* Logo */}
        <Link href="/" passHref>
          <a className={styles.logo}>
            <Logo color="var(--color-foreground)" />
          </a>
        </Link>
        {/* Collapse Button */}
        <button className={styles.theme} onClick={toggleTheme}>
          {theme === "light" ? (
            <IoMoon size={24} color="var(--color-tertiary)" />
          ) : (
            <IoSunny size={24} color="var(--color-tertiary)" />
          )}
        </button>
        <Shortcut
          held={[["Control"], ["Meta"]]}
          ordered={["u"]}
          onMatch={toggleTheme}
        />
      </header>

      {/* Template Options */}
      <div className={styles.content}>
        <Accordion className="accordion" allowZeroExpanded={true} allowMultipleExpanded={true} preExpanded={["templates", "mediaoptions"]}>
          <AccordionItem uuid="templates">
            <AccordionItemHeading className="accordionHeading">
              <AccordionItemButton className="accordionButton">
                <span ref={templateRef}>
                  Video Bumper Templates
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordionItemPanel">
              <form className={styles.templates}>
                {/* <div className={styles.top}>
                  <h3 className={styles.heading}>Pick a template</h3>
                </div> */}
                <fieldset id="templates" className={styles.list}>
                  {templates?.map(({ id, title, fps, durationInFrames }) => (
                    <label htmlFor={id} className={styles.item} key={id}>
                      <input
                        id={id}
                        name="templates"
                        type="radio"
                        value={id}
                        checked={currentTemplateId === id}
                        onChange={handleChangeTemplate}
                      />
                      {/* Thumbnail */}
                      <div className={styles.thumbnail}>
                        <Image
                          src={`/assets/thumbnails/${id}.png`}
                          layout="fill"
                          alt="Preview"
                        />
                      </div>

                      {/* Title */}
                      <h4 className={styles.title}>{title}</h4>

                      {/* Duration */}
                      <span className={styles.duration}>
                        {secondsToTime(Math.floor(durationInFrames / fps))}
                      </span>
                    </label>
                  ))}
                </fieldset>
              </form>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="mediaoptions">
            <AccordionItemHeading className="accordionHeading">
              <AccordionItemButton className="accordionButton">
                Media Options
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordionItemPanel">
              <div className={styles.configuration}>
                <div>
                  {/* Heading */}
                  <h3 className={styles.heading}>Background Options</h3>
                  
                  {/* Controls */}
                  <div className="toggle-button">
                    <div className={"toggle-item " + ((inputProps?.bgType !== 'image') ? "selected" : "")}
                      onClick={() => setVideoType('video')} >
                      <IoVideocamOutline /> Video
                    </div>
                    <div className={"toggle-item " + ((inputProps?.bgType === 'image') ? "selected" : "")}
                      onClick={() => setVideoType('image')} >
                      <IoImageOutline /> Image
                    </div>
                  </div>
                  { (inputProps?.bgType === 'image') ?
                      <div className="form-group">
                        <div className="form-item">
                          <Uppy
                            icon={<IoImageOutline size={40}/>}
                            containerId={`bgImage-uppy`}
                            title="Background"
                            handleFileAdd={handleUppyFileUpload}
                            deleteFile={() => deleteFile("bgImage")}
                            accept="image/*"
                            type="bgImage"
                            label="Image"
                            fileURL={inputProps?.bgImage}
                          />
                        </div>
                      </div>
                    :
                      <div className="form-group">
                        <div className="form-item">
                          <Uppy
                            icon={<IoVideocamOutline size={40}/>}
                            containerId={`bgVideo-uppy`}
                            title="Background"
                            handleFileAdd={handleUppyFileUpload}
                            deleteFile={() => deleteFile("bgVideo")}
                            accept="video/*"
                            type="bgVideo"
                            label="Video"
                            fileURL={inputProps?.bgVideo}
                          />
                        </div>
                      </div>
                }
                </div>
                <hr />
                {/* <div>
                  <h3 className={styles.heading}>Music & Audio</h3>
                  
                  <div className="form-group">
                    <div className="form-item">
                      <Uppy 
                        containerId="audio-uppy"
                        icon={<IoMusicalNotesOutline size={40}/>}
                        title="Audio"
                        handleFileAdd={handleUppyFileUpload}
                        deleteFile={() => deleteFile("audio")}
                        accept="audio/*"
                        type="audio"
                        label="Audio"
                        fileURL={inputProps?.audio}
                      />
                    </div>
                  </div>
                </div>
                <hr /> */}
                <div>
                  {/* Heading */}
                  <h3 className={styles.heading}>Featured Content</h3>
                  
                  {/* Controls */}
                  <div className="toggle-button">
                    <div className={"toggle-item " + (!videoMode ? "selected" : "")} onClick={() => setVideoMode(false)}>
                      Content Library
                    </div>
                    <div className={"toggle-item " + (videoMode ? "selected" : "")} onClick={() => setVideoMode(true)}>
                      Upload Video
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-item">
                      { videoMode ? 
                        <Uppy 
                          containerId="video-uppy"
                          icon={<IoVideocamOutline size={40}/>}
                          title="Video"
                          handleFileAdd={handleUppyFileUpload}
                          deleteFile={() => deleteFile("video")}
                          accept="video/*"
                          type="video"
                          label="Video"
                          fileURL={inputProps?.video}
                        /> :
                        <FeaturedVideo
                          fileURL={inputProps?.video}
                          handleSelectFile={handleSelectFeaturedVideo}
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className={styles.business}>
        <div className={styles.title}>
          <span>Business Presets</span>
          {/* Info Button */}
          <div className={styles.info}>
            <BusniessProfile color="var(--color-tertiary)" onClick={openBusinessModal}/>
          </div>
          <div className={styles.panel + ' ' + (showBusniessModal ? styles.show : '')} onClick={closeBusinessModal}>
            <div className={styles.panelContent} onClick={(e)=>e.stopPropagation()}>
              <div className={styles.header}>
                <h3>Business Profile</h3>
                <IoClose className={styles.closeBtn} onClick={closeBusinessModal} />
              </div>
              <div className={styles.profileModal}>
                <div className={styles.profileLogo}>
                  <label htmlFor="name">Company Logo</label>
                  <img src={profile.logo} alt="Logo"/>
                </div>
                <div>
                  <div className="form-group">
                    <div className="form-item">
                      <label htmlFor="name">Company Name</label>
                      <input
                        type="text"
                        id="id"
                        value={profile.name}
                        disabled
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="name">Contact Phone</label>
                      <input
                        type="text"
                        id="name"
                        value={profile.phone}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-item">
                      <label htmlFor="name">Company Tagline</label>
                      <input
                        type="text"
                        id="id"
                        value={profile.tagline}
                        disabled
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="name">Contact Email</label>
                      <input
                        type="text"
                        id="name"
                        value={profile.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-item">
                      <label htmlFor="name">Company Website</label>
                      <input
                        type="text"
                        id="id"
                        value={profile.website}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
