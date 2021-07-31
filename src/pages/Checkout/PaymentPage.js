import { createSelector } from '@reduxjs/toolkit';
import Address from 'components/Checkout/Information/Address';
import ModalSuccess from 'components/Checkout/ModalSuccess/ModalSuccess';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Payment from 'components/Checkout/Payment/Payment';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { clearCart } from 'features/cart/cartSlice';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createOrder } from 'services/OrderApi';

function PaymentPage(props) {
	let history = useHistory();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const { email } = useSelector((state) => state.user);

	const [shippingInfo, setShippingInfo] = useState(null);

	const {
		delivery,
		shippingMethodSelected,
		pickupLocationSelected,
		paymentMethodSelected,
		addressInfo,
	} = useSelector((state) => state.checkout);

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
		if (delivery === 'shipment') {
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

	// when [pay now] clicked
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let data = {
				billInfo: {
					...addressInfo,
				},
				deliveryMethod: delivery,
				shippingMethod: delivery === 'shipment' ? shippingMethodSelected : null,
				pickupLocation: delivery === 'pickup' ? pickupLocationSelected : null,
				paymentMethod: paymentMethodSelected,
			};
			const response = await createOrder(data);
			if (response.success) {
				setShowSuccess(true);
				dispatch(clearCart());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
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
				{delivery === 'pickup' && (
					<Address
						title='Billing address'
						subTitle='Enter the address that matches your card or payment method.'
					/>
				)}
				<NavButtons
					next={{
						content: 'Pay now',
						type: 'submit',
					}}
					prev={{
						content:
							delivery === 'shipment'
								? 'Return to shipping'
								: 'Return to information',
						link:
							delivery === 'shipment'
								? '/checkout/shipping'
								: '/checkout/information',
					}}
				/>
			</form>
			<ModalSuccess
				show={showSuccess}
				close={() => {
					setShowSuccess(false);
					history.push('/');
				}}
			/>
			<ModalLoading loading={loading} />
		</>
	);
}

export default PaymentPage;
