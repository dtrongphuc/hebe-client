import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InputStyles.scss';

function Input({
	type,
	name,
	placeholder,
	onChange,
	errorMessage,
	margin,
	value,
}) {
	const inputRef = useRef(null);
	useEffect(() => {
		if (errorMessage && !inputRef.current.classList.contains('error')) {
			inputRef.current.classList.add('error');
		} else if (!errorMessage && inputRef.current.classList.contains('error')) {
			inputRef.current.classList.remove('error');
		}
	}, [errorMessage]);

	return (
		<div className='input-group' style={{ margin: margin }}>
			<input
				ref={inputRef}
				type={type}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				autoComplete='new-password'
				id={name}
				value={value}
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
