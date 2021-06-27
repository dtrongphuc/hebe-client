import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import addressReducer from 'features/address/addressSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		address: addressReducer,
	},
});
