// import { useState } from "react";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
import { WeatherState } from '../../types/types';

interface Coords {
    lat: number,
    long: number
}

const initialState: WeatherState = {
    weather: {
        icon: '',
        degree: 0,
        descr: '',
        city: ''
    },
    url: "",
    isLoadingWeather: false,
    failedToLoadWeather: false
};

export const loadWeather = createAsyncThunk(
    'weather/loadWeather',
    async (args: Coords, thunkAPI) => {
        const { lat, long } = args;
        try {
            let data = await fetch(`https://vercel-homepage-server.vercel.app/weather/?lat=${lat}&lon=${long}`, { mode: "cors" });
            const json = await data.json();
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
    },
    extraReducers: {
        [loadWeather.pending.type]: (state) => {
            state.isLoadingWeather = true;
            state.failedToLoadWeather = false;
        },
        [loadWeather.fulfilled.type]: (state, action) => {

            let code: number = action.payload.weather[0].id;
            if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                let codeStr: string = String(code);
                state.weather.icon = "day-" + WeatherIcons[codeStr as keyof typeof WeatherIcons].icon;
            }
            state.weather.degree = Math.floor((action.payload.main.temp - 32) * (5 / 9));
            state.weather.descr = action.payload.weather[0].description;
            state.weather.city = action.payload.name;
            state.isLoadingWeather = false;
            state.failedToLoadWeather = false;
        },
        [loadWeather.rejected.type]: (state) => {
            state.isLoadingWeather = false;
            state.failedToLoadWeather = true;
        }
    }
});

export const selectWeather = (state: RootState) => {
    return state.weather.weather
};

export const isLoadingWeather = (state: RootState): boolean => state.weather.isLoadingWeather;

export default weatherSlice.reducer;
