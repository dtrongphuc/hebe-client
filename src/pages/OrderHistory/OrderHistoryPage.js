import React from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPageStyles.scss';

function OrderHistoryPage() {
	return (
		<div className='container-lg'>
			<div className='order-history__container'>
				<div className='row'>
					<div className='col-12'>
						<div className='account-header'>
							<h2 className='account-title'>My account</h2>
						</div>
						<hr className='hr--small' />
					</div>
					<div className='col-12 mt-2'>
						<Link
							className='account-text account-text--small account-link'
							to='/account'
						>
							&#8592; Return to Account Details
						</Link>
					</div>
					<div className='col-12 mt-4'>
						<p className='account__col-title'>Order history</p>
					</div>
					<div className='col-12'>
						<div className='order-history__item'>
							<div className='order-history__item__head'>
								<div className='item d-flex align-items-center justify-content-start'>
									<span className='account-text account-text--small order-history__text--fixed'>
										Ship to
									</span>
									<span className='account-text account-text--blur account-text--small'>
										1017/56AB Hồng Bàng, Phường 9, Quận 6, TP.HCM, Quận 6
										008428, Vietnam
									</span>
								</div>
								<div className='item d-flex align-items-center justify-content-start'>
									<span className='account-text account-text--small order-history__text--fixed'>
										Method
									</span>
									<span className='account-text account-text--blur account-text--small'>
										Shipping Australia Untraced · $10.00
									</span>
								</div>
							</div>
							<ul className='order-history__items-list'>
								<li className='item'>
									<div className='left'>
										<Link to='/'>
											<img
												src='//cdn.shopify.com/s/files/1/1132/3440/products/image_700965c0-13f8-438d-b410-32e4607eea02_large.jpg?v=1601330659'
												alt=''
												className='order-history__item-img'
											/>
										</Link>
										<div>
											<Link
												to='/'
												className='account-text account-text--wrap px-2'
											>
												Billy Jumper - Cerise
											</Link>
											<p className='account-text account-text--blur account-text--small mt-1 px-2'>
												Cerise / XS
											</p>
											<p className='account-text account-text--blur account-text--small mt-1 px-2'>
												x1
											</p>
										</div>
									</div>

									<p className='account-text account-text--bold account-text--lg'>
										$197.00
									</p>
								</li>
							</ul>
							<div className='order-history__item-footer'>
								<div className='item'>
									<span className='account-text'>Shipping:</span>
									<span className='account-text width-fixed'>0</span>
								</div>
								<div className='item'>
									<span className='account-text'>Total:</span>
									<span className='account-text account-text--bold account-text--lg width-fixed'>
										$197.00
									</span>
								</div>
							</div>
							<hr className='hr--small' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// OrderHistoryPage.propTypes = {

// }

export default OrderHistoryPage;
