import api from './api';

export async function getDiscounts() {
	try {
		const response = await api.get('/discount/all');
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function createDiscount(data) {
	try {
		const response = await api.post('/discount/create', data);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
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
		return Promise.reject(error);
	}
}

export async function getDiscountById(id) {
	try {
		const response = await api.get('/discount/by-id', {
			params: {
				id,
			},
		});
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function submitEditDiscount(data) {
	try {
		const response = await api.post('/discount/edit', data);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function applyDiscount(code) {
	try {
		const response = await api.post('/discount/apply', { code });
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}
