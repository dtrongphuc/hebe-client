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
import { focusedChange } from 'features/checkout/checkoutSlice';

function InformationPage() {
	const { delivery, errors } = useSelector((state) => state.checkout);
	let history = useHistory();
	const dispatch = useDispatch();

	const handleNextStepClicked = () => {
		let firstError = Object.keys(errors).find((key) => errors[key] !== '');
		if (firstError) {
			dispatch(focusedChange(firstError));
			return;
		}
		let link = `/checkout/${delivery === 'shipping' ? 'shipping' : 'payment'}`;
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
			{delivery === 'shipping' && <Address title='Shipping address' />}

			<NavButtons
				next={{
					content:
						delivery === 'shipping'
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
