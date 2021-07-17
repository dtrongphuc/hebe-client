import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Input({ placeholder, tooltip, value, ...rest }) {
	const onFocus = (e) => {
		const element = e.target.closest('.payment__input-wrapper');

		element.classList.add('active');
	};

	const onBlur = (e) => {
		const element = e.target.closest('.payment__input-wrapper');

		element.classList.remove('active');
	};

	return (
		<div className={`payment__input-wrapper ${value && 'has-value'}`}>
			<input
				{...rest}
				className='payment__credit-card__input'
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
			/>
			<label htmlFor='card_number' className={value && 'floating'}>
				{placeholder}
			</label>
			{tooltip && (
				<div className='payment__input-tooltip'>
					<OverlayTrigger
						placement='top'
						overlay={<Tooltip>{tooltip.content}</Tooltip>}
					>
						<button type='button' className='payment__input-tooltip-btn'>
							{tooltip.icon}
						</button>
					</OverlayTrigger>
				</div>
			)}
		</div>
	);
}

Input.propTypes = {
	tooltip: PropTypes.object,
};

export default Input;
