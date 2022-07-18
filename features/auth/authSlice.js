import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axiosConfig';

// Get User
export const getUser = createAsyncThunk('auth/user', async (_, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    const response = await api.get('/api/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/api/auth/login', formData.data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const showAlert = () =>
        formData.alert.alert('Login Failed', 'Invalid username or password', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      showAlert();

      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logutUser',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      console.log('Logout Token is ', token);
      await api.post(
        '/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        success: false,
      });
    }
  },
);

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Verify User
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.post('/api/auth/verify', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const {success, message} = response.data;

      // Show Message
      if (success) {
        formData.alert.alert('Verification Successful', 'Email is verified.', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      } else {
        formData.alert.alert('Verification Failed', message, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }

      return response.data;
    } catch (error) {
      console.log(error);

      formData.alert.alert('Verification Failed', error.response.data.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const saveToken = async token => {
  try {
    await AsyncStorage.setItem('@token', token);
    console.log('Token saved');
    return token;
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@token');
    console.log('Token removed');
    return true;
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  token: null,
  loginHasError: false,
  registerHasError: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (state.user) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.registerHasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('loginUser.fulfilled');
        console.log('payload:', action.payload);
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (state.user) {
          saveToken(action.payload.token).catch(e =>
            console.log('Error saving token', e),
          );
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          removeToken().catch(e =>
            console.log('Something went wrong removing token', e),
          );
          state.user = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('loginUser.rejected');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.loginHasError = true;
        console.log('Login Error', action.payload);
      })
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.loginHasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('registerUser.fulfilled');
        console.log('payload:', action.payload);
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (state.user) {
          saveToken(action.payload.token).catch(e =>
            console.log('Error saving token', e),
          );
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          removeToken().catch(e =>
            console.log('Something went wrong removing token', e),
          );
          state.user = null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('registerUser.rejected');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;

        console.log('Login Error', action.payload);
      })
      .addCase(verifyUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          is_verified: action.payload.success,
        };
        state.error = null;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        console.log('verifyUser.rejected');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.registerHasError = true;
        console.log('Verify Error', action.payload);
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        removeToken().catch(e => console.log('Logout Error', e));
      })
      .addCase(logoutUser.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Something went wrong logging out';
        removeToken().catch(e =>
          console.log('Something went wrong removing token', e),
        );
      });
  },
});

export const {resetState} = authSlice.actions;
export default authSlice.reducer;
