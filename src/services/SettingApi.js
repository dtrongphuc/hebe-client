import api from './api';

export async function getPickupLocations() {
	try {
		const response = await api.get('/pickup-locations');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function putPickupLocations(data) {
	try {
		const response = await api.put('/pickup-locations', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getShippingMethods() {
	try {
		const response = await api.get('/shipping-methods');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function putShippingMethods(data) {
	try {
		const response = await api.put('/shipping-methods', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getBanner() {
	try {
		const response = await api.get('/settings/banner');
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function submitEditBanner(data) {
	try {
		const response = await api.post('/settings/banner', data);
		return response.data;
	} catch (error) {
		return error;
	}
}
