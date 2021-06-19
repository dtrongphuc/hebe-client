import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLogged: false,
	},
	reducers: {
		login: (state, action) => {
			state.isLogged = true;
		},
		logout: (state) => {
			state.isLogged = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
