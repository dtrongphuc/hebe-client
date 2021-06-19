import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function Path({ productName }) {
	let location = useLocation();

	return (
		<ul className='site-path'>
			<li>
				<Link to='/' className='site-path__link'>
					HOME
				</Link>
			</li>
			<li>
				<Link to='#' className='site-path__link'>
					{location.state.from}
				</Link>
			</li>
			<li>
				<Link to='#' className='site-path__link'>
					{productName}
				</Link>
			</li>
		</ul>
	);
}

Path.propTypes = {
	productName: PropTypes.string,
};

export default Path;
