import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Image } from "../../types/types";
import { selectImages, selectImageIndex, loadImage } from "./imageSlice";


import styles from "./image.module.scss";

function ImageContainer(props: any) {
  const dispatch = useAppDispatch();
  const images: Image[] = useAppSelector(selectImages);
  const imageIndex: number = useAppSelector(selectImageIndex);
  const delay = 2500;

  // useEffect(() => {
  //   setTimeout(
  //     () =>
  //       dispatch(nextImage()),
  //     delay
  //   );

  //   return () => {};
  // }, []);

  useEffect(() => {
    dispatch(loadImage());
    // setTimeout(
    //   () =>
    //     dispatch(nextImage()),
    //   delay
    // );
    // getLocalGoals();
  }, [dispatch]);
  return (
    <div className={styles.slideshow}>
      <div
        className={styles.slideshowSlider}
        style={{ transform: `translate3d(${-imageIndex * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            className={styles.slide}
            key={index}
            style={{
              backgroundImage: `url(${image.urls.full})`,
            }}
          >
            {/* <main id="main">{props.children}</main> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageContainer;
