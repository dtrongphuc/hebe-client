import api from './api';

export async function addNewCategory(data) {
	try {
		const response = await api.post(`/category/add`, data);
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

export async function getCategoriesLink() {
	try {
		const response = await api.get(`/category/link`);
		return response.data;
	} catch (error) {
		return error;
	}
}
