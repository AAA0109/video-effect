import crypto from "crypto";

export const secondsToTime = (elapsed) => {
  const minutes = Math.floor(elapsed / 60);
  const seconds = Math.floor(elapsed % 60);

  return `${minutes < 9 ? "0" + minutes : minutes}:${
    seconds < 9 ? "0" + seconds : seconds
  }`;
};

export const getHash = (input) => {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");
};

export const getBlobDimension = (blob) => {
  const tempVideoEl = document.createElement('video')

  const durationP = new Promise((resolve, reject) => {
    tempVideoEl.addEventListener('loadedmetadata', () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      resolve({ width: tempVideoEl.videoWidth, height: tempVideoEl.videoHeight })
      // resolve(tempVideoEl.duration)
    })
    tempVideoEl.onerror = (event) => reject(event.target.error)
  })

  tempVideoEl.src = typeof blob === 'string' || blob instanceof String
    ? blob
    : window.URL.createObjectURL(blob)

  return durationP
}







