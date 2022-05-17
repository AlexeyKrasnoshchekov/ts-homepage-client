// import { useState } from "react";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
import { WeatherState } from '../../types/types';

// const proxy = "https://cors-anywhere.herokuapp.com/";
// const APP_ID = process.env.REACT_APP_API_ID;

interface Coords {
    lat: number,
    long: number
}

// let long;
// let lat;
// let icon = "";

const initialState: WeatherState = {
    weather: {
        icon: '',
        degree: 0,
        descr: ''
    },
    url: "",
    isLoadingWeather: false,
    failedToLoadWeather: false
};

// const selectUrl = (state) => {
//     return state.weather;
// };


export const loadWeather = createAsyncThunk(
    'weather/loadWeather',
    async (args: Coords, thunkAPI) => {
        const { lat, long } = args;
        try {
            let data = await fetch(`https://nice-homepage.herokuapp.com/weather/?lat=${lat}&lon=${long}`, { mode: "cors" });
            const json = await data.json();

            
            console.log('444444444', json);
            return json;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не удалось загрузить картинки")
        }

    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        // createUrl: (state, action) => {
        //     console.log('11111111payload', action.payload);
        //     state.url = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${action.payload.lat}&lon=${action.payload.long}&units=imperial&appid=${APP_ID}`;

        // }
    },
    extraReducers: {
        [loadWeather.pending.type]: (state) => {
            state.isLoadingWeather = true;
            state.failedToLoadWeather = false;
        },
        [loadWeather.fulfilled.type]: (state, action) => {
            // console.log('action.payload.weather[0]', action.payload.weather[0]);

            let code:number = action.payload.weather[0].id;
            // let icon: string;
            if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                let codeStr:string = String(code);
                state.weather.icon = "day-" + WeatherIcons[codeStr as keyof typeof WeatherIcons].icon;
            }

            // state.weather.icon = icon;
            state.weather.degree = Math.floor((action.payload.main.temp - 32) * (5 / 9));
            state.weather.descr = action.payload.weather[0].description;
            state.isLoadingWeather = false;
            state.failedToLoadWeather = false;
        },
        [loadWeather.rejected.type]: (state) => {
            // state.weather = {};
            state.isLoadingWeather = false;
            state.failedToLoadWeather = true;
        }
    }
});



// export const selectWeather = (state) => state.weather.weather;

export const selectWeather = (state: RootState) => {
    // console.log('stateWeather', state.weather);
    return state.weather.weather
};

export const isLoadingWeather = (state: RootState): boolean => state.weather.isLoadingWeather;
// export const { createUrl } = weatherSlice.actions;

export default weatherSlice.reducer;
