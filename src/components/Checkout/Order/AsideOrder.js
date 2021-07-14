import React from 'react';
import OrderItem from './OrderItem';
import DiscountField from './DiscountField';
import './AsideOrderStyles.scss';
import { useSelector } from 'react-redux';
import { priceString } from 'utils/util';

function AsideOrder() {
	const { products, totalPrice } = useSelector(
		(state) => state.cart.shoppingCart
	);

	return (
		<aside className='checkout__order'>
			<div className='padding'>
				<div className='wrap'>
					<div className='order__list'>
						{products?.map((item) => (
							<div key={item._id}>
								<OrderItem item={item} />
							</div>
						))}
					</div>
					<DiscountField />
					<div className='checkout-section'>
						<div className='d-flex align-items-center justify-content-between'>
							<span className='order__text'>Subtotal</span>
							<span className='order__text order__text--bold'>
								{priceString(totalPrice)}
							</span>
						</div>
						<div className='d-flex align-items-center justify-content-between mt-2'>
							<span className='order__text'>Shipping</span>
							<span className='order__text order__text--light order__text--sm'>
								Calculated at next step
							</span>
						</div>
					</div>
					<div className='checkout-section'>
						<div className='d-flex align-items-center justify-content-between'>
							<span className='order__text'>Total</span>
							<span className='d-flex align-items-center'>
								<span className='order__text order__text--sm order__text--light'>
									NZD
								</span>
								<span className='order__text order__text--bold order__text--lg ml-2'>
									{priceString(totalPrice)}
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default AsideOrder;
