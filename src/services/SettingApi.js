import api from './api';

export async function putShippingSettings(data) {
	try {
		const response = await api.put('/config/shipping', data);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getShippingSettings() {
	try {
		const response = await api.get('/config/shipping');
		return response.data;
	} catch (error) {
		return error;
	}
}

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
		const response = await api.get('/shipping-methods', data);
		return response.data;
	} catch (error) {
		return error;
	}
}
