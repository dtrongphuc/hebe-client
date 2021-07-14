const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_API_CLOUD_API_KEY;

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

export const generateUploadPresignedUrl = (folder, timestamp, signature) => {
	return `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${API_KEY}&folder=${folder}&timestamp=${timestamp}&signature=${signature}`;
};

export const generateDestroyPresignedUrl = (publicId, timestamp, signature) => {
	return `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy?api_key=${API_KEY}&public_id=${publicId}&timestamp=${timestamp}&signature=${signature}`;
};

export const capitalize = (string) => {
	return string
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
		.join(' ');
};
