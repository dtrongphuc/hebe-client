import api from './api';

export async function createOrder(data) {
	try {
		const response = await api.post('/orders/create', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function countOrder() {
	try {
		const response = await api.get('/orders/count');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getOrdersPagination(page) {
	try {
		const response = await api.get('/orders/by-user', {
			params: {
				page,
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getMaxPagination() {
	try {
		const response = await api.get('/orders/max-page');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getOrders() {
	try {
		const response = await api.get('/orders');
		return response.data;
	} catch (error) {
		return error;
	}
}

// get order detail by id
export async function getOrderById(id) {
	try {
		const response = await api.get('/orders/by-id', {
			params: {
				id,
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}
