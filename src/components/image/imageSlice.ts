import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {Image, ImageState} from '../../types/types';
// import Data from "../../data/weatherAPI";


const initialState: ImageState = {
    images: [],
    bgImageUrl: "",
    bgImageIndex: 0,
    isLoadingImage: false,
    failedToLoadImage: false
};

export const loadImage = createAsyncThunk(
    'image/loadImage',
    async (_, thunkAPI) => {
        try {
            // console.log('Data', Data);
            let data = await fetch('https://nice-homepage.herokuapp.com/images', { mode: "cors" });
            // console.log('response', data);
            const json = await data.json();
            // console.log('2222222jsonImage', json);
            return json;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не удалось загрузить картинки")
        }

    }
)

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        prevImage: (state) => {
            if (state.bgImageIndex > 0 && state.bgImageIndex <= 4) {
                state.bgImageIndex--;
            } else {
                state.bgImageIndex = 4;
            }

            state.bgImageUrl = state.images[state.bgImageIndex].urls.full;

        },
        nextImage: (state) => {
            if (state.bgImageIndex >= 0 && state.bgImageIndex < 4) {
                state.bgImageIndex++;
            } else {
                state.bgImageIndex = 0;
            }
            // console.log('state.bgImageIndex', state.bgImageIndex);
            // console.log('action.payload777', action.payload);
            state.bgImageUrl = state.images[state.bgImageIndex].urls.full;

        },
        setIndex: (state, action: PayloadAction<number>) => {
           
            state.bgImageIndex = action.payload;
           

        }
    },
    extraReducers: {
        [loadImage.pending.type]: (state) => {
            state.isLoadingImage = true;
            state.failedToLoadImage = false;
        },
        [loadImage.fulfilled.type]: (state, action: PayloadAction<Image[]>) => {
            if (action.payload.length !== 0) {
                // action.payload.forEach(image => {
                //     state.images.push(image);
                // })
                state.images = action.payload;
            }
            // console.log('555Image', action.payload.urls);
            state.bgImageUrl = action.payload[state.bgImageIndex].urls.full;
            // state.isLoadingImage = false;
            // state.failedToLoadImage = false;
        },
        [loadImage.rejected.type]: (state) => {
            // state.image = {};
            state.isLoadingImage = false;
            state.failedToLoadImage = true;
        }
    }
});

export const selectImages = (state: RootState):Image[] => {
    // console.log('state555444', state.image);
    return state.image.images;
};
export const selectImageIndex = (state: RootState):number => {
    // console.log('state555444', state.image);
    return state.image.bgImageIndex;
};
export const isLoadingImage = (state: RootState) => state.image.isLoadingImage;
export const { prevImage, nextImage, setIndex } = imageSlice.actions;
export default imageSlice.reducer;
