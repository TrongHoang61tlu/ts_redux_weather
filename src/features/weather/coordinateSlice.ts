import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Weather {
  main: string;
  description: string;
  icon: string;
  length: any;
  0: any;
}

export interface Hour {
  temp: number;
  dt: number;
  time: number;
  weather: Weather[];
  dew_point: number;
  wind_deg: number;
  wind_speed: number;
  feels_like: number;
  humidity: number;
  uvi: number;
  clouds: number;
  pressure: number;
}

export interface Daily {
  temp: {
    day: number;
    night: number;
  };
  dt: number;
  weather: Weather[];
  id: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  humidity: number;
  uvi: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  dew_point: number;
}
interface CoordinatesProps {
  lat: number;
  lon: number;
  current: {
    temp: number;
  };
  weather: {
    description: string;
  };
  hourly: Hour[];
  daily: Daily[];
}

const defaultCoordinatesProps: CoordinatesProps = {
  hourly: [],
  daily: [],
  lat: 0,
  lon: 0,
  current :{
    temp: 0,
  },
  weather : {
    description: '',
  }
};

const initialState: { data: CoordinatesProps, loading: boolean, error: null } = {
  data: defaultCoordinatesProps,
  loading: false,
  error: null
};

export const fetchCoordinates = createAsyncThunk(
  'weather/fetchCoordinates',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=e5f1e0e91073e047bfd37039ad433153`
    );
    return response.data;
  }
);

const CoordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoordinates.rejected, (state, action) => {
        state.loading = false;
        // state.error= action.error.message|| ' ';
      });
  },
});

export default CoordinatesSlice.reducer;
