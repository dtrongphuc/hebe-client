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
			return rejectWithValue(error.data.message);
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
			return rejectWithValue(error.data.message);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: false,
		isLoading: false,
		error: '',
		validateErrors: [],
	},
	reducers: {
		login: (state, action) => {
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

		[loginThunk.fulfilled]: (state, action) => {
			let { success, fieldsError, message } = action.payload;

			if (success === false && fieldsError === 'page') {
				state.error = message;
			}
			state.isLoading = false;
		},

		[loginThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		[registerThunk.pending]: (state) => {
			state.isLoading = true;
		},

		[registerThunk.fulfilled]: (state, action) => {
			let { success, fieldsError, message } = action.payload;
			if (success === false && fieldsError === 'page') {
				state.error = message;
			}
			state.isLoading = false;
		},

		[registerThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
