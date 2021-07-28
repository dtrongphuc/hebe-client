import axios from 'axios';

export const priceString = (price) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
};

export const parseErrors = (errors) => {
	let object = errors.reduce((errObj, curError) => {
		if (errObj[curError.param] === undefined) {
			return Object.assign(errObj, {
				[curError.param]: curError.msg,
			});
		}

		return errObj;
	}, {});

	return object;
};

export const capitalize = (string) => {
	return string
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
		.join(' ');
};

export const uploadFileRequest = async (url, fileList) => {
	try {
		console.log(fileList);
		let files = await Promise.all(
			[].concat(fileList).map((file) => {
				if (file?.public_id) {
					return Promise.resolve(file);
				}

				const formData = new FormData();
				formData.append('file', file.originFileObj);
				return axios.post(url, formData, {
					headers: {
						'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
					},
				});
			})
		);
		return files?.map((file) => ({
			url: file?.data?.secure_url || file.url,
			public_id: file?.data?.public_id || file.public_id,
		}));
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};
