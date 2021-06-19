import api from './api';

export async function getFrontPageProducts() {
	try {
		const response = await api.get('/product/front-page');
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getProductByPathName(path) {
	try {
		const response = await api.get(`/product/path/${path}`);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getProductById(productId) {
	try {
		const response = await api.get(`/product/id/${productId}`);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getAllProducts() {
	try {
		const response = await api.get(`/product/getAll`);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function postNewProduct(formData) {
	try {
		const response = await api.post(`/product/create`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getEditProduct(productId) {
	try {
		const response = await api.get(`/product/edit/id/${productId}`);
		return response.data;
	} catch (error) {
		return error;
	}
}
