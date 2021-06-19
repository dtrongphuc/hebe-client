import api from './api';

export async function getCollectionByPath(path) {
	try {
		const response = await api.get(`/collections/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}
