import React from 'react';
import PropTypes from 'prop-types';

function Button({ type = 'button', onClick, children, classNames }) {
	return (
		<button
			type={type}
			className={`btn-submit ${classNames}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
