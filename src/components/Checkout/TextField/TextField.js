import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function TextField({ placeholder }) {
	return (
		<div className='checkout-field'>
			<label>{placeholder}</label>
			<input type='text' placeholder={placeholder} />
		</div>
	);
}

TextField.propTypes = {
	placeholder: PropTypes.string,
};

export default TextField;
