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

const defaultWeatherData: WeatherData = {
  id: 0,
  name: '',
  coord: {
    lat: 0,
    lon: 0,
  },
  weather: [],
  dt: 0,
  main: {
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
  },
  sys: {
    country: '',
  },
  timezone: 0,
  wind: {
    speed: 0,
    deg: 0,
  },
};

const initialState: {
  data: WeatherData;
  loading: boolean;
  error: null | string;
  searchError: null | string;
} = {
  data: defaultWeatherData,
  loading: false,
  error: null,
  searchError: null,
};
export const fetchWeather = createAsyncThunk<
  WeatherData, // kiểu dữ liệu trả về khi thành công
  string, // kiểu dữ liệu của tham số truyền vào
  {
    rejectValue: {
      message: string;
    };
  }
>('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5f1e0e91073e047bfd37039ad433153`
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchError = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.searchError = action.payload.message; // Lưu thông báo lỗi của tìm kiếm vào searchError
        } else {
          state.error = action.error.message || 'Unknown error';
        }
      });
  },
});

export default weatherSlice.reducer;
