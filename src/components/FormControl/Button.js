import React from 'react';
import PropTypes from 'prop-types';
import CircleLoading from 'components/CircleLoading/CircleLoading';

function Button({ type = 'button', onClick, children, classNames, loading }) {
	return (
		<button
			type={type}
			className={`btn-submit ${!!classNames ? classNames : ''}`}
			onClick={onClick}
			disabled={loading}
		>
			{!loading && children}
			{loading && <CircleLoading />}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
