import api from './api';

export async function addNewBrand(data) {
	try {
		const response = await api.post(`/brand/add`, data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getAllBrands() {
	try {
		const response = await api.get(`/brand/all`);
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

export async function getBrandsLink() {
	try {
		const response = await api.get(`/brand/link`);
		return response.data;
	} catch (error) {
		return error;
	}
}

// get brand info
export async function getBrand(path) {
	try {
		const response = await api.get(`/brand/info/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}

// EDIT SUBMIT
export async function postEditBrand(path, data) {
	try {
		const response = await api.post(`/brand/edit/${path}`, data);
		return response.data;
	} catch (error) {
		return error;
	}
}
