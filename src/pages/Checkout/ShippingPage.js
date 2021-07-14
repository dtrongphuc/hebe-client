import Breadcrumb from 'components/Checkout/Breadcrumb/Breadcrumb';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';
import ShippingInfo from 'components/Checkout/Shipping/ShippingInfo';
import ShippingMethod from 'components/Checkout/Shipping/ShippingMethod';
import React from 'react';
import './ShippingPageStyles.scss';

function ShippingPage() {
	return (
		<>
			<Breadcrumb />
			<ShippingInfo />
			<ShippingMethod />
			<NavButtons
				next={{
					content: 'Continue to payment',
					link: '/',
				}}
				prev={{
					content: 'Return to information',
					link: '/',
				}}
			/>
		</>
	);
}

export default ShippingPage;
