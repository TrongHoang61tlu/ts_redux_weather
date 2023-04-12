import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface temperatureProps {
  celsius: number;
  isCelsius: boolean;
}

const initialState: temperatureProps = {
  celsius: 0,
  isCelsius: true,
};

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    setCalsius: (state, action: PayloadAction<number>) => {
      state.celsius = action.payload;    
    },
    toggleUnit: (state) => {
      state.isCelsius = !state.isCelsius;
    },
  },
});

export const {setCalsius, toggleUnit} = temperatureSlice.actions;
export default temperatureSlice.reducer;
