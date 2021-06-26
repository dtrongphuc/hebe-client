import api from './api';

export async function postLogin(email, password) {
	try {
		const response = await api.post('/account/login', {
			email,
			password,
		});
		if (response.status === 200) {
			const token = response.data?.token;
			window.localStorage.setItem('token', token);

			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function postRegister({ email, password, firstname, lastname }) {
	try {
		const response = await api.post('/account/create', {
			email,
			password,
			firstname,
			lastname,
		});
		if (response.status === 200) {
			api.defaults.headers.common[
				'Authorization'
			] = `Bearer ${response.data?.token}`;

			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}
