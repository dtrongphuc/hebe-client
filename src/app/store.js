import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from 'features/user/userSlice';
import addressReducer from 'features/address/addressSlice';
import cartReducer from 'features/cart/cartSlice';
import checkoutReducer from 'features/checkout/checkoutSlice';
import creditCardReducer from 'features/checkout/creditCardSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import { FLUSH } from 'redux-persist/es/constants';
import { REHYDRATE } from 'redux-persist/es/constants';
import { PAUSE } from 'redux-persist';
import { PERSIST } from 'redux-persist/es/constants';
import { PURGE } from 'redux-persist/es/constants';
import { REGISTER } from 'redux-persist/es/constants';

const reducer = combineReducers({
	user: userReducer,
	address: addressReducer,
	cart: cartReducer,
	checkout: checkoutReducer,
	creditCard: creditCardReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['address', 'user', 'creditCard', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
