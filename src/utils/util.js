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
