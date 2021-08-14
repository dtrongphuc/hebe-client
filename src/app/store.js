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
import discountReducer from 'admin/reducers/discountSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [],
};

const checkoutPersistConfig = {
	key: 'checkout',
	storage,
	blacklist: ['errors', 'focused', 'discountError', 'discount'],
};

const combinedReducer = combineReducers({
	user: userReducer,
	address: addressReducer,
	cart: cartReducer,
	checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
	creditCard: creditCardReducer,
	discount: discountReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'user/login') {
		// check for action type
		state = {
			...state,
			checkout: {
				addressInfo: {
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
				addressValidation: {
					show: false,
					focus: '',
				},
				delivery: 'shipment',
				shippingPrice: {
					display: 'Calculated at next step',
					price: null,
				},
				pickupLocations: [],
				pickupLocationSelected: '',
				shippingMethods: [],
				shippingMethodSelected: '',
				paymentMethodSelected: 'credit-card',
				discount: {
					loading: false,
					applied: false,
					code: '',
					description: '',
					target: '',
					discountAmount: {
						value: 0,
						type: 'fixed_amount',
					},
				},
				discountError: '',
			},
		};
	}
	return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
