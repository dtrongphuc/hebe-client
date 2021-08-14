import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from 'components/Checkout/Header/Header';
import ButtonToggle from 'components/Checkout/Order/ButtonToggle';
import AsideOrder from 'components/Checkout/Order/AsideOrder';
import PropTypes from 'prop-types';
import './CheckoutLayoutStyles.scss';
import Breadcrumb from 'components/Checkout/Breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CheckoutLayout({ children }) {
	const asideOrderRef = useRef(null);
	const [showOrder, setShowOrder] = useState(false);
	const [width, setWidth] = React.useState(window.innerWidth);
	const { numberCart } = useSelector((state) => state.cart);
	let history = useHistory();

	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	// check cart empty
	useEffect(() => {
		if (numberCart === 0) {
			history.push('/404');
		}
	}, [numberCart, history]);

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
						{children}
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

CheckoutLayout.propTypes = {
	children: PropTypes.element,
};

export default CheckoutLayout;
