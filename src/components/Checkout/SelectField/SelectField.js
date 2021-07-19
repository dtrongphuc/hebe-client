import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { BiCaretDown } from 'react-icons/bi';

function SelectField({
	placeholder,
	name,
	options,
	defaultValue,
	onChange,
	rules,
}) {
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<div
			className={`checkout-field ${rules?.required && !value ? 'error' : ''}`}
		>
			<select
				className='checkout-select-field'
				name={name}
				id={name}
				value={value || options[0].value}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e);
				}}
			>
				{options?.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
			<label className={value && 'floating'}>{placeholder}</label>
			<div className='field__caret'>
				<BiCaretDown style={{ verticalAlign: 'middle' }} color='#919191' />
			</div>
			<div className='checkout-field--error'>{rules?.msg}</div>
		</div>
	);
}

SelectField.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.array,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	rules: PropTypes.object,
};

export default SelectField;
