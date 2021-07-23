import React from 'react';
import PropTypes from 'prop-types';

function Carat({ open, onClick }) {
	return (
		<span className='nav-carat' onClick={onClick}>
			<span className={`${!open ? 'd-block' : 'd-none'}`}>+</span>
			<span className={`${open ? 'd-block' : 'd-none'}`}>-</span>
		</span>
	);
}

Carat.propTypes = {
	open: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Carat;
