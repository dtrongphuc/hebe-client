import React from 'react';
import PropTypes from 'prop-types';

function Button({ type = 'button', children }) {
	return (
		<button type={type} className='btn__auth-submit'>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.string,
	type: PropTypes.string,
};

export default Button;
