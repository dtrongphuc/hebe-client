import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Select({ name, children }) {
	return (
		<div className='input-group'>
			<select name={name} id={name}>
				{children}
			</select>
		</div>
	);
}

Select.propTypes = {};

export default Select;
