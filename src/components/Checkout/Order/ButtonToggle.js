import React from 'react';
import PropTypes from 'prop-types';
import './ButtonToggleStyles.scss';
import { useSelector } from 'react-redux';
import { calcTotalPrice, priceString } from 'utils/util';

function ButtonToggle({ show, onClick }) {
	const { shippingPrice, discount } = useSelector((state) => state.checkout);
	const { totalPrice } = useSelector((state) => state.cart.shoppingCart);

	return (
		<div>
			<button className='order-toggle' onClick={onClick}>
				<span className='wrap'>
					<span className='order-toggle__inner'>
						<span className='order-toggle__icon-wrapper'>
							<svg width='20' height='19' xmlns='http://www.w3.org/2000/svg'>
								<path d='M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z'></path>
							</svg>
						</span>
						{!show && (
							<span className='order-toggle__heading'>
								<span>Show order summary</span>
								<svg
									width='11'
									height='6'
									xmlns='http://www.w3.org/2000/svg'
									fill='#000'
								>
									<path d='M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z'></path>
								</svg>
							</span>
						)}
						{show && (
							<span className='order-toggle__heading'>
								<span>Hide order summary</span>
								<svg
									width='11'
									height='7'
									xmlns='http://www.w3.org/2000/svg'
									fill='#000'
								>
									<path d='M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z'></path>
								</svg>
							</span>
						)}

						<span className='order-toggle__right'>
							{priceString(
								calcTotalPrice(totalPrice, shippingPrice?.price || 0, discount)
							)}
						</span>
					</span>
				</span>
			</button>
		</div>
	);
}

ButtonToggle.propTypes = {
	show: PropTypes.bool,
	onClick: PropTypes.func,
};

export default ButtonToggle;
