import { useState, useCallback, useEffect } from "react";
// Next
import styles from "./index.module.scss";
// Miscellaneous
// import { Shortcut } from "@shopify/react-shortcuts";
// import DropBox from "components/DropBox";
// State
import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputPropsState,
  templateState,
  renderingStatusState,
  profileState,
} from "state/global";
import toast from "react-hot-toast";
import Uppy from "components/Uppy";

import getBlobDuration from "get-blob-duration";
import { getBlobDimension } from "utils";

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';

// Icons
import { RenderBtn } from "icons";

import { CirclePicker } from 'react-color';

const RightSidebar = () => {
  const [inputProps, setInputProps] = useRecoilState(inputPropsState);
  const currentTemplate = useRecoilValue(templateState);
  const [profile] = useRecoilState(profileState);
  const [renderingStatus, setRenderingStatus] = useRecoilState(renderingStatusState);

    
  // Set the input props from the template config
  useEffect(() => {
    const { inputPropsSchema, durationInFrames, fps } = currentTemplate;

    [
      {
        type: "text",
        key: "height",
        defaultValue: currentTemplate?.height,
        name: "Height",
      },
      {
        type: "text",
        key: "width",
        defaultValue: currentTemplate?.width,
        name: "Width",
      },
      {
        type: "text",
        key: "durationInSeconds",
        defaultValue: durationInFrames / fps,
        name: "Duration (sec)",
      },
      ...(inputPropsSchema || []),
    ].map(({ defaultValue, defaultRef, key }) => {
      if (defaultRef === 'profile') {
        setInputProps((inputProps) => ({ ...inputProps, [key]: profile[key] }));
      } else {
        setInputProps((inputProps) => ({ ...inputProps, [key]: defaultValue }));
        if (key === 'video') {
          updateVideoDuration(defaultValue);
        }
      }
    });
  }, [currentTemplate, profile, setInputProps]);

  // Start rendering
  const initiateRender = () => setRenderingStatus("rendering");

  const handleUppyFileUpload = useCallback((fileURL, key) => {
    setInputProps((currentProps) => ({ ...currentProps, [key]: fileURL }))
  }, [setInputProps])

  const deleteFile = useCallback(
    (key) => {
      setInputProps((currentProps) => ({ ...currentProps, [key]: null }));
    },
    [setInputProps]
  );

  const handleColorChange = useCallback(
    (color, key) => {
      setInputProps((currentProps) => ({ ...currentProps, [key]: color }));
    },
    [setInputProps]
  );  

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

  return (
    <div className={styles.wrapper}>
      {/* Top Options */}
      <div className={styles.topOptions}>
        {/* Render Progress Buttons */}
        <button
          className={styles.export}
          disabled={renderingStatus === "rendering"}
          onClick={initiateRender}
        >
          {renderingStatus !== "rendering" ? (
            <>
              <RenderBtn color="black" />
              <span>Render Video</span>

              {/* <div className="shortcut">
                <kbd>⌘</kbd>
                <span>+</span>
                <kbd>J</kbd>
                <Shortcut
                  held={[["Control"], ["Meta"]]}
                  ordered={["j"]}
                  onMatch={initiateRender}
                />
              </div> */}
            </>
          ) : (
            <>
              <RenderBtn color="#fff" />
              <span>Rendering...</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Accordion className="accordion" allowZeroExpanded={true} allowMultipleExpanded={true} preExpanded={["options"]}>
          <AccordionItem uuid="options">
            <AccordionItemHeading className="accordionHeading">
              <AccordionItemButton className="accordionButton">
                Customize Options
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordionItemPanel">
              <div className={styles.configuration}>
                {/* <div className="form-group">
                  <div className="form-item">
                    <label htmlFor="width">Width</label>
                    <input
                      type="number"
                      min="0"
                      max="3000"
                      step="10"
                      id="width"
                      placeholder="1920"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={inputProps?.width}
                      onChange={({ target: { value } }) =>
                        setInputProps((current) => ({
                          ...current,
                          width: Number(value),
                        }))
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="height">Height</label>
                    <input
                      value={inputProps?.height}
                      onChange={({ target: { value } }) =>
                        setInputProps((current) => ({
                          ...current,
                          height: Number(value),
                        }))
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      type="number"
                      step="10"
                      min="0"
                      max="3000"
                      id="height"
                      placeholder="1080"
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="height">Length (s)</label>
                    <input
                      value={inputProps?.durationInSeconds}
                      onChange={({ target: { value } }) =>
                        setInputProps((current) => ({
                          ...current,
                          durationInSeconds: Number(value),
                        }))
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      type="number"
                      id="durationInSeconds"
                      placeholder="10"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <hr /> */}

                {/* Custom Configurations - Input Props */}
                {currentTemplate?.inputPropsSchema
                  ?.filter(({ key }) => key !== "bgVideo")
                  ?.map(({ key, name, accept, type, defaultValue, min, max, step }) => {
                    if (["video", "audio", "bgVideo", "bgImage", "bgType"].includes(key)) return;
                    
                    if (type === 'file') {
                      return (
                        <div className="form-group" key={key}>
                          <div className="form-item uppy-form-item">
                            <label htmlFor={`config-input-${key}`}>{name}</label>
                            <Uppy 
                              id={`config-input-${key}`}
                              containerId={`config-input-${key}--uppy`}
                              title={"Add " + name}
                              subtitle="Click"
                              handleFileAdd={handleUppyFileUpload}
                              deleteFile={() => deleteFile(key)}
                              accept={accept}
                              type={key}
                              label={name}
                              fileURL={inputProps[key]}
                            />
                          </div>
                        </div>
                      );
                    }
                    if (type === 'color') {
                      return (
                        <div className="form-group" key={key}>
                          <div className="form-item uppy-form-item">
                            <label htmlFor={`config-input-${key}`}>{name}</label>
                            <CirclePicker width="100%" circleSpacing={12} color={inputProps[key]?.hex} onChangeComplete={(color) => handleColorChange(color, key)}/>
                          </div>
                        </div>
                      )
                    }

                    const inferredType = (type === "number") ? "number" : "text";

                    return (
                      <div className="form-group" key={key}>
                        <div className="form-item">
                          <label htmlFor={`config-input-${key}`}>{name}</label>
                          <input
                            type={inferredType}
                            id={`config-input-${key}`}
                            value={inputProps[key] || ''}
                            onChange={({ target: { value } }) =>
                              setInputProps((inputProps) => ({
                                ...inputProps,
                                [key]: value,
                              }))
                            }
                            {...(inferredType === "number" ? { step, min, max } : {})}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default RightSidebar;
