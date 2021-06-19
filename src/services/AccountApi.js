import api from './api';

export async function postLogin({ email, password }) {
	try {
		const response = await api.post('/account/login', {
			email,
			password,
		});
		if (response.status === 200) {
			api.defaults.headers.common[
				'Authorization'
			] = `Bearer ${response.data?.token}`;

			return response.data;
		}
	} catch (error) {
		return error;
	}
}
