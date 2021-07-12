import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import addressReducer from 'features/address/addressSlice';
import cartReducer from 'features/cart/cartSlice';
import checkoutReducer from 'features/checkout/checkoutSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		address: addressReducer,
		cart: cartReducer,
		checkout: checkoutReducer,
	},
});
