import React from 'react';
import PropTypes from 'prop-types';
import './OrderItemStyles.scss';
import { productPriceString } from 'utils/util';

function OrderItem({ item }) {
	const { product, variant, quantity, sku, total } = item;

	return (
		<div className='order-item'>
			<div className='order-item__left'>
				<div className='order-item__img-wrapper'>
					<div className='order-item__img-thumbnail'>
						<img src={product?.images[0].src} alt='' />
					</div>
					<span className='order-item__badge'>{quantity}</span>
				</div>
				<div className='order-item__info'>
					<p className='order__text order__text--bold'>{product?.name}</p>
					<p className='order__text order__text--light order__text--sm'>
						{sku && `${sku.size} / `}
						{variant?.color}
					</p>
				</div>
			</div>
			<div className='order__right'>
				<span className='order__text order__text--bold'>
					{productPriceString(total)}
				</span>
			</div>
		</div>
	);
}

OrderItem.propTypes = {
	item: PropTypes.object,
};

export default OrderItem;
