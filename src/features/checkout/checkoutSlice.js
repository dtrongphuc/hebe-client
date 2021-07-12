const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	address: {
		firstname: '',
		lastname: '',
		company: '',
		address: '',
		apartment: '',
		city: '',
		country: 'Afghanistan',
		postal: '',
		phone: '',
	},
	delivery: 'ship',
	shipping: '',
};

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		selectedAddressChange: (state, action) => {
			const newAddress = action.payload;

			return {
				...state,
				address: {
					...state.address,
					...newAddress,
				},
			};
		},
		resetAddress: (state) => {
			return {
				...state,
				address: {
					...state.address,
					...initialState.address,
				},
			};
		},
		addressFieldChange: (state, action) => {
			const field = action.payload;

			return {
				...state,
				address: {
					...state.address,
					...field,
				},
			};
		},
		onChange: (state, action) => {
			const field = action.payload;

			return {
				...state,
				...field,
			};
		},
	},
});

export const {
	selectedAddressChange,
	resetAddress,
	addressFieldChange,
	onChange,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
