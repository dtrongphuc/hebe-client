import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function TextField({ type = 'text', placeholder, name }) {
	const [value, setValue] = useState('');

	return (
		<div className='checkout-field'>
			<input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<label className={value && 'floating'}>{placeholder}</label>
		</div>
	);
}

TextField.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
};

export default TextField;
