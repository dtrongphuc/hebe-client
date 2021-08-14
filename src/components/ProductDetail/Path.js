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
			{location?.state?.from && (
				<li>
					<Link to={location?.state?.link} className='site-path__link'>
						{location.state.from}
					</Link>
				</li>
			)}
			<li>
				<span className='site-path__link'>{productName}</span>
			</li>
		</ul>
	);
}

Path.propTypes = {
	productName: PropTypes.string,
};

export default Path;
