import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Hour {
  temp: number;
  dt: number;
}

export interface Daily {
  temp: {
    day: number;
  };
  dt: number;
  weather: {
    description: string;
    icon: string;
    length: any;
    0: any;
  };
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
  initialState: { data: {} as CoordinatesProps, loading: false, error: null },
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
