import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'AUTH/REGISTER',
  async (registerData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', registerData);
      setHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'AUTH/LOGIN',
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', loginData);
      setHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'AUTH/REFRESH_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    setHeader(token);

    try {
      const response = await axios.get('/users/current');
      // console.log({ token });
      // console.log({ response });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk('AUTH/LOG_OUT', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearToken();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
