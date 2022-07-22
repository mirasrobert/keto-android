import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axiosConfig';
import {showAlert} from '../../components/helpers/helpers';

// Get Blood Pressure List
export const getBloodPressureList = createAsyncThunk(
  'bloodPressure/getBloodPressureList',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.get('/api/bloodpressure/', {
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

// Add Blood Pressure Record
export const addBloodPressure = createAsyncThunk(
  'bloodPressure/addBloodPressure',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.post('/api/bloodpressure/', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      showAlert('Success', 'Blood Pressure Record Added');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error adding your record');
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Edit Blood Pressure Record
export const editBloodPressure = createAsyncThunk(
  'bloodPressure/editBloodPressure',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.put(
        `/api/bloodpressure/${formData.id}/update/`,
        formData.form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      showAlert('Success', 'Blood Pressure Record Updated');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error updating your record');
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Delete Blood Pressure Record
export const deleteBloodPressure = createAsyncThunk(
  'bloodPressure/deleteBloodPressure',
  async (data, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.delete(
        `/api/bloodpressure/${data.id}/delete/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      showAlert('Success', 'Blood Pressure Record Removed');

      return response.data;
    } catch (error) {
      showAlert('Error', 'Error removing your record');
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  bloodPressureList: [],
  error: null,
};

export const bloodPressureSlice = createSlice({
  name: 'bloodPressure',
  initialState,
  reducers: {
    resetState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBloodPressureList.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBloodPressureList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodPressureList = action.payload;
        state.error = null;
      })
      .addCase(getBloodPressureList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodPressureList = [];
      })
      .addCase(addBloodPressure.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBloodPressure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodPressureList = [action.payload, ...state.bloodPressureList];
        state.error = null;
      })
      .addCase(addBloodPressure.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodPressureList = [];
      })
      .addCase(editBloodPressure.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editBloodPressure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodPressureList = state.bloodPressureList.map(bloodPressure =>
          bloodPressure.id === action.payload.id
            ? action.payload
            : bloodPressure,
        );
        state.error = null;
      })
      .addCase(editBloodPressure.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodPressureList = [];
      })
      .addCase(deleteBloodPressure.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBloodPressure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bloodPressureList = state.bloodPressureList.filter(
          bloodPressure => bloodPressure.id !== action.payload.id,
        );
        state.error = null;
      })
      .addCase(deleteBloodPressure.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.bloodPressureList = [];
      });
  },
});

export const {resetState} = bloodPressureSlice.actions;
export default bloodPressureSlice.reducer;
