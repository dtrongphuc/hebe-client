import api from './api';

export async function putShippingSettings(data) {
	try {
		const response = await api.put('/config/shipping', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getShippingSettings() {
	try {
		const response = await api.get('/config/shipping');
		return response.data;
	} catch (error) {
		return error;
	}
}
