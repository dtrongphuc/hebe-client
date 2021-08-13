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
		let files = await Promise.all(
			[].concat(fileList).map((file) => {
				if (file?.publicId && file?.publicId === file?.name) {
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
			src: file?.data?.secure_url || file.url,
			publicId: file?.data?.public_id || file.publicId,
		}));
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

export const calcTotalPrice = (
	total = 0,
	shippingFee = 0,
	discount = {
		discountAmount: {
			value: 0,
			type: 'fixed_amount',
		},
		target: 'line_item',
	}
) => {
	const { discountAmount } = discount;
	if (!discount || !discountAmount) {
		return total + shippingFee;
	}

	if (discount.target === 'shipping_line') {
		let calc_shippingFee =
			shippingFee -
			convertDiscount(discountAmount.value, discountAmount.type, shippingFee);

		return total + (calc_shippingFee > 0 ? calc_shippingFee : 0);
	}

	return total + shippingFee - (discountAmount.value || 0);
};

export const calcDiscountValue = (shippingFee, discount) => {
	const { discountAmount } = discount;

	if (!discount || !discountAmount) {
		return 0;
	}

	if (discount.target === 'shipping_line') {
		let calc_shippingFee = convertDiscount(
			discountAmount.value,
			discountAmount.type,
			shippingFee
		);

		return calc_shippingFee > shippingFee ? shippingFee : calc_shippingFee;
	}

	return discountAmount?.value || 0;
};

// convert discount type with value
const convertDiscount = (value, type, targetValue) => {
	if (type === 'percentage') {
		return targetValue * value * 0.01;
	}

	return value;
};
