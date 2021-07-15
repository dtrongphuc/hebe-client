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
	delivery: 'shipping',
	shippingPrice: {
		display: 'Calculated at next step',
		price: '0',
	},
	pickupLocations: [],
	pickupLocationSelected: '',
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
		deliveryChange: (state, action) => {
			const delivery = action.payload;
			if (delivery === 'shipping') {
				state.shippingPrice.display = initialState.shippingPrice.display;
				state.shippingPrice.price = initialState.shippingPrice.price;
			}
			state.delivery = delivery;
		},
		setPickupLocation: (state, action) => {
			state.pickupLocations = action.payload;
		},
		pickupLocationSelectedChange: (state, action) => {
			let location = state.pickupLocations.find(
				({ _id }) => _id === action.payload
			);

			return {
				...state,
				pickupLocationSelected: action.payload,
				shippingPrice: {
					...state.shippingPrice,
					display: location.displayPrice,
					price: location.price,
				},
			};
		},
	},
});

export const {
	selectedAddressChange,
	resetAddress,
	addressFieldChange,
	deliveryChange,
	setPickupLocation,
	pickupLocationSelectedChange,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
