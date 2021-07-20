import api from './api';

export async function createOrder(data) {
	try {
		const response = await api.post('/orders/create', data);
		return response.data;
	} catch (error) {
		return error;
	}
}
