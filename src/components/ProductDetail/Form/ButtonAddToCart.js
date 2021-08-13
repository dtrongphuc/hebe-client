import React from 'react';
import PropTypes from 'prop-types';
import { priceString } from 'utils/util';

export default function ButtonAddToCart({ price, isSoldOut, quantity }) {
	return (
		<div className='atc__wrapper'>
			<button type='submit' className='btn__atc' disabled={isSoldOut}>
				<span className='text'>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>
				{priceString(price)}
				{quantity > 1 ? ` (${quantity})` : ''}
			</button>
		</div>
	);
}

ButtonAddToCart.propTypes = {
	price: PropTypes.number,
	isSoldOut: PropTypes.bool,
	quantity: PropTypes.number,
};
