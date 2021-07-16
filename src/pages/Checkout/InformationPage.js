import React from 'react';
import ExpressCheckout from 'components/Checkout/ExpressCheckout/ExpressCheckout';
import Divider from 'components/Checkout/Divider/Divider';
import Contact from 'components/Checkout/Information/Contact';
import Delivery from 'components/Checkout/Information/Delivery';
import Address from 'components/Checkout/Information/Address';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import Pickup from 'components/Checkout/Information/Pickup';
import { useSelector } from 'react-redux';

function InformationPage() {
	const { delivery } = useSelector((state) => state.checkout);

	return (
		<>
			<ExpressCheckout />
			<div className='mt-4'>
				<Divider content='OR' />
			</div>
			<Contact />
			<Delivery />
			{delivery === 'pickup' && <Pickup />}
			{delivery === 'shipping' && <Address />}

			<NavButtons
				next={{
					content:
						delivery === 'shipping'
							? 'Continue to shipping'
							: 'Continue to payment',
					link: `/checkout/${delivery === 'shipping' ? 'shipping' : 'payment'}`,
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
