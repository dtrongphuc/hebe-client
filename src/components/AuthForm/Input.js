import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Input({ type, name, placeholder, value, onChange }) {
	return (
		<div className='auth-input__group'>
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				onChange={(e) => onChange(e)}
				value={value}
			/>
		</div>
	);
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default Input;
