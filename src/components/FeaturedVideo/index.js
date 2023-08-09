import { useState, useEffect } from 'react'
import styles from "./index.module.scss";

import {IoClose, IoSearchOutline} from 'react-icons/io5'

const bgVideoSamples = [{
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Adventurous.mp4',
  label: 'Adventurous'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Dont_Settle.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Dont_Settle.mp4',
  label: `Don't Settle`
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Education_for_Living.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Education_for_Living.mp4',
  label: 'Education for Living'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Flaubert.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Flaubert.mp4',
  label: 'Flaubert'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Magic_Things.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Magic_Things.mp4',
  label: 'Magic Things'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Make_Adventure_a_Priority.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Make_Adventure_a_Priority.mp4',
  label: 'Make Adventure a Priority'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/No_Regrets.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/No_Regrets.mp4',
  label: 'No Regrets'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Remember.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Remember.mp4',
  label: 'Remember'
}, {
  logo: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Trying_to_be_normal.png',
  video: 'https://travel-content-studio.s3.amazonaws.com/vsvideos/Trying_to_be_normal.mp4',
  label: 'Trying to be normal'
}]

const FeaturedVideo = ({
  fileURL,
  handleSelectFile
}) => {
  const [showModal, setShowModal] = useState(false);
  const [logo, setLogo] = useState('');

  useEffect(() => {
    const idx = bgVideoSamples.findIndex(itm => itm.video === fileURL);
    setLogo(bgVideoSamples[idx]?.logo);
  }, [fileURL]);

  const itemClicked = (fileURL) => {
    setShowModal(false);
    handleSelectFile(fileURL);
  }

  const closeModal = () => {
    setShowModal(false);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.modal + (showModal ? ' ' + styles.show : '')} onClick={closeModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.heading}>Select Video</h3>
          <IoClose className={styles.closeBtn} onClick={closeModal} />
          <hr />
          <div className={styles.thumbnailContainer}>
            {bgVideoSamples.map((itm, idx) => (
              <div className={styles.thumbnailDetails} key={idx} onClick={() => itemClicked(itm.video)}>
                <div className={styles.thumbnail + ' ' + (itm.video === fileURL ? styles.selected : '')}>
                  <img src={itm.logo} alt="thumbnail"/>
                </div>
                <div className={styles.label}>{itm.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.details + ' ' + styles.thumbnail} onClick={() => setShowModal(true)}>
          {logo ? <img src={logo} alt="image" /> : 'Select Video'}
        </div>
        <button type="button" onClick={() => setShowModal(true)} className={styles.btn}><IoSearchOutline size={20}/>Search</button>
      </div>
    </div>
  )
}

export default FeaturedVideo