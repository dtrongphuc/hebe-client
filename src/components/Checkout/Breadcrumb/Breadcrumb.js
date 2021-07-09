import React from 'react';
import PropTypes from 'prop-types';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles.scss';

function Breadcrumb(props) {
	return (
		<ol className='checkout-breadcrumb'>
			<li className='checkout-breadcrumb__item'>
				<Link
					to='/'
					className='checkout-breadcrumb__link checkout-breadcrumb__link--active'
				>
					Cart
				</Link>
				<IoChevronForwardOutline />
			</li>
			<li className='checkout-breadcrumb__item'>
				<Link
					to='/'
					className='checkout-breadcrumb__link checkout-breadcrumb__link--active'
				>
					Information
				</Link>
				<IoChevronForwardOutline />
			</li>
			<li className='checkout-breadcrumb__item'>
				<Link to='/' className='checkout-breadcrumb__link'>
					Shipping
				</Link>
				<IoChevronForwardOutline />
			</li>
			<li className='checkout-breadcrumb__item'>
				<Link to='/' className='checkout-breadcrumb__link'>
					Payment
				</Link>
			</li>
		</ol>
	);
}

Breadcrumb.propTypes = {};

export default Breadcrumb;
