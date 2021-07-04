import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ name, value, onChange, options }) {
	return (
		<div className='product-page__select-wrapper'>
			<label htmlFor={name} className='product-page__select-label'>
				{name}
			</label>
			<select
				name={name}
				id={`product-${name}`}
				className='product-page__select-input text-capitalize'
				onChange={onChange}
				value={value}
			>
				{options?.map((option) => {
					let { label, value } = option;

					return (
						<option value={value} key={value} className='text-capitalize'>
							{label}
						</option>
					);
				})}
			</select>
		</div>
	);
}

Select.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
};
