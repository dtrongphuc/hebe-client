import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Divider({ content, radius = false }) {
	return (
		<h2
			className={`checkout-divider checkout-divider--separate${
				radius === true ? ' checkout-divider--radius' : ''
			}`}
		>
			{content}
		</h2>
	);
}

Divider.propTypes = {
	content: PropTypes.string,
};

export default Divider;
