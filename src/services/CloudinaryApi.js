import api from './api';

export async function getUploadSignature(folder) {
	try {
		const response = await api.post(`/cloudinary/image/upload/signature`, {
			folder,
		});
		return response.data;
	} catch (error) {
		return error;
	}
}

export async function getDestroySignature(public_id) {
	try {
		const response = await api.post(`/cloudinary/image/destroy/signature`, {
			public_id,
		});
		return response.data;
	} catch (error) {
		return error;
	}
}
