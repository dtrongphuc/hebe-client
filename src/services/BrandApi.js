import api from './api';

export async function postNewBrand(formData) {
	try {
		const response = await api.post(`/brand/create`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getAllBrands() {
	try {
		const response = await api.get(`/brand/get-all`);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getBrandCollections(path) {
	try {
		const response = await api.get(`/brand/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}
