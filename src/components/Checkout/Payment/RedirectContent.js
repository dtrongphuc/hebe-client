import React from 'react';
import PropTypes from 'prop-types';
import Blank from 'assets/img/blank.svg';

function RedirectContent({ payment }) {
	return (
		<div className='payment-item__content-wrapper'>
			<i
				className='payment-content__icon'
				style={{ backgroundImage: `url(${Blank})` }}
			></i>
			<p className='text'>
				After clicking “Complete order”, you will be redirected to {payment} to
				complete your purchase securely.
			</p>
		</div>
	);
}

RedirectContent.propTypes = {
	payment: PropTypes.string,
};

export default RedirectContent;
