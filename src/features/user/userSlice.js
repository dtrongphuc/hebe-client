import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAuth, postLogin, postRegister } from 'services/AccountApi';

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

export const checkAuthThunk = createAsyncThunk('user/check', async () => {
	const result = await isAuth();
	return result;
});

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: null,
		isLoading: null,
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

		[checkAuthThunk.pending]: (state) => {
			state.isLoading = true;
			state.isLogged = false;
		},
		[checkAuthThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isLogged = action.payload;
		},
		[checkAuthThunk.pending]: (state, action) => {
			state.isLoading = false;
			state.isLogged = action.payload;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
