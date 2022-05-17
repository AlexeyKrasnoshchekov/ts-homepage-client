import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { nextImage } from "./imageSlice";
import { useAppDispatch } from "../../hooks/redux";

import styles from "./image.module.scss";

export default function ImageArrowRight() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.imageArrowRight}>
      <IconButton onClick={() => dispatch(nextImage())} aria-label="next image">
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
