import React from 'react';
import OrderItem from './OrderItem';
import DiscountField from './DiscountField';
import './AsideOrderStyles.scss';
import { useSelector } from 'react-redux';
import { calcDiscountValue, calcTotalPrice, priceString } from 'utils/util';

function AsideOrder() {
	const { delivery, shippingPrice, discount } = useSelector(
		(state) => state.checkout
	);

	const { products, totalPrice } = useSelector(
		(state) => state.cart.shoppingCart
	);

	let discountValue = calcDiscountValue(shippingPrice?.price || 0, discount);

	return (
		<aside className='checkout__order'>
			<div className='padding'>
				<div className='wrap'>
					<div className='order__list'>
						{products?.map((item) => (
							<OrderItem item={item} key={item._id} />
						))}
					</div>
					<DiscountField />
					<div className='checkout-section'>
						<div className='d-flex align-items-center justify-content-between'>
							<span className='order__text'>Subtotal</span>
							<span className='order__text order__text--bold'>
								{priceString(totalPrice || 0)}
							</span>
						</div>
						<div className='d-flex align-items-center justify-content-between mt-3'>
							<span className='order__text text-capitalize'>
								{delivery === 'pickup' ? 'pickup' : 'shipping'}
							</span>
							<span
								className={`order__text ${
									shippingPrice.price !== null
										? 'order__text--bold'
										: 'order__text--sm order__text--light'
								}`}
							>
								{shippingPrice.display}
							</span>
						</div>
						{discount.applied && (
							<>
								<div className='d-flex align-items-center justify-content-between mt-3'>
									<span className='order__text'>Discount</span>
									<span className='order__text order__text--bold'>
										{discountValue > 0
											? `-${priceString(discountValue)}`
											: priceString(discountValue)}
									</span>
								</div>
								<div className='d-flex align-items-center justify-content-between'>
									<p></p>
									<p className='order__text order__text--bold order__text--sm order__text--light'>
										{discount?.description}
									</p>
								</div>
							</>
						)}
					</div>
					<div className='checkout-section'>
						<div className='d-flex align-items-center justify-content-between'>
							<span className='order__text order__text--md'>Total</span>
							<span className='d-flex align-items-center'>
								<span className='order__text order__text--sm order__text--light mt-1'>
									NZD
								</span>
								<span className='order__text order__text--bold order__text--lg ml-2'>
									{priceString(
										calcTotalPrice(
											totalPrice,
											shippingPrice?.price || 0,
											discount
										)
									)}
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
