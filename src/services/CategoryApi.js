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

export async function getCategory(path) {
	try {
		const response = await api.get(`/category/info/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}

// EDIT SUBMIT
export async function postEditCategory(path, data) {
	try {
		const response = await api.post(`/category/edit/${path}`, data);
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
