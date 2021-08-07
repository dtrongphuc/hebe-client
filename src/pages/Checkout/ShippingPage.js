import { createSelector } from '@reduxjs/toolkit';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import ShippingMethod from 'components/Checkout/Shipping/ShippingMethod';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ShippingPage() {
	let history = useHistory();

	const { email } = useSelector((state) => state.user);
	const { delivery } = useSelector((state) => state.checkout);

	const selectAddressString = createSelector(
		(state) => state.checkout,
		({ addressInfo }) => {
			let { firstname, lastname, ...rest } = addressInfo;
			let string = Object.values({ ...rest })
				.filter((value) => value !== '')
				.join(', ');
			return string;
		}
	);
	const address = useSelector(selectAddressString);
	const shippingInfoItems = [
		{
			label: 'Contact',
			content: email,
			link: '/checkout/information',
		},
		{
			label: 'Ship to',
			content: address,
			link: '/checkout/information',
		},
	];

	// check delivery method is shipping
	useEffect(() => {
		if (delivery !== 'shipment') {
			history.push('/checkout/information');
		}
	}, [delivery, history]);

	const handleNextStepClicked = () => {
		history.push('/checkout/payment');
	};

	return (
		<>
			{delivery === 'shipment' && (
				<>
					<ShippingInfo items={shippingInfoItems} />
					<ShippingMethod />
					<NavButtons
						next={{
							content: 'Continue to payment',
							onClick: handleNextStepClicked,
						}}
						prev={{
							content: 'Return to information',
							link: '/checkout/information',
						}}
					/>
				</>
			)}
		</>
	);
}

export default ShippingPage;
