import { createSelector } from '@reduxjs/toolkit';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Payment from 'components/Checkout/Payment/Payment';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import React from 'react';
import { useSelector } from 'react-redux';

function PaymentPage(props) {
	const { email } = useSelector((state) => state.user);
	const selectAddressString = createSelector(
		(state) => state.checkout,
		({ address }) => {
			let { firstname, lastname, ...rest } = address;
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
			<section className='section-info'>
				<h2 className='section-info__heading mb-1'>Payment</h2>
				<p className='section-info__text'>
					All transactions are secure and encrypted
				</p>
			</section>
			<Payment />
			<NavButtons
				next={{
					content: 'Pay now',
					link: '/',
				}}
				prev={{
					content: 'Return to shipping',
					link: '/',
				}}
			/>
		</>
	);
}

export default PaymentPage;
