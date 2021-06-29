import CustomerLayout from 'layouts/CustomerLayout';
import React from 'react';
import { Container } from 'react-bootstrap';
import { IoAddSharp, IoRemoveSharp, IoClose } from 'react-icons/io5';
import './styles.scss';

function CartPage() {
	return (
		<CustomerLayout>
			<div className='cart-wrapper'>
				<Container fluid='lg'>
					<div className='cart-main'>
						<h2 className='cart-h2'>Shopping Cart</h2>
						<div className='cart-list'>
							<div className='cart-item'>
								<div className='row h-100'>
									<div className='col-12 col-lg-8 my-auto'>
										<div className='d-flex align-items-center'>
											<a
												href='/product'
												className='cart-link cart-image__wrapper'
											>
												<img
													src='https://cdn.shopify.com/s/files/1/1132/3440/products/image_f5b94768-7b25-4c04-9683-ff023d56deaa_large.jpg?v=1620358571'
													alt=''
													className='cart-image__img'
												/>
											</a>
											<div className='mr-lg-4'>
												<div>
													<a
														href='/product'
														className='cart-text cart-text--bold'
													>
														A little Fragrant Indulgence Gift Box // In Bloom
													</a>
												</div>
												<div>
													<a
														href='/brand'
														className='cart-text cart-text--sm cart-text--blur'
													>
														GEORGE & EDI
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className='col-12 col-lg-4 my-auto'>
										<div className='d-flex align-items-center justify-content-between mt-4 mt-lg-0'>
											<div className='d-flex flex-column'>
												<p className='cart-text cart-text--sm text-center mb-2'>
													Price
												</p>
												<p className='cart-price'>10.9$</p>
											</div>
											<div className='d-flex flex-column'>
												<p className='cart-text cart-text--sm text-center mb-2'>
													Quantity
												</p>
												<div className='d-flex align-items-center'>
													<div className='cart-quantity-control'>
														<IoRemoveSharp size='1.2rem' color='#212529' />
													</div>
													<input
														type='text'
														className='cart-quantity'
														defaultValue='1'
													/>
													<div className='cart-quantity-control'>
														<IoAddSharp size='1.2rem' color='#000' />
													</div>
												</div>
											</div>
											<div className='d-flex flex-column'>
												<p className='cart-text cart-text--sm text-center mb-2'>
													Total
												</p>
												<p className='cart-price'>10.9$</p>
											</div>
										</div>
									</div>
								</div>
								<button className='border-0 bg-transparent btn-cart-remove'>
									<IoClose size='1.6rem' color='#666666' />
								</button>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</CustomerLayout>
	);
}

export default CartPage;
