import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ID = '26a95b3f';
const API_KEY = '43900955f1d59c37732a9bfc7b86b833';

// Crea un thunk asincrónico para obtener las recetas desde la API
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (searchTerm) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${searchTerm}&app_id=${API_ID}&app_key=${API_KEY}`
  );
  return response.data.hits;
});



const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
