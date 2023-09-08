import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { Image, ImageState } from '../../types/types';


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
            let data = await fetch('https://vercel-homepage-server.vercel.app/images', { mode: "cors" });
            const json = await data.json();
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
                state.images = action.payload;
            }
            state.bgImageUrl = action.payload[state.bgImageIndex].urls.full;
        },
        [loadImage.rejected.type]: (state) => {
            state.isLoadingImage = false;
            state.failedToLoadImage = true;
        }
    }
});

export const selectImages = (state: RootState): Image[] => {
    return state.image.images;
};
export const selectImageIndex = (state: RootState): number => {
    return state.image.bgImageIndex;
};
export const isLoadingImage = (state: RootState) => state.image.isLoadingImage;
export const { prevImage, nextImage, setIndex } = imageSlice.actions;
export default imageSlice.reducer;
