import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { selectImage, loadImage } from "./components/image/imageSlice";
import "./App.css";
import { Box, IconButton, TextField  } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function App() {
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectImage);

  console.log("image", image);

  useEffect(() => {
    // console.log('1111');
    dispatch(loadImage());
  }, [dispatch]);

  return (
    <div
      className="App"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Box display="flex">
        <IconButton aria-label="prev image">
          <ArrowBackIosIcon />
        </IconButton>
        <TextField fullWidth variant="outlined" color="primary" sx={{ backgroundColor: 'white', opacity: '0.5' }}/>
        <IconButton aria-label="next image">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default App;
