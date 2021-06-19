import api from './api';

export async function getReviews() {
	try {
		const response = await api.get('/reviews');
		return response.data;
	} catch (error) {
		return [];
	}
}
