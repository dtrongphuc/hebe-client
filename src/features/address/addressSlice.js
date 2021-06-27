import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAddresses } from 'services/AddressApi';

export const getAllAddressThunk = createAsyncThunk(
	'address/get-all',
	async () => {
		const response = await getAllAddresses();
		return response?.addresses;
	}
);

export const addressSlice = createSlice({
	name: 'address',
	initialState: {
		addresses: [],
		count: 0,
		isLoading: false,
	},
	reducers: {},
	extraReducers: {
		[getAllAddressThunk.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllAddressThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.addresses = action.payload;
			state.count = action.payload?.length;
		},
		[getAllAddressThunk.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default addressSlice.reducer;
