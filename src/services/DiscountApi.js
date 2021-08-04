import api from './api';

export async function getDiscounts() {
	try {
		const response = await api.get('/discount/all');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function createDiscount(data) {
	try {
		const response = await api.post('/discount/create', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function toggleDiscountStatus(id) {
	try {
		const response = await api.get('/discount/toggle-status', {
			params: {
				id,
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}