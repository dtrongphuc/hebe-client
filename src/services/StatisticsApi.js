import api from './api';

export async function getRevenue() {
	try {
		const response = await api.get('/statistics/revenue');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getSummary() {
	try {
		const response = await api.get('/statistics/summary');
		return response.data;
	} catch (error) {
		return error;
	}
}
