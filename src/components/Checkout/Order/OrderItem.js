import React from 'react';
import PropTypes from 'prop-types';
import './OrderItemStyles.scss';

function OrderItem(props) {
	return (
		<div className='order-item'>
			<div className='order-item__left'>
				<div className='order-item__img-wrapper'>
					<div className='order-item__img-thumbnail'>
						<img
							src='//cdn.shopify.com/s/files/1/1132/3440/products/AD57C9D1-8A77-4ACE-8B65-EEA74FB07DD2_small.jpg?v=1614204416'
							alt=''
						/>
					</div>
					<span className='order-item__badge'>1</span>
				</div>
				<div className='order-item__info'>
					<p className='order__text order__text--bold'>Aubri Tank</p>
					<p className='order__text order__text--light order__text--sm'>
						14 / Black
					</p>
				</div>
			</div>
			<div className='order__right'>
				<span className='order__text order__text--bold'>$31.00</span>
			</div>
		</div>
	);
}

OrderItem.propTypes = {};

export default OrderItem;
