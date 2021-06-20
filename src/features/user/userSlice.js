import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postLogin } from 'services/AccountApi';

export const login = createAsyncThunk(
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

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: false,
		isLoading: false,
		error: '',
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
		[login.pending]: (state) => {
			state.isLoading = true;
		},

		[login.fulfilled]: (state) => {
			state.isLoading = false;
		},

		[login.rejected]: (state, action) => {
			state.isLoading = false;
			console.log(action);
			state.error = action.payload;
		},
	},
});

export default userSlice.reducer;
