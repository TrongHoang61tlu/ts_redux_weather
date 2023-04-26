import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchText: string;
};

const initialState: SearchState = {
  searchText: 'hanoi',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    
  },
});

export const {setSearchText} = searchSlice.actions; 
export default searchSlice.reducer;
