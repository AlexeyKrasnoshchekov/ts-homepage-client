import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectImages, selectImageIndex} from "./imageSlice";
import { setIndex } from "./imageSlice";
import { Image } from "../../types/types";

import styles from './image.module.scss';

export default function ImageDots() {
    const dispatch = useAppDispatch();
    const images: Image[] = useAppSelector(selectImages);
    const imageIndex: number = useAppSelector(selectImageIndex);


  return (
    <div className={styles.slideshowDots}>
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(setIndex(idx))}
            className={`${styles.slideshowDot} ${imageIndex === idx && styles.active}`}
          ></div>
        ))}
      </div>
  )
}
