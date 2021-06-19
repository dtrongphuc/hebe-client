import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userId: null,
		isLogged: false,
	},
	reducers: {
		login: (state, action) => {
			state.userId = action.payload;
			state.isLogged = true;
		},
		logout: (state) => {
			state.userId = null;
			state.isLogged = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
