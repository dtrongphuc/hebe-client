import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useRef } from 'react';
import { useEffect } from 'react';

function TextField({
	type = 'text',
	focusedName = '',
	placeholder,
	name,
	value,
	onChange,
	rules,
}) {
	const inputRef = useRef(null);

	useEffect(() => {
		if (focusedName === name) {
			inputRef?.current.scrollIntoView();
			inputRef?.current.focus();
		}
	}, [focusedName, name]);

	return (
		<div
			className={`checkout-field ${rules?.required && !value ? 'error' : ''}`}
		>
			<input
				ref={inputRef}
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange && onChange(rules)}
			/>
			<label htmlFor={name} className={value && 'floating'}>
				{placeholder}
			</label>
			<div className='checkout-field--error'>{rules?.msg}</div>
		</div>
	);
}

TextField.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	rules: PropTypes.object,
};

export default TextField;
