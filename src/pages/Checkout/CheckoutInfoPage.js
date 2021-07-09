import React from 'react';
import './styles.scss';
import Header from 'components/Checkout/Header/Header';
import ButtonToggle from 'components/Checkout/Order/ButtonToggle';
import Breadcrumb from 'components/Checkout/Breadcrumb/Breadcrumb';
import ExpressCheckout from 'components/Checkout/ExpressCheckout/ExpressCheckout';
import Divider from 'components/Checkout/Divider/Divider';
import Contact from 'components/Checkout/Information/Contact';
import Delivery from 'components/Checkout/Information/Delivery';
import AsideOrder from 'components/Checkout/Order/AsideOrder';
import Address from 'components/Checkout/Information/Address';
import NavButtons from 'components/Checkout/NavButtons/NavButtons';

function CheckoutInfoPage() {
	return (
		<>
			<div className='checkout'>
				<Header />
				<ButtonToggle />
				<div className='checkout__content'>
					<div className='checkout__main'>
						<div className='wrap'>
							<Breadcrumb />
							<ExpressCheckout />
							<div className='mt-5'>
								<Divider content='OR' />
							</div>
							<form action=''>
								<Contact />
								<Delivery />
								<Address />
								<NavButtons
									next={{
										content: 'Continue to shipping',
										link: '/',
									}}
									prev={{
										content: 'Return to cart',
										link: '/',
									}}
								/>
							</form>
						</div>
					</div>
					<AsideOrder />
				</div>
			</div>
		</>
	);
}
export default CheckoutInfoPage;
