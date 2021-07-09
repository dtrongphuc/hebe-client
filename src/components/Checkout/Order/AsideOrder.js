import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import DiscountField from './DiscountField';
import './AsideOrderStyles.scss';

function AsideOrder(props) {
	return (
		<aside className='checkout__order'>
			<div className='wrap'>
				<div className='order__list'>
					<OrderItem />
				</div>
				<DiscountField />
				<div className='checkout-section'>
					<div className='d-flex align-items-center justify-content-between'>
						<span className='order__text order__text--light'>Subtotal</span>
						<span className='order__text order__text--bold'>$228.00</span>
					</div>
					<div className='d-flex align-items-center justify-content-between mt-2'>
						<span className='order__text order__text--light'>Shipping</span>
						<span className='order__text order__text--light order__text--sm'>
							Calculated at next step
						</span>
					</div>
				</div>
				<div className='checkout-section'>
					<div className='d-flex align-items-center justify-content-between'>
						<span className='order__text order__text--light'>Total</span>
						<span>
							<span className='order__text order__text--light'>NZD</span>
							<span className='order__text order__text--bold order__text--lg ml-2'>
								$228.00
							</span>
						</span>
					</div>
				</div>
			</div>
		</aside>
	);
}

AsideOrder.propTypes = {};

export default AsideOrder;
