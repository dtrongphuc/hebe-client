import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countAddresses, getAllAddresses } from 'services/AddressApi';

export const getAllAddressThunk = createAsyncThunk(
	'address/get-all',
	async () => {
		const response = await getAllAddresses();
		return response?.addresses;
	}
);

export const countAddressesThunk = createAsyncThunk(
	'address/count',
	async () => {
		const response = await countAddresses();
		return response?.count;
	}
);

const initialState = {
	addresses: [],
	count: 0,
	isLoading: false,
	addressForm: {
		open: false,
		type: 'add',
		editId: '',
	},
};

export const addressSlice = createSlice({
	name: 'address',
	initialState: initialState,
	reducers: {
		openAddForm: (state) => {
			if (state.addressForm.open) {
				state.addressForm.open = false;
			} else {
				state.addressForm.type = 'add';
				state.addressForm.open = true;
			}
		},

		openEditForm: (state, action) => {
			if (state.addressForm.open) {
				state.addressForm.open = false;
			} else {
				state.addressForm.type = 'edit';
				state.addressForm.editId = action.payload;
				state.addressForm.open = true;
			}
		},

		closeForm: (state) => {
			state.addressForm.open = false;
		},
	},
	extraReducers: {
		[getAllAddressThunk.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllAddressThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.addresses = action.payload;
		},
		[getAllAddressThunk.rejected]: (state) => {
			state.isLoading = false;
		},

		[countAddressesThunk.pending]: (state) => {
			state.isLoading = true;
		},
		[countAddressesThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.count = action.payload;
		},
		[countAddressesThunk.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const { openAddForm, openEditForm, closeForm } = addressSlice.actions;

export default addressSlice.reducer;
