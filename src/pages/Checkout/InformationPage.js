import React from 'react';
import './styles.scss';
import Breadcrumb from 'components/Checkout/Breadcrumb/Breadcrumb';
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
		</>
	);
}
export default InformationPage;
