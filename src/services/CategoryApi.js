import api from './api';

export async function postNewCategory(formData) {
	try {
		const response = await api.post(`/category/create`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getAllCategories() {
	try {
		const response = await api.get(`/category/all`);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getCategoryCollections(path) {
	try {
		const response = await api.get(`/category/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}
