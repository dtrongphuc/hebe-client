import React from 'react';
import { IoStorefront } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';
import './DeliveryStyles.scss';

function Delivery() {
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

export default Delivery;
