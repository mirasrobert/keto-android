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

// Edit Blood Sugar Record
export const editBloodSugar = createAsyncThunk(
  'bloodSugar/editBloodSugar',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.put(
        `/api/bloodsugar/${formData.id}/update/`,
        formData.form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      showAlert('Success', 'Blood Sugar Record Updated');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error updating your record');
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Delete Blood Sugar Record
export const deleteBloodSugar = createAsyncThunk(
  'bloodSugar/deleteBloodSugar',
  async (data, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.delete(`/api/bloodsugar/${data.id}/delete/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      showAlert('Success', 'Blood Sugar Record Removed');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error removing your record');
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// List of Blood Sugar By Single Date
export const filterBloodSugarListByDate = createAsyncThunk(
  'bloodSugar/filterBloodSugarListByDate',
  async (data, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.get(
        `/api/bloodsugar/get_by_single_date?date=${data.date}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      showAlert('Error', 'Error filtering your record');
      console.log(error.response.data);
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
      .addCase(filterBloodSugarListByDate.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterBloodSugarListByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodSugars = action.payload;
        state.error = null;
      })
      .addCase(filterBloodSugarListByDate.rejected, (state, action) => {
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
      })
      .addCase(editBloodSugar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editBloodSugar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodSugars = state.bloodSugars.map(bloodSugar =>
          bloodSugar.id === action.payload.id ? action.payload : bloodSugar,
        );
        state.error = null;
      })
      .addCase(editBloodSugar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodSugars = [];
      })
      .addCase(deleteBloodSugar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBloodSugar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodSugars = state.bloodSugars.filter(
          bloodSugar => bloodSugar.id !== action.payload.id,
        );
        state.error = null;
      })
      .addCase(deleteBloodSugar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodSugars = [];
      });
  },
});

export const {resetState} = bloodSugarSlice.actions;
export default bloodSugarSlice.reducer;
