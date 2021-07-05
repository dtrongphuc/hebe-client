import api from './api';

export const addToCart = async (cart) => {
	try {
		const response = await api.post(`/cart/add`, cart);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const fetchCart = async () => {
	try {
		const response = await api.get(`/cart`);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};
