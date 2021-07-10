import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function TextField({ type = 'text', placeholder, name }) {
	const [value, setValue] = useState('');

	return (
		<div className='checkout-field'>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<label htmlFor={name} className={value && 'floating'}>
				{placeholder}
			</label>
		</div>
	);
}

TextField.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
};

export default TextField;
