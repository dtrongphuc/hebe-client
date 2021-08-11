import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	isAuth,
	postLogin,
	postRegister,
	getLogout,
} from 'services/AccountApi';

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

export const logoutThunk = createAsyncThunk('user/logout', async () => {
	const response = await getLogout();
	return response;
});

export const checkAuthThunk = createAsyncThunk('user/check', async () => {
	const result = await isAuth();
	return result;
});

const authFulfilled = (state, action) => {
	const { email, firstName, lastName, role } = action.payload;
	state.isLoading = false;
	state.email = email;
	state.firstName = firstName;
	state.lastName = lastName;
	state.role = role;
};

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: null,
		isLoading: null,
		email: '',
		firstName: '',
		lastName: '',
		role: '',
	},
	reducers: {
		login: (state) => {
			state.isLogged = true;
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

		[logoutThunk.fulfilled]: (state) => {
			return {
				...state,
				isLogged: null,
				isLoading: null,
				email: '',
				firstName: '',
				lastName: '',
				role: '',
			};
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

export const { login } = userSlice.actions;

export default userSlice.reducer;
