import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface weatherProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: weatherProps[];
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  timezone: number;
  wind: {
    speed: number;
    deg: number;
  };
}
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5f1e0e91073e047bfd37039ad433153`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: {} as WeatherData, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error.message || 'Unknown error';
      });
  },
});

export default weatherSlice.reducer;
