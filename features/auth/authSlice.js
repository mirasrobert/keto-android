import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axiosConfig';
import {showAlert} from '../../components/helpers/helpers';

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
      showAlert('Login Failed', 'Invalid username or password');

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
        '/api/auth/logout/',
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
      showAlert('Register Failed', 'Email already exists');
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

      const title = success ? 'Verification Successful' : 'Verification Failed';

      // Show Message
      showAlert(title, 'Email verified successfully');

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Resend Code
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (formData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const response = await api.post('/api/auth/resend_otp', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const {success, message} = response.data;

      const title = 'Verification Code';

      // Show Message
      if (success) {
        showAlert(title, 'Code has been resent to your email');
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return showAlert('Verification Code', 'Failed to resend code');
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
        state.loginHasError = false;
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
        state.registerHasError = false;
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
        state.registerHasError = true;

        console.log('Register Error', action.payload);
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
