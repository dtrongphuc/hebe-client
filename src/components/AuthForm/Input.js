import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Input({ type, name, placeholder, value, onChange, errorMessage }) {
	const inputRef = useRef(null);
	useEffect(() => {
		if (errorMessage && !inputRef.current.classList.contains('error')) {
			inputRef.current.classList.add('error');
		} else if (!errorMessage && inputRef.current.classList.contains('error')) {
			inputRef.current.classList.remove('error');
		}
	}, [errorMessage]);

	return (
		<div className='auth-input__group'>
			<input
				ref={inputRef}
				type={type}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
			/>
			{errorMessage && (
				<small className='text-monospace text-danger'>{errorMessage}</small>
			)}
		</div>
	);
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	errorMessage: PropTypes.string,
};

export default Input;
