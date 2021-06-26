import api from './api';

export const getAllAddresses = async () => {
	try {
		const response = await api.get('/account/address');
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

// data: {}
export const addNewAddress = async (data) => {
	try {
		const response = await api.post('/account/address', data);
		return response.data;
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

export const getAddressById = async (id) => {
	try {
		const response = await api.get('/account/address/get', {
			params: {
				id: id,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

export const editAddress = async (data) => {
	try {
		const response = await api.put('/account/address/edit', data);
		return response.data;
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};
