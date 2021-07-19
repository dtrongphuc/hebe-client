import { createSelector } from '@reduxjs/toolkit';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import ShippingMethod from 'components/Checkout/Shipping/ShippingMethod';
import React from 'react';
import { useSelector } from 'react-redux';
import './ShippingPageStyles.scss';

function ShippingPage() {
	const { email } = useSelector((state) => state.user);
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

	return (
		<>
			<ShippingInfo items={shippingInfoItems} />
			<ShippingMethod />
			<NavButtons
				next={{
					content: 'Continue to payment',
					link: '/checkout/payment',
				}}
				prev={{
					content: 'Return to information',
					link: '/checkout/information',
				}}
			/>
		</>
	);
}

export default ShippingPage;
