import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles.scss';
import Header from 'components/Checkout/Header/Header';
import ButtonToggle from 'components/Checkout/Order/ButtonToggle';
import Breadcrumb from 'components/Checkout/Breadcrumb/Breadcrumb';
import ExpressCheckout from 'components/Checkout/ExpressCheckout/ExpressCheckout';
import Divider from 'components/Checkout/Divider/Divider';
import Contact from 'components/Checkout/Information/Contact';
import Delivery from 'components/Checkout/Information/Delivery';
import AsideOrder from 'components/Checkout/Order/AsideOrder';
import Address from 'components/Checkout/Information/Address';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Pickup from 'components/Checkout/Information/Pickup';
import { useSelector } from 'react-redux';

function CheckoutInfoPage() {
	const asideOrderRef = useRef(null);
	const [showOrder, setShowOrder] = useState(false);
	const [width, setWidth] = React.useState(window.innerWidth);
	const { delivery } = useSelector((state) => state.checkout);

	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	const collapseOrder = useCallback(() => {
		let sectionHeight = asideOrderRef.current?.scrollHeight;
		let elementTransition = asideOrderRef.current?.style.transition;
		asideOrderRef.current.style.transition = '';
		requestAnimationFrame(function () {
			asideOrderRef.current.style.height = sectionHeight + 'px';
			asideOrderRef.current.style.transition = elementTransition;

			requestAnimationFrame(function () {
				asideOrderRef.current.style.height = 0 + 'px';
			});
		});
	}, []);

	const expandOrder = useCallback(() => {
		let sectionHeight = asideOrderRef.current?.scrollHeight;
		asideOrderRef.current.style.height = sectionHeight + 'px';
		asideOrderRef.current.addEventListener(
			'transitionend',
			function handler(e) {
				asideOrderRef.current.removeEventListener('transitionend', handler);
				asideOrderRef.current.style.height = null;
			}
		);
	}, []);

	useEffect(() => {
		if (!asideOrderRef.current) return;

		if (showOrder) {
			expandOrder();
		} else {
			collapseOrder();
		}
	}, [showOrder, collapseOrder, expandOrder]);

	React.useEffect(() => {
		window.addEventListener('resize', handleResize, false);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const toggleShowOrder = () => {
		setShowOrder((prevState) => !prevState);
	};

	return (
		<div className='checkout'>
			<Header />
			<div className='d-lg-none'>
				<ButtonToggle show={showOrder} onClick={toggleShowOrder} />
			</div>
			<div className='checkout__content'>
				<div className='checkout__main'>
					<div className='wrap'>
						<Breadcrumb />
						<ExpressCheckout />
						<div className='mt-4'>
							<Divider content='OR' />
						</div>
						<Contact />
						<Delivery />
						<form action=''>
							{delivery === 'pick-up' && <Pickup />}
							{delivery === 'ship' && <Address />}

							<NavButtons
								next={{
									content:
										delivery === 'ship'
											? 'Continue to shipping'
											: 'Continue to payment',
									link: '/',
								}}
								prev={{
									content: 'Return to cart',
									link: '/',
								}}
							/>
						</form>
					</div>
				</div>
				{width <= 992 && (
					<div
						className='order__expand'
						ref={asideOrderRef}
						style={{ height: 0 }}
					>
						<AsideOrder />
					</div>
				)}

				{width > 992 && <AsideOrder />}
			</div>
		</div>
	);
}
export default CheckoutInfoPage;
