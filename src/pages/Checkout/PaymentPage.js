import { createSelector } from '@reduxjs/toolkit';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Payment from 'components/Checkout/Payment/Payment';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function PaymentPage(props) {
	const { email } = useSelector((state) => state.user);

	const [shippingInfo, setShippingInfo] = useState(null);

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

	const selectShippingMethod = createSelector(
		(state) => state.checkout,
		({ shippingMethods, shippingMethodSelected }) =>
			shippingMethods.find((method) => method._id === shippingMethodSelected)
				?.name
	);

	const selectPickupStore = createSelector(
		(state) => state.checkout,
		({ pickupLocations, pickupLocationSelected }) =>
			pickupLocations.find((method) => method._id === pickupLocationSelected)
	);

	const address = useSelector(selectAddressString);
	const method = useSelector(selectShippingMethod);
	const pickup = useSelector(selectPickupStore);

	useEffect(() => {
		if (delivery === 'shipping') {
			setShippingInfo([
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
				{
					label: 'Method',
					content: method,
					link: '/checkout/shipping',
				},
			]);
		} else if (delivery === 'pickup') {
			setShippingInfo([
				{
					label: 'Contact',
					content: email,
					link: '/checkout/information',
				},
				{
					label: 'Method',
					content: `Pick up in store · ${pickup.name}`,
					des: pickup.address,
					link: '/checkout/information',
				},
			]);
		}
	}, [delivery, address, method, pickup, email]);

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<>
			<ShippingInfo items={shippingInfo} />
			<section className='section-info'>
				<h2 className='section-info__heading mb-1'>Payment</h2>
				<p className='section-info__text'>
					All transactions are secure and encrypted
				</p>
			</section>
			<form onSubmit={onSubmit}>
				<Payment />
				<NavButtons
					next={{
						content: 'Pay now',
						type: 'submit',
					}}
					prev={{
						content: 'Return to shipping',
						link: '/checkout/shipping',
					}}
				/>
			</form>
		</>
	);
}

export default PaymentPage;
