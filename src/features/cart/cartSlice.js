import { fetchCart } from 'services/CartApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchCartThunk = createAsyncThunk('cart/fetch', async () => {
	const response = await fetchCart();
	return response?.cart;
});

const initialState = {
	cart: [],
	total: 0,
	showPopup: false,
	numberCart: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchCartThunk.fulfilled]: (state, action) => {
			state.cart = action.payload;
			state.total = action.payload?.totalPrice;
			state.numberCart = action.payload?.products?.length;
		},
	},
});

export default cartSlice.reducer;
