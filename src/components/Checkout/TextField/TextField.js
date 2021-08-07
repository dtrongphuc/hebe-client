import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const validationArray = [
	{
		key: 'required',
		check: function (value) {
			return value?.length > 0;
		},
	},
];

function TextField({
	type = 'text',
	focus = false,
	placeholder,
	name,
	value,
	onChange,
	rules,
	error,
}) {
	const [errorMsg, setErrorMsg] = useState(error);
	const inputRef = useRef(null);

	useEffect(() => {
		if (focus === true) {
			inputRef?.current.scrollIntoView();
			inputRef?.current.focus();
		}
	}, [focus]);

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
		<div
			className={`checkout-field ${value && 'floating'} ${toggleErrorClass()}`}
		>
			<input
				ref={inputRef}
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
			/>
			<label htmlFor={name} className={value && 'floating'}>
				{placeholder}
			</label>
			<div className='checkout-field--error'>{errorMsg}</div>
		</div>
	);
}

TextField.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	rules: PropTypes.array,
	error: PropTypes.string,
};

export default TextField;
