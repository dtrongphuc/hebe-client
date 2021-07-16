import { getPickupLocations, getShippingMethods } from 'services/SettingApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getPickupLocationsThunk = createAsyncThunk(
	'checkout/get-pickup-locations',
	async () => {
		const response = await getPickupLocations();
		return response?.locations;
	}
);

export const getShippingMethodsThunk = createAsyncThunk(
	'checkout/get-shipping-method',
	async () => {
		const response = await getShippingMethods();
		return response.shippingMethods;
	}
);

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
		price: null,
	},
	pickupLocations: [],
	pickupLocationSelected: '',
	shippingMethods: [],
	shippingMethodSelected: '',
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
		pickupLocationSelectedChange: (state, action) => {
			let location = state.pickupLocations.find(
				({ _id }) => _id === action.payload
			);
			if (location) {
				return {
					...state,
					pickupLocationSelected: action.payload,
					shippingPrice: {
						...state.shippingPrice,
						display: location.displayPrice,
						price: location.price,
					},
				};
			}
		},
		shippingMethodSelectedChange: (state, action) => {
			let method = state.shippingMethods.find(
				(method) => method._id === action.payload
			);
			if (method) {
				return {
					...state,
					shippingMethodSelected: action.payload,
					shippingPrice: {
						...state.shippingPrice,
						display: method.displayPrice,
						price: method.price,
					},
				};
			}
		},
	},
	extraReducers: {
		[getPickupLocationsThunk.fulfilled]: (state, action) => {
			let locations = action.payload;
			state.pickupLocations = locations;
			if (locations.length > 0) {
				state.pickupLocationSelected = locations[0]._id;
				state.shippingPrice.display = locations[0].displayPrice;
				state.shippingPrice.price = locations[0].price;
			}
		},
		[getPickupLocationsThunk.rejected]: (state) => {
			return {
				...state,
				pickupLocations: initialState.pickupLocations,
				pickupLocationSelected: initialState.pickupLocationSelected,
				shippingPrice: {
					display: initialState.shippingPrice.display,
					price: initialState.shippingPrice.price,
				},
			};
		},
		[getShippingMethodsThunk.fulfilled]: (state, action) => {
			let methods = action.payload;
			state.shippingMethods = methods;
			if (methods.length > 0) {
				state.shippingMethodSelected = methods[0]._id;
				state.shippingPrice.display = methods[0].displayPrice;
				state.shippingPrice.price = methods[0].price;
			}
		},
		[getShippingMethodsThunk.rejected]: (state) => {
			return {
				...state,
				shippingMethods: initialState.shippingMethods,
				shippingMethodSelected: initialState.shippingMethodSelected,
				shippingPrice: {
					display: initialState.shippingPrice.display,
					price: initialState.shippingPrice.price,
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
	pickupLocationSelectedChange,
	shippingMethodSelectedChange,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
