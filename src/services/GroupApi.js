import api from './api';

export async function postNewGroup(formData) {
	try {
		const response = await api.post(`/group/create`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getAllGroups() {
	try {
		const response = await api.get(`/group/get-all`);
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getGroupCollections(path) {
	try {
		const response = await api.get(`/group/${path}`);
		return response.data;
	} catch (error) {
		return error;
	}
}
