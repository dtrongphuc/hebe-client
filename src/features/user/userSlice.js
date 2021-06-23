import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postLogin, postRegister } from 'services/AccountApi';

export const loginThunk = createAsyncThunk(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await postLogin(email, password);
			return response;
		} catch (error) {
			if (!error.data) {
				throw error;
			}
			return rejectWithValue({
				status: error.status,
				errors: error.data?.errors,
			});
		}
	}
);

export const registerThunk = createAsyncThunk(
	'user/register',
	async (formData, { rejectWithValue }) => {
		try {
			const response = await postRegister(formData);
			return response;
		} catch (error) {
			if (!error.data) {
				throw error;
			}
			return rejectWithValue({
				status: error.status,
				errors: error.data?.errors,
			});
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: false,
		isLoading: false,
	},
	reducers: {
		login: (state) => {
			state.isLogged = true;
		},
		logout: (state) => {
			state.isLogged = false;
		},
	},
	extraReducers: {
		[loginThunk.pending]: (state) => {
			state.isLoading = true;
		},

		[loginThunk.fulfilled]: (state) => {
			state.isLoading = false;
		},

		[loginThunk.rejected]: (state) => {
			state.isLoading = false;
		},

		[registerThunk.pending]: (state) => {
			state.isLoading = true;
		},

		[registerThunk.fulfilled]: (state) => {
			state.isLoading = false;
		},

		[registerThunk.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
