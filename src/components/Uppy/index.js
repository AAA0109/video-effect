import { useState, useEffect } from 'react'
import styles from "./index.module.scss";
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
// import RemoteSources from '@uppy/google-drive'
import ImageEditor from '@uppy/image-editor'
import Webcam from '@uppy/webcam'
import Audio from '@uppy/audio'
import ScreenCapture from '@uppy/screen-capture'
// import RemoteSources from '@uppy/remote-sources'
// import Tus from '@uppy/tus'
import DropTarget from '@uppy/drop-target'
import Compressor from '@uppy/compressor'
import AwsS3 from '@uppy/aws-s3'
import Unsplash from '@uppy/unsplash'

import {IoCloudUploadOutline} from 'react-icons/io5'

import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import "@uppy/audio/dist/style.css"
import "@uppy/screen-capture/dist/style.css"
import "@uppy/image-editor/dist/style.css"

const UppyBox = ({
  icon,
  title,
  fileURL,
  accept,
  deleteFile,
  containerId,
  handleFileAdd,
  type,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const [uppy, setUppy] = useState(null);

  useEffect(() => {
    if (uppy) return;
    const uppy = new Uppy({ 
      restrictions: {
        allowedFileTypes: [accept],
        maxNumberOfFiles: 1
      }
    })
      // The main UI that shows files, progress and holds all plugins
      .use(Dashboard, {
        target: '#' + containerId,
        inline: true,
        height: 470,
        metaFields: [
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'caption', name: 'Caption', placeholder: 'add description' },
        ],
        note: 'Images and video only, 2–3 files, up to 1 MB',
      })
      .use(AwsS3, {
        // companionUrl: 'https://vytpiylllqgbvb5y7yerzrollq0omfhx.lambda-url.us-east-1.on.aws/'
        companionUrl: 'https://remotioncompanion.herokuapp.com/',
        // getUploadParameters (file) {
        //   // Send a request to our PHP signing endpoint.
        //   return fetch(`https://5jtkjshl2wfujrcno25nyw2fna0xfmyd.lambda-url.us-east-1.on.aws/?filename=${file.name}&type=${file.type}&`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       filename: file.name,
        //     }),
        //   }).then((response) => {
        //     // Parse the JSON response.
        //     return response.json()
        //   }).then((data) => {
        //     // Return an object in the correct shape.
        //     return {
        //       method: 'PUT',
        //       url: data.url,
        //       fields: [],
        //       headers: {
        //         'Content-Type': file.type,
        //       },
        //     }
        //   })
        // },
      })
      // All remote services like Instagram and Google Drive in one package
      // .use(RemoteSources, {
      //   companionUrl: 'https://companion.uppy.io',
      // })
      .use(Webcam, { target: Dashboard })
      .use(Audio, { target: Dashboard, showRecordingLength: true })
      .use(ScreenCapture, { target: Dashboard })
      // .use(Form, { target: Dashboard })
      .use(ImageEditor, { target: Dashboard })
      // Allow dropping files on any element or the whole document
      .use(DropTarget, { target: document.body })
      // Optimize images
      .use(Compressor)
      .use(Unsplash, {
        target: Dashboard,
        companionUrl: 'https://remotioncompanion.herokuapp.com/',
        // companionUrl: 'https://uppy-companion-node.vercel.app/',
        // companionUrl: 'https://vytpiylllqgbvb5y7yerzrollq0omfhx.lambda-url.us-east-1.on.aws/',
      })
      // Upload
      // .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
    
    uppy.on('complete', result => {
      console.log('successful files:', result.successful)
      console.log('failed files:', result.failed)
      if (result.successful.length) {
        const fileURL = result.successful[0].uploadURL;
        handleFileAdd(fileURL, type);
        setShowModal(false);
      }
    })
    uppy.on('upload-success', (file, data) => {
      const s3Key = file.meta['key'] // the S3 object key of the uploaded file
      console.log('upload-success', file, data);
    })
    setUppy(uppy);

    return () => {
      uppy.close();
    }
  }, [accept, containerId, handleFileAdd, type])
  
  return (
    <div className={styles.container}>
      <div className={styles.modal + (showModal ? ' ' + styles.show : '')} onClick={() => setShowModal(false)}>
        <div id={containerId} onClick={(e) => e.stopPropagation()}>
        </div>
      </div>
      <div className={styles.content}>
        <label
          className={["file", styles.details].join(" ")}
          htmlFor={title}
          onClick={() => setShowModal(true)}
        >
          {(fileURL && accept === 'image/*') ? 
            <img src={fileURL} alt="uppy image" />
          :
            <>
              {icon}
              <div className="detail">
                <div className="title">{title}</div>
                <div className="subtitle">{fileURL ? 'File Added' : 'Click to Add'}</div>
              </div>
            </>
          }
        </label>
        <button type="button" onClick={() => setShowModal(true)} className={styles.btn}><IoCloudUploadOutline size={20}/>Upload</button>
      </div>
    </div>
  )
}

export default UppyBox