import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { capitalize, priceString } from 'utils/util';

function OrderHistoryItem({ order }) {
	const addressString = (addressInfo) => {
		const { _id, isDefault, firstname, lastname, ...rest } = addressInfo;

		return `(${capitalize(firstname)} ${capitalize(lastname)}) ${Object.values({
			...rest,
		})
			.filter((value) => value !== '')
			.join(', ')}`;
	};

	return (
		<div className='order-history__item'>
			<div className='order-history__item__head'>
				<div className='item d-flex align-items-center justify-content-start'>
					<span className='account-text account-text--small order-history__text--fixed'>
						Ship to
					</span>
					<span className='account-text account-text--blur account-text--small'>
						{addressString(order.billInfo)}
					</span>
				</div>
				{order.deliveryMethod === 'shipping' && (
					<div className='item d-flex align-items-center justify-content-start'>
						<span className='account-text account-text--small order-history__text--fixed'>
							Method
						</span>
						<span className='account-text account-text--blur account-text--small'>
							{order.shippingMethod?.name} ·{' '}
							{order.shippingMethod?.displayPrice}
						</span>
					</div>
				)}

				{order.deliveryMethod === 'pickup' && (
					<div className='item d-flex align-items-center justify-content-start'>
						<span className='account-text account-text--small order-history__text--fixed'>
							Pickup
						</span>
						<span className='account-text account-text--blur account-text--small'>
							{order.pickupLocation?.name} ·{' '}
							{order.pickupLocation?.displayPrice}
						</span>
					</div>
				)}
			</div>
			<ul className='order-history__items-list'>
				{order?.products.map((item) => (
					<li key={item._id} className='item'>
						<div className='left'>
							<Link to={`/products/${item.product.path}`}>
								<img
									src={item.product.images[0].src}
									alt=''
									className='order-history__item-img'
								/>
							</Link>
							<div>
								<Link
									to={`/products/${item.product.path}`}
									className='account-text account-text--wrap px-2'
								>
									{item.product.name}
								</Link>
								<p className='account-text account-text--blur account-text--small mt-1 px-2'>
									{item.variant.color}
									{!item.variant.freeSize && ` / `}
								</p>
								<p className='account-text account-text--blur account-text--small mt-1 px-2'>
									x{item.quantity}
								</p>
							</div>
						</div>

						<p className='account-text account-text--bold account-text--lg'>
							{item.product.salePrice > 0
								? priceString(item.product.salePrice)
								: priceString(item.product.price)}
						</p>
					</li>
				))}
			</ul>
			<div className='order-history__item-footer'>
				<div className='item'>
					<span className='account-text'>Shipping:</span>
					<span className='account-text width-fixed'>
						{order.shippingMethod?.displayPrice}
					</span>
				</div>
				<div className='item'>
					<span className='account-text'>Total:</span>
					<span className='account-text account-text--bold account-text--lg width-fixed'>
						{priceString(order.lastPrice)}
					</span>
				</div>
			</div>
		</div>
	);
}

OrderHistoryItem.propTypes = {
	order: PropTypes.object,
};

export default OrderHistoryItem;
