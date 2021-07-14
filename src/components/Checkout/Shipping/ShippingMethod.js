import React from 'react';
import { priceString } from 'utils/util';
// import PropTypes from 'prop-types';

function ShippingMethod(props) {
	return (
		<div className='section-info'>
			<h2 className='section-info__heading'>Shipping method</h2>
			<div className='radio-content'>
				<div className='radio-wrapper'>
					<input
						type='radio'
						name='delivery'
						id='ship-address-1'
						className='checkout-radio'
						checked={true}
						onChange={() => {}}
					/>
					<label htmlFor='ship-address-1'>
						<span className='light'>Shipping Australia Untraced</span>
						<span className='ship-price'>{priceString(10)}</span>
					</label>
				</div>
				<div className='radio-wrapper'>
					<input
						type='radio'
						name='delivery'
						id='ship-address-2'
						className='checkout-radio'
						checked={false}
						onChange={() => {}}
					/>
					<label htmlFor='ship-address-2'>
						<span className='light'>Shipping International Untraced</span>
						<span className='ship-price'>{priceString(20)}</span>
					</label>
				</div>
			</div>
		</div>
	);
}

// ShippingMethod.propTypes = {};

export default ShippingMethod;
