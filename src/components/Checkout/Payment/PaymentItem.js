import React from 'react';
import PropTypes from 'prop-types';

function PaymentItem({ name, title, icons, content, checked, onChange }) {
	return (
		<div className='payment-item__wrapper'>
			<div className='payment-item radio-wrapper'>
				<input
					type='radio'
					name='payment-method'
					id={name}
					checked={checked}
					onChange={onChange}
				/>
				<label htmlFor={name} className='payment-item__label ml-1'>
					{title}
					<div className='icons'>
						{icons?.map((icon) => (
							<i
								key={icon}
								className='payment-icon'
								style={{ backgroundImage: `url(${icon})` }}
							></i>
						))}
					</div>
				</label>
			</div>
			{checked && content}
		</div>
	);
}

PaymentItem.propTypes = {
	name: PropTypes.string,
	title: PropTypes.element,
	icons: PropTypes.array,
	content: PropTypes.element,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};

export default PaymentItem;
