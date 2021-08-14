import { fetchCart, updateStock } from 'services/CartApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchCartThunk = createAsyncThunk('cart/fetch', async () => {
	const response = await fetchCart();
	return response?.cart;
});

export const updateThunk = createAsyncThunk(
	'cart/update',
	async ({ action_type, info, update }) => {
		const response = await updateStock(action_type, info, update);
		return response;
	}
);

const initialState = {
	shoppingCart: {},
	total: 0,
	showPopup: false,
	numberCart: 0,
	warning: '',
	loading: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		quantityChange: (state, action) => {
			const { itemId, quantity } = action.payload;
			let item = state.shoppingCart?.products?.find(
				(item) => item._id === itemId
			);
			item.quantity = quantity;
		},
		clearCart: (state, action) => {
			return {
				...initialState,
			};
		},
	},
	extraReducers: {
		[fetchCartThunk.fulfilled]: (state, action) => {
			state.loading = false;
			state.shoppingCart = action.payload;
			state.total = action.payload?.totalPrice;
			state.numberCart = action.payload?.products?.length;
		},
		[updateThunk.pending]: (state) => {
			state.warning = '';
			state.loading = true;
		},
		[updateThunk.fulfilled]: (state, action) => {
			const { cart, updated, msg } = action.payload;
			state.loading = false;
			state.warning = msg;

			if (updated) {
				state.shoppingCart = cart;
				state.total = cart?.totalPrice || 0;
				state.numberCart = cart?.products?.length;
			}
		},
		[updateThunk.rejected]: (state, action) => {
			state.loading = false;
		},
	},
});

export const { quantityChange, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
