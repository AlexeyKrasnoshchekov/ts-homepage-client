import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { prevImage } from "./imageSlice";
import { useAppDispatch } from "../../hooks/redux";

import styles from "./image.module.scss";

export default function ImageArrows() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.arrowLeft}>
      <IconButton onClick={() => dispatch(prevImage())} aria-label="prev image">
        <ArrowBackIosIcon />
      </IconButton>
    </div>
  );
}
