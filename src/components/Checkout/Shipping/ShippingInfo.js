import React from 'react';
import { Link } from 'react-router-dom';
import './ShippingInfoStyles.scss';

function ShippingInfo() {
	return (
		<div className='ship-info__wrapper'>
			<div className='ship-info__item'>
				<div className='left'>
					<span className='ship-info__item-label'>Contact</span>
					<span className='ship-info__item-content'>dangcapbp36@gmail.com</span>
				</div>
				<div className='right'>
					<Link to='/'>Change</Link>
				</div>
			</div>
			<div className='ship-info__item'>
				<div className='left'>
					<span className='ship-info__item-label'>Ship to</span>
					<span className='ship-info__item-content'>
						1017/56AB Hồng Bàng, Phường 9, Quận 6, TP.HCM, Quận 6 008428,
						Vietnam
					</span>
				</div>
				<div className='right'>
					<Link to='/'>Change</Link>
				</div>
			</div>
		</div>
	);
}

export default ShippingInfo;
