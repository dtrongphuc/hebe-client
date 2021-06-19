import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonAddToCart({ price, isSoldOut }) {
	return (
		<div className='atc__wrapper'>
			<button type='submit' className='btn__atc' disabled={isSoldOut}>
				<span className='text'>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>$
				{price}.00
			</button>
		</div>
	);
}

ButtonAddToCart.propTypes = {
	price: PropTypes.number,
	isSoldOut: PropTypes.bool,
};
