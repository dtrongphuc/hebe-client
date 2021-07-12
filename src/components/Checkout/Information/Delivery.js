import React from 'react';
import PropTypes from 'prop-types';
import { IoStorefront } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';
import './DeliveryStyles.scss';

function Delivery({ checked, onChange }) {
	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Delivery method</h2>
			<div className='radio-content'>
				<div className='radio-wrapper'>
					<input
						type='radio'
						name='delivery'
						id='ship'
						className='checkout-radio'
						checked={checked === 'ship'}
						onChange={onChange}
					/>
					<label htmlFor='ship'>
						<MdLocalShipping size='1.6em' />
						<span>Ship</span>
					</label>
				</div>
				<div className='radio-wrapper'>
					<input
						type='radio'
						name='delivery'
						id='pick-up'
						className='checkout-radio'
						checked={checked === 'pick-up'}
						onChange={onChange}
					/>
					<label htmlFor='pick-up'>
						<IoStorefront size='1.6em' />
						<span>Pick up</span>
					</label>
				</div>
			</div>
		</section>
	);
}

Delivery.propTypes = {
	checked: PropTypes.oneOf(['ship', 'pick-up']),
	onChange: PropTypes.func,
};

export default Delivery;
