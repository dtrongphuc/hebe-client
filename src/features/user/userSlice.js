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

const authFulfilled = (state, action) => {
	const { email, firstName, lastName } = action.payload;
	state.isLoading = false;
	state.email = email;
	state.firstName = firstName;
	state.lastName = lastName;
};

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: null,
		isLoading: null,
		email: '',
		firstName: '',
		lastName: '',
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

		[loginThunk.fulfilled]: authFulfilled,

		[loginThunk.rejected]: (state) => {
			state.isLoading = false;
		},

		[registerThunk.pending]: (state) => {
			state.isLoading = true;
		},

		[registerThunk.fulfilled]: authFulfilled,

		[registerThunk.rejected]: (state) => {
			state.isLoading = false;
		},

		[checkAuthThunk.pending]: (state) => {
			state.isLoading = true;
			state.isLogged = false;
		},
		[checkAuthThunk.fulfilled]: (state, action) => {
			const { loggedIn, email, firstName, lastName } = action.payload;
			state.isLoading = false;
			state.isLogged = loggedIn;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
		},
		[checkAuthThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.isLogged = action.payload;
			state.email = '';
			state.firstName = '';
			state.lastName = '';
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
