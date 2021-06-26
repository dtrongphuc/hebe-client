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
