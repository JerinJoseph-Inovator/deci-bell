// ImageDisplay.js

import React from 'react';
import style from './Regular.module.css';
import im1 from './1.jpeg';
import im2 from './2.jpeg';

function ImageDisplay() {
  return (
    <div className={style.imageContainer}>
      <img src={im1} alt="Image 1" className={style.Image} />
      <img src={im2} alt="Image 2" className={style.Image} />
    </div>
  );
}

export default ImageDisplay;
