import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { QuoteState } from '../../types/types';
import { RootState } from '../../store/store';
// import Data from "../../data/weatherAPI";
// const proxy = "https://cors-anywhere.herokuapp.com/";

// const API_URL = `${proxy}http://quotes.rest/quote/random.json?api_key=<alexalex>`;


const initialState: QuoteState = {
    quote: "",
    isLoadingQuote: false,
    failedToLoadQuote: false
};

export const loadQuote = createAsyncThunk(
    'quote/loadQuote',
    async (_, thunkAPI) => {
        try {
            let data = await fetch(`https://quotes.rest/qod?category=inspire`);
            // console.log('response', response);
            const json = await data.json();
            // console.log('jsonQuote', json);
            return json.contents.quotes[0].quote;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не удалось загрузить картинки")
        }
    }
)

export const quoteSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [loadQuote.pending.type]: (state) => {
            state.isLoadingQuote = true;
            state.failedToLoadQuote = false;
        },
        [loadQuote.fulfilled.type]: (state, action:PayloadAction<string>) => {
            // console.log('action.payloadQuote', action.payload);
            state.quote = action.payload;
            state.isLoadingQuote = false;
            state.failedToLoadQuote = false;
        },
        [loadQuote.rejected.type]: (state) => {
            // state.quote = {};
            state.isLoadingQuote = false;
            state.failedToLoadQuote = true;
        }
    }
});

export const selectQuote = (state:RootState):string => {
    // console.log('quote', state.quote);
    return state.quote.quote
};
export const isLoadingQuote = (state:RootState):boolean => state.quote.isLoadingQuote;

export default quoteSlice.reducer;
