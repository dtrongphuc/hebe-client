export const productPriceString = (price) => {
	return `$${price % 1 === 0 ? price + '.00' : price}`;
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
