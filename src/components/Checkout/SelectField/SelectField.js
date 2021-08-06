import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { BiCaretDown } from 'react-icons/bi';

const validationArray = [
	{
		key: 'required',
		check: function (value) {
			return value?.length > 0;
		},
	},
];

function SelectField({
	placeholder,
	name,
	options,
	defaultValue,
	onChange,
	rules,
	error,
}) {
	const [value, setValue] = useState('');
	const [errorMsg, setErrorMsg] = useState(error);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	//validation
	useEffect(() => {
		if (!rules ?? !Array.isArray(rules)) return;

		let rule = rules?.find((rule) => {
			let ruleKey = Object.keys(rule).find((k) => k !== 'msg');
			if (typeof ruleKey !== undefined) {
				let validate = validationArray.find((v) => v.key === ruleKey);

				return !validate?.check(value);
			}

			// skip when no key be provided
			return false;
		});

		setErrorMsg(rule?.msg ?? '');
	}, [value, rules]);

	const toggleErrorClass = () => {
		if (errorMsg) {
			return 'error';
		}

		return '';
	};

	return (
		<div className={`checkout-field ${toggleErrorClass()}`}>
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
			<div className='checkout-field--error'>{errorMsg}</div>
		</div>
	);
}

SelectField.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.array,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	rules: PropTypes.array,
	error: PropTypes.string,
};

export default SelectField;
