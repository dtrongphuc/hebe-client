import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

function NavButtons({ next, prev }) {
	return (
		<div className='checkout-nav__section'>
			<div className='row'>
				<div className='col-12 col-md-5'>
					<button className='checkout__nav-btn'>{next.content}</button>
				</div>
				<div className='col-12 col-md-7 my-auto'>
					<div className='mt-4 mt-md-0 text-center text-md-left'>
						<Link to={prev.link} className='checkout__nav-link'>
							<span className='mr-2 d-inline d-md-none'>
								<IoChevronBackOutline />
							</span>
							{prev.content}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

NavButtons.propTypes = {
	next: PropTypes.object, // {content, link}
	prev: PropTypes.object, // {content, link}
};

export default NavButtons;
