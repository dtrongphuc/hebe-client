import React from 'react';
import ExpressCheckout from 'components/Checkout/ExpressCheckout/ExpressCheckout';
import Divider from 'components/Checkout/Divider/Divider';
import Contact from 'components/Checkout/Information/Contact';
import Delivery from 'components/Checkout/Information/Delivery';
import Address from 'components/Checkout/Information/Address';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Pickup from 'components/Checkout/Information/Pickup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	focusAddressValidation,
	toggleShowAddressError,
} from 'features/checkout/checkoutSlice';
import { useRef } from 'react';

function InformationPage() {
	const { delivery } = useSelector((state) => state.checkout);
	let history = useHistory();
	const dispatch = useDispatch();
	const addressRef = useRef();

	const handleNextStepClicked = () => {
		let errors = document.querySelectorAll('.checkout-field.error');
		if (errors.length > 0) {
			let inputName = errors[0].querySelector('input')?.name;
			dispatch(toggleShowAddressError(true));
			dispatch(focusAddressValidation(inputName));
			return;
		}
		dispatch(toggleShowAddressError(false));

		let link = `/checkout/${delivery === 'shipment' ? 'shipping' : 'payment'}`;
		history.push(link);
	};

	return (
		<>
			<ExpressCheckout />
			<div className='mt-4'>
				<Divider content='OR' />
			</div>
			<Contact />
			<Delivery />

			{delivery === 'pickup' && <Pickup />}
			{delivery === 'shipment' && (
				<Address title='Shipping address' sectionRef={addressRef} />
			)}

			<NavButtons
				next={{
					content:
						delivery === 'shipment'
							? 'Continue to shipping'
							: 'Continue to payment',
					onClick: handleNextStepClicked,
				}}
				prev={{
					content: 'Return to cart',
					link: '/cart',
				}}
			/>
		</>
	);
}
export default InformationPage;
