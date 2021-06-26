import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Select({ name, children, onChange, value }) {
	return (
		<div className='input-group'>
			<select name={name} id={name} value={value} onChange={onChange}>
				{children}
			</select>
		</div>
	);
}

Select.propTypes = {
	name: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Select;
