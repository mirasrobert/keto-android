import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axiosConfig';
import {showAlert} from '../../components/helpers/helpers';

// Get Blood Sugar List
export const getBloodSugarList = createAsyncThunk(
  'bloodSugar/getBloodSugarList',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.get('/api/bloodsugar/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Add Blood Sugar Record
// Register User
export const addBloodSugar = createAsyncThunk(
  'bloodSugar/addBloodSugar',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.post('/api/bloodsugar/', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      showAlert('Success', 'Blood Sugar Record Added');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error adding your record');
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  bloodSugars: [],
  error: null,
};

export const bloodSugarSlice = createSlice({
  name: 'bloodSugar',
  initialState,
  reducers: {
    resetState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBloodSugarList.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBloodSugarList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodSugars = action.payload;
        state.error = null;
      })
      .addCase(getBloodSugarList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodSugars = [];
      })
      .addCase(addBloodSugar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBloodSugar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodSugars = [action.payload, ...state.bloodSugars];
        state.error = null;
      })
      .addCase(addBloodSugar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodSugars = [];
      });
  },
});

export const {resetState} = bloodSugarSlice.actions;
export default bloodSugarSlice.reducer;
