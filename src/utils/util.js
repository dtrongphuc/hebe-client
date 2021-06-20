export const productPriceString = (price) => {
	return `$${price % 1 === 0 ? price + '.00' : price}`;
};

export const parseErrors = (errors) => {
	let object = errors.reduce((errObj, curError) => {
		return Object.assign(errObj, {
			[curError.inputName]: curError.message,
		});
	}, {});

	return object;
};
