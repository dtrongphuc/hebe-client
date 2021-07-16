import React from 'react';
import { Link } from 'react-router-dom';
import './ShippingInfoStyles.scss';

const Item = ({ label, content, link }) => {
	return (
		<div className='ship-info__item'>
			<div className='left'>
				<span className='ship-info__item-label'>{label}</span>
				<span className='ship-info__item-content'>{content}</span>
			</div>
			<div className='right'>
				<Link to={link}>Change</Link>
			</div>
		</div>
	);
};

function ShippingInfo({ items }) {
	return (
		<div className='ship-info__wrapper'>
			{items?.map((item) => (
				<Item key={item.label} {...item} />
			))}
		</div>
	);
}

export default ShippingInfo;
