import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/img/HEBE_Logo.png';
import {
	IoArrowForwardOutline,
	IoChevronForwardOutline,
	IoStorefront,
} from 'react-icons/io5';

import { MdLocalShipping } from 'react-icons/md';
import './styles.scss';

function CheckoutPage() {
	return (
		<>
			<div className='checkout'>
				<header className='checkout__header'>
					<div className='wrap'>
						<Link to='/' className='checkout__header-link'>
							<img src={Logo} alt='Hebe Designer Boutique' />
						</Link>
					</div>
				</header>
				<aside>
					<button className='order-toggle'>
						<span className='wrap'>
							<span className='order-toggle__inner'>
								<span className='order-toggle__icon-wrapper'>
									<svg
										width='20'
										height='19'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z'></path>
									</svg>
								</span>
								<span className='order-toggle__heading order-toggle__heading--show'>
									<span>Show order summary</span>
									<svg
										width='11'
										height='6'
										xmlns='http://www.w3.org/2000/svg'
										fill='#000'
									>
										<path d='M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z'></path>
									</svg>
								</span>
								<span className='order-toggle__heading order-toggle__heading--hide'>
									<span>Hide order summary</span>
									<svg
										width='11'
										height='7'
										xmlns='http://www.w3.org/2000/svg'
										fill='#000'
									>
										<path d='M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z'></path>
									</svg>
								</span>
								<span className='order-toggle__right'>$31.00</span>
							</span>
						</span>
					</button>
				</aside>
				<div className='checkout__content'>
					<div className='checkout__main'>
						<div className='wrap'>
							<ol className='checkout-breadcrumb'>
								<li className='checkout-breadcrumb__item'>
									<Link
										to='/'
										className='checkout-breadcrumb__link checkout-breadcrumb__link--active'
									>
										Cart
									</Link>
									<IoChevronForwardOutline />
								</li>
								<li className='checkout-breadcrumb__item'>
									<Link
										to='/'
										className='checkout-breadcrumb__link checkout-breadcrumb__link--active'
									>
										Information
									</Link>
									<IoChevronForwardOutline />
								</li>
								<li className='checkout-breadcrumb__item'>
									<Link to='/' className='checkout-breadcrumb__link'>
										Shipping
									</Link>
									<IoChevronForwardOutline />
								</li>
								<li className='checkout-breadcrumb__item'>
									<Link to='/' className='checkout-breadcrumb__link'>
										Payment
									</Link>
								</li>
							</ol>
							<section className='express-checkout'>
								<h2 className='checkout-divider checkout-divider--radius'>
									Express checkout
								</h2>
								<div className='wrapper'>
									<div className='dynamic-wrap'>
										<button className='btn__checkout shop-pay payment-button'>
											<svg
												id='shopify-svg__payments-shopify-pay-light'
												viewBox='134 256 410 1'
												style={{ width: 82, height: 24 }}
											>
												<path
													d='M241.22,242.74c-3.07-6.44-8.89-10.6-17.66-10.6a17.58,17.58,0,0,0-13.81,7.1l-.32.39V214.39a.55.55,0,0,0-.55-.55h-12.4a.55.55,0,0,0-.54.55v72.4a.54.54,0,0,0,.54.54h13.28a.55.55,0,0,0,.55-.54V255.92c0-6,4-10.25,10.4-10.25,7,0,8.77,5.76,8.77,11.63v29.49a.54.54,0,0,0,.54.54h13.25a.55.55,0,0,0,.55-.54V255.54c0-1.07,0-2.12-.14-3.14A27.63,27.63,0,0,0,241.22,242.74Z'
													style={{ fill: 'white' }}
												></path>
												<path
													d='M174.91,253.47s-6.76-1.59-9.25-2.23-6.84-2-6.84-5.29,3.51-4.34,7.07-4.34,7.52.86,7.83,4.81a.57.57,0,0,0,.57.52l13.09-.05a.56.56,0,0,0,.56-.6c-.81-12.64-11.9-17.16-22.13-17.16-12.13,0-21,8-21,16.82,0,6.44,1.82,12.48,16.13,16.68,2.51.73,5.92,1.68,8.9,2.51,3.58,1,5.51,2.51,5.51,4.89,0,2.76-4,4.68-7.93,4.68-5.69,0-9.73-2.11-10.06-5.9a.57.57,0,0,0-.57-.5l-13.06.06a.57.57,0,0,0-.57.59c.6,11.93,12.12,18.36,22.86,18.36,16,0,23.23-9,23.23-17.43C189.27,265.93,188.36,256.91,174.91,253.47Z'
													style={{ fill: 'white' }}
												></path>
												<path
													d='M343.31,232.12c-6.65,0-12.22,3.68-15.81,8.12v-7.6a.54.54,0,0,0-.53-.54H314.55a.54.54,0,0,0-.54.54v71a.54.54,0,0,0,.54.53h13.29a.53.53,0,0,0,.53-.53V280.3h.2c2.11,3.22,7.88,7.08,15.42,7.08,14.18,0,26-11.76,26-27.65C370,244.48,358.24,232.12,343.31,232.12Zm-1.23,41.73a14.09,14.09,0,1,1,13.74-14.12A13.9,13.9,0,0,1,342.08,273.85Z'
													style={{ fill: 'white' }}
												></path>
												<path
													d='M274.68,229c-12.39,0-18.57,4.21-23.53,7.58l-.15.1a1.23,1.23,0,0,0-.37,1.63l4.9,8.44a1.24,1.24,0,0,0,.87.6,1.21,1.21,0,0,0,1-.27l.39-.32c2.55-2.14,6.64-5,16.54-5.78,5.51-.44,10.27,1,13.78,4.28,3.86,3.56,6.17,9.31,6.17,15.38,0,11.17-6.58,18.19-17.15,18.33-8.71-.05-14.56-4.59-14.56-11.3,0-3.56,1.61-5.88,4.75-8.2a1.22,1.22,0,0,0,.37-1.56l-4.4-8.32a1.29,1.29,0,0,0-.77-.62,1.24,1.24,0,0,0-1,.13c-4.94,2.93-11,8.29-10.67,18.59.4,13.11,11.3,23.12,25.47,23.53l.71,0H278c16.84-.55,29-13.05,29-30C307,245.66,295.66,229,274.68,229Z'
													style={{ fill: 'white' }}
												></path>
												<path
													d='M342.08,245.68a14.09,14.09,0,1,0,13.74,14.05A13.84,13.84,0,0,0,342.08,245.68Z'
													style={{ fill: 'rgb(90, 49, 244)' }}
												></path>
												<rect
													x='383.23'
													y='214.02'
													width='141.73'
													height='90.42'
													rx='14.17'
													style={{ fill: 'white' }}
												></rect>
												<path
													d='M439.07,246.62c0,9.67-6.77,16.57-16.23,16.57h-8.92a.75.75,0,0,0-.75.75v12.7a.75.75,0,0,1-.75.75h-6.28a.76.76,0,0,1-.75-.75V230.81a.75.75,0,0,1,.75-.75h16.7C432.3,230.06,439.07,237,439.07,246.62Zm-7.78,0c0-5.54-3.79-9.6-8.93-9.6h-8.44a.76.76,0,0,0-.75.75v17.71a.75.75,0,0,0,.75.74h8.44C427.5,256.22,431.29,252.17,431.29,246.62Z'
													style={{ fill: 'rgb(90, 49, 244)' }}
												></path>
												<path
													d='M440.92,268.6a8.91,8.91,0,0,1,3.72-7.64c2.44-1.83,6.22-2.78,11.83-3l5.95-.2V256c0-3.51-2.36-5-6.15-5s-6.18,1.34-6.74,3.53a.72.72,0,0,1-.72.52h-5.87a.74.74,0,0,1-.75-.85c.88-5.2,5.18-9.15,14.35-9.15,9.74,0,13.25,4.53,13.25,13.18v18.38a.75.75,0,0,1-.75.76h-5.93a.75.75,0,0,1-.75-.76v-1.37a.56.56,0,0,0-1-.39c-1.77,1.93-4.65,3.33-9.24,3.33C445.39,278.2,440.92,274.68,440.92,268.6Zm21.5-4v-1.42l-7.7.4c-4.06.21-6.43,1.9-6.43,4.74,0,2.57,2.17,4,5.95,4C459.38,272.32,462.42,269.54,462.42,264.61Z'
													style={{ fill: 'rgb(90, 49, 244)' }}
												></path>
												<path
													d='M475.75,291.27v-5.35a.76.76,0,0,1,.9-.75,14.84,14.84,0,0,0,2.75.26,7.11,7.11,0,0,0,7.17-5.07l.39-1.23a.74.74,0,0,0,0-.51l-12.34-31.7a.76.76,0,0,1,.71-1h6a.77.77,0,0,1,.71.49l8.38,22.36a.77.77,0,0,0,1.44,0l7.27-22.3a.75.75,0,0,1,.72-.52H506a.76.76,0,0,1,.71,1l-13.2,35.21c-3,8.18-8.25,10.28-14,10.28a11.17,11.17,0,0,1-3.21-.39A.77.77,0,0,1,475.75,291.27Z'
													style={{ fill: 'rgb(90, 49, 244)' }}
												></path>
											</svg>
										</button>
										<button className='btn__checkout payment-button paypal'>
											<svg
												width='24'
												height='32'
												viewBox='0 0 24 32'
												xmlns='http://www.w3.org/2000/svg'
												preserveAspectRatio='xMinYMin meet'
											>
												<path
													fill='#009cde'
													d='M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 6.675 28.9 C 6.581 29.3 6.862 29.6 7.236 29.6 L 11.356 29.6 C 11.825 29.6 12.292 29.3 12.386 28.8 L 12.386 28.5 L 13.228 23.3 L 13.228 23.1 C 13.322 22.6 13.79 22.2 14.258 22.2 L 14.821 22.2 C 18.845 22.2 21.935 20.5 22.871 15.5 C 23.339 13.4 23.153 11.7 22.029 10.5 C 21.748 10.1 21.279 9.8 20.905 9.5 L 20.905 9.5'
												></path>
												<path
													fill='#012169'
													d='M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 8.173 18.7 C 8.267 18.1 8.735 17.7 9.296 17.7 L 11.636 17.7 C 16.224 17.7 19.782 15.7 20.905 10.1 C 20.812 9.8 20.905 9.7 20.905 9.5'
												></path>
												<path
													fill='#003087'
													d='M 9.485 9.5 C 9.577 9.2 9.765 8.9 10.046 8.7 C 10.232 8.7 10.326 8.6 10.513 8.6 L 16.692 8.6 C 17.442 8.6 18.189 8.7 18.753 8.8 C 18.939 8.8 19.127 8.8 19.314 8.9 C 19.501 9 19.688 9 19.782 9.1 C 19.875 9.1 19.968 9.1 20.063 9.1 C 20.343 9.2 20.624 9.4 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.6 C 18.658 3.2 16.506 2.6 13.79 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 9.485 9.5 Z'
												></path>
											</svg>

											<svg
												height='32'
												viewBox='0 0 100 32'
												xmlns='http:&#x2F;&#x2F;www.w3.org&#x2F;2000&#x2F;svg'
												preserveAspectRatio='xMinYMin meet'
											>
												<path
													fill='#003087'
													d='M 12 4.917 L 4.2 4.917 C 3.7 4.917 3.2 5.317 3.1 5.817 L 0 25.817 C -0.1 26.217 0.2 26.517 0.6 26.517 L 4.3 26.517 C 4.8 26.517 5.3 26.117 5.4 25.617 L 6.2 20.217 C 6.3 19.717 6.7 19.317 7.3 19.317 L 9.8 19.317 C 14.9 19.317 17.9 16.817 18.7 11.917 C 19 9.817 18.7 8.117 17.7 6.917 C 16.6 5.617 14.6 4.917 12 4.917 Z M 12.9 12.217 C 12.5 15.017 10.3 15.017 8.3 15.017 L 7.1 15.017 L 7.9 9.817 C 7.9 9.517 8.2 9.317 8.5 9.317 L 9 9.317 C 10.4 9.317 11.7 9.317 12.4 10.117 C 12.9 10.517 13.1 11.217 12.9 12.217 Z'
												></path>
												<path
													fill='#003087'
													d='M 35.2 12.117 L 31.5 12.117 C 31.2 12.117 30.9 12.317 30.9 12.617 L 30.7 13.617 L 30.4 13.217 C 29.6 12.017 27.8 11.617 26 11.617 C 21.9 11.617 18.4 14.717 17.7 19.117 C 17.3 21.317 17.8 23.417 19.1 24.817 C 20.2 26.117 21.9 26.717 23.8 26.717 C 27.1 26.717 29 24.617 29 24.617 L 28.8 25.617 C 28.7 26.017 29 26.417 29.4 26.417 L 32.8 26.417 C 33.3 26.417 33.8 26.017 33.9 25.517 L 35.9 12.717 C 36 12.517 35.6 12.117 35.2 12.117 Z M 30.1 19.317 C 29.7 21.417 28.1 22.917 25.9 22.917 C 24.8 22.917 24 22.617 23.4 21.917 C 22.8 21.217 22.6 20.317 22.8 19.317 C 23.1 17.217 24.9 15.717 27 15.717 C 28.1 15.717 28.9 16.117 29.5 16.717 C 30 17.417 30.2 18.317 30.1 19.317 Z'
												></path>
												<path
													fill='#003087'
													d='M 55.1 12.117 L 51.4 12.117 C 51 12.117 50.7 12.317 50.5 12.617 L 45.3 20.217 L 43.1 12.917 C 43 12.417 42.5 12.117 42.1 12.117 L 38.4 12.117 C 38 12.117 37.6 12.517 37.8 13.017 L 41.9 25.117 L 38 30.517 C 37.7 30.917 38 31.517 38.5 31.517 L 42.2 31.517 C 42.6 31.517 42.9 31.317 43.1 31.017 L 55.6 13.017 C 55.9 12.717 55.6 12.117 55.1 12.117 Z'
												></path>
												<path
													fill='#009cde'
													d='M 67.5 4.917 L 59.7 4.917 C 59.2 4.917 58.7 5.317 58.6 5.817 L 55.5 25.717 C 55.4 26.117 55.7 26.417 56.1 26.417 L 60.1 26.417 C 60.5 26.417 60.8 26.117 60.8 25.817 L 61.7 20.117 C 61.8 19.617 62.2 19.217 62.8 19.217 L 65.3 19.217 C 70.4 19.217 73.4 16.717 74.2 11.817 C 74.5 9.717 74.2 8.017 73.2 6.817 C 72 5.617 70.1 4.917 67.5 4.917 Z M 68.4 12.217 C 68 15.017 65.8 15.017 63.8 15.017 L 62.6 15.017 L 63.4 9.817 C 63.4 9.517 63.7 9.317 64 9.317 L 64.5 9.317 C 65.9 9.317 67.2 9.317 67.9 10.117 C 68.4 10.517 68.5 11.217 68.4 12.217 Z'
												></path>
												<path
													fill='#009cde'
													d='M 90.7 12.117 L 87 12.117 C 86.7 12.117 86.4 12.317 86.4 12.617 L 86.2 13.617 L 85.9 13.217 C 85.1 12.017 83.3 11.617 81.5 11.617 C 77.4 11.617 73.9 14.717 73.2 19.117 C 72.8 21.317 73.3 23.417 74.6 24.817 C 75.7 26.117 77.4 26.717 79.3 26.717 C 82.6 26.717 84.5 24.617 84.5 24.617 L 84.3 25.617 C 84.2 26.017 84.5 26.417 84.9 26.417 L 88.3 26.417 C 88.8 26.417 89.3 26.017 89.4 25.517 L 91.4 12.717 C 91.4 12.517 91.1 12.117 90.7 12.117 Z M 85.5 19.317 C 85.1 21.417 83.5 22.917 81.3 22.917 C 80.2 22.917 79.4 22.617 78.8 21.917 C 78.2 21.217 78 20.317 78.2 19.317 C 78.5 17.217 80.3 15.717 82.4 15.717 C 83.5 15.717 84.3 16.117 84.9 16.717 C 85.5 17.417 85.7 18.317 85.5 19.317 Z'
												></path>
												<path
													fill='#009cde'
													d='M 95.1 5.417 L 91.9 25.717 C 91.8 26.117 92.1 26.417 92.5 26.417 L 95.7 26.417 C 96.2 26.417 96.7 26.017 96.8 25.517 L 100 5.617 C 100.1 5.217 99.8 4.917 99.4 4.917 L 95.8 4.917 C 95.4 4.917 95.2 5.117 95.1 5.417 Z'
												></path>
											</svg>
										</button>
										<button className='btn__checkout payment-button g-pay'>
											<svg
												id='shopify-svg__payments-google-pay-light'
												viewBox='0 0 41 17'
												style={{ width: 45, height: 20 }}
											>
												<path
													d='M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .991-.36 1.819-1.08 2.482-.697.665-1.559.996-2.583.996h-2.485v.001zM27.194 10.442c0 .392.166.718.499.98.332.26.722.391 1.168.391.633 0 1.196-.234 1.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61 0-1.12.148-1.528.442-.409.294-.613.657-.613 1.093m1.946-5.815c1.112 0 1.989.297 2.633.89.642.594.964 1.408.964 2.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45 1.372-2.486 1.372-.882 0-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96 0-.828.313-1.486.94-1.976s1.463-.735 2.51-.735c.892 0 1.629.163 2.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132 2.132 0 0 0-1.455-.547c-.84 0-1.504.353-1.995 1.062l-1.324-.834c.73-1.045 1.81-1.568 3.238-1.568M40.993 4.889l-5.02 11.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387 5.749h.032l2.322-5.75z'
													style={{ fill: 'rgb(255, 255, 255)' }}
												></path>
												<path
													d='M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944'
													style={{ fill: 'rgb(66, 133, 244)' }}
												></path>
												<path
													d='M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703'
													style={{ fill: 'rgb(52, 168, 83)' }}
												></path>
												<path
													d='M3.212 8.267a4.034 4.034 0 0 1 0-2.572V3.964H.978A6.678 6.678 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017l2.234-1.731z'
													style={{ fill: 'rgb(251, 188, 5)' }}
												></path>
												<path
													d='M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.728 6.728 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774'
													style={{ fill: 'rgb(234, 67, 53)' }}
												></path>
											</svg>
										</button>
									</div>
								</div>
							</section>
							<div className='mt-5'>
								<h2 className='checkout-divider checkout-divider--separate'>
									Or
								</h2>
							</div>
							<section className='section-info'>
								<h2 className='section-info__heading'>Contact information</h2>
								<div className='contact-info'>
									<img
										src='//cdn.shopify.com/proxy/29c1df4b0a7877e4b53c6d9b10201bf41a4249dc40e0320639e7ea8a2d71072f/www.gravatar.com/avatar/407de42f9c56a1fc27c8fc5ecd259c2f.jpg?s=100&d=https%3A%2F%2Fcdn.shopify.com%2Fshopifycloud%2Fshopify%2Fassets%2Fno-gravatar-new-04e7c2331218ac202e79e31be502fd5631bc96cb0206580dbcb0720ebbbd7c73_100x100.png'
										alt=''
										className='avatar'
									/>
									<div>
										<p className='section-info__text'>
											Duong Trong Phuc (dangcapbp36@gmail.com)
										</p>
										<Link
											to='/logout'
											className='section-info__text section-info__text--bold'
										>
											Log out
										</Link>
									</div>
								</div>
							</section>
							<section className='section-info'>
								<h2 className='section-info__heading'>Delivery method</h2>
								<div className='radio-content'>
									<div className='radio-wrapper'>
										<input
											type='radio'
											name='delivery'
											id='ship'
											className='checkout-radio'
										/>
										<label htmlFor='ship'>
											<MdLocalShipping size='1.6em' />
											<span>Ship</span>
										</label>
									</div>
									<div className='radio-wrapper'>
										<input
											type='radio'
											name='delivery'
											id='pick-up'
											className='checkout-radio'
										/>
										<label htmlFor='pick-up'>
											<IoStorefront size='1.6em' />
											<span>Pick up</span>
										</label>
									</div>
								</div>
							</section>
							<section className='section-info'>
								<h2 className='section-info__heading'>Shipping address</h2>
							</section>
						</div>
					</div>
					<aside className='checkout__order'>
						<div className='wrap'>
							<div className='order__list'>
								<div className='order-item'>
									<div className='order-item__left'>
										<div className='order-item__img-wrapper'>
											<div className='order-item__img-thumbnail'>
												<img
													src='//cdn.shopify.com/s/files/1/1132/3440/products/AD57C9D1-8A77-4ACE-8B65-EEA74FB07DD2_small.jpg?v=1614204416'
													alt=''
												/>
											</div>
											<span className='order-item__badge'>1</span>
										</div>
										<div className='order-item__info'>
											<p className='order__text order__text--bold'>
												Aubri Tank
											</p>
											<p className='order__text order__text--light order__text--sm'>
												14 / Black
											</p>
										</div>
									</div>
									<div className='order__right'>
										<span className='order__text order__text--bold'>
											$31.00
										</span>
									</div>
								</div>
							</div>
							<div className='order__discount'>
								<div className='checkout-field'>
									<label>Gift card or discount code</label>
									<input
										type='text'
										placeholder='Gift card or discount code'
										className='input__checkout order__discount-input'
									/>
								</div>
								<button className='btn__checkout order__discount-submit order__discount-submit--disabled'>
									<IoArrowForwardOutline size='1.6em' />
								</button>
							</div>
							<div className='checkout-section'>
								<div className='d-flex align-items-center justify-content-between'>
									<span className='order__text order__text--light'>
										Subtotal
									</span>
									<span className='order__text order__text--bold'>$228.00</span>
								</div>
								<div className='d-flex align-items-center justify-content-between mt-2'>
									<span className='order__text order__text--light'>
										Shipping
									</span>
									<span className='order__text order__text--light order__text--sm'>
										Calculated at next step
									</span>
								</div>
							</div>
							<div className='checkout-section'>
								<div className='d-flex align-items-center justify-content-between'>
									<span className='order__text order__text--light'>Total</span>
									<span>
										<span className='order__text order__text--light'>NZD</span>
										<span className='order__text order__text--bold order__text--lg ml-2'>
											$228.00
										</span>
									</span>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}
export default CheckoutPage;
