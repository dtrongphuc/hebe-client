import api from './api';

export async function getCollectionByPath(path, { page, limit, sort }) {
	try {
		const response = await api.get(`/collections/${path}`, {
			params: {
				page,
				limit,
				sort,
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}
