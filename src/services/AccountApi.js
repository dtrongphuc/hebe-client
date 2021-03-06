import api from './api';

export async function postLogin(email, password) {
	try {
		const response = await api.post('/account/login', {
			email,
			password,
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function postRegister({ email, password, firstname, lastname }) {
	try {
		const response = await api.post('/account/signup', {
			email,
			password,
			firstname,
			lastname,
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getLogout() {
	try {
		const response = await api.get('/account/logout');
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function isAuth() {
	try {
		const response = await api.get('/account/auth');
		if (response.status === 200) {
			const { email, firstName, lastName, role } = response.data;
			return {
				loggedIn: true,
				email,
				firstName,
				lastName,
				role,
			};
		} else {
			return { loggedIn: false };
		}
	} catch (error) {
		return { loggedIn: false };
	}
}

// get users account
export async function getUserAccounts() {
	try {
		const response = await api.get('/account/users');
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

// get account by id
export async function getAccountById(id) {
	try {
		const response = await api.get('/account/user', {
			params: {
				id,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

// submit edit user account
export async function submitEditAccount(data) {
	try {
		const response = await api.post('/account/user/edit', data);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function forgotPassword(email) {
	try {
		const response = await api.post('/account/password/reset', { email });
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

// {token, password, confirmPw}
export async function resetPassword(data) {
	try {
		const response = await api.post('/account/password/update', data);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getEmailByToken(token) {
	try {
		const response = await api.get('/account/email', {
			params: {
				token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject(error);
	}
}
