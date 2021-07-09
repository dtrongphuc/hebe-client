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
								<section className='section-info'>
									<h2 className='section-info__heading'>Shipping address</h2>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='checkout-field my-2'>
												<label>Gift card or discount code</label>
												<input
													type='text'
													placeholder='Gift card or discount code'
													className='input__checkout'
												/>
											</div>
										</div>
										<div className='col-12 col-md-6'>
											<div className='checkout-field my-2'>
												<label>Gift card or discount code</label>
												<input
													type='text'
													placeholder='Gift card or discount code'
													className='input__checkout'
												/>
											</div>
										</div>
									</div>
								</section>
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
