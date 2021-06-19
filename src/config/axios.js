import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_BASEURL,
});

api.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error?.response);
	}
);

export default api;
