import { onChange } from 'features/checkout/checkoutSlice';
import React from 'react';
// import PropTypes from 'prop-types';
import { IoStorefront } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import './DeliveryStyles.scss';

function Delivery() {
	const dispatch = useDispatch();
	const { delivery } = useSelector((state) => state.checkout);

	const handleChange = (e) => {
		const field = {
			delivery: e.target.id,
		};

		dispatch(onChange(field));
	};

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
						checked={delivery === 'ship'}
						onChange={handleChange}
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
						checked={delivery === 'pick-up'}
						onChange={handleChange}
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

// Delivery.propTypes = {

// };

export default Delivery;
