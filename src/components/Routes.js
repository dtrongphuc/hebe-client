import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthThunk } from 'features/user/userSlice';
import { fetchCartThunk } from 'features/cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import { Suspense } from 'react';
import ModalLoading from './ModalLoading/ModalLoading';
import CheckoutLayout from 'layouts/CheckoutLayout';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import CustomerLayout from 'layouts/CustomerLayout';

const Admin = React.lazy(() => import('admin/Admin'));
const HomePage = React.lazy(() => import('pages/Home/HomePage'));
const ProductDetailPage = React.lazy(() =>
	import('pages/ProductDetail/ProductDetailPage')
);
const CollectionPage = React.lazy(() =>
	import('pages/Collection/CollectionPage')
);
const ContactPage = React.lazy(() => import('pages/Contact/ContactPage'));
const LoginPage = React.lazy(() => import('pages/Auth/LoginPage'));
const RegisterPage = React.lazy(() => import('pages/Auth/RegisterPage'));
const ForgotPassword = React.lazy(() => import('pages/Auth/ForgotPassword'));
const AccountPage = React.lazy(() => import('pages/Account/AccountPage'));

const AddressesPage = React.lazy(() => import('pages/Addresses/AddressesPage'));
const CartPage = React.lazy(() => import('pages/Cart/CartPage'));
const InformationPage = React.lazy(() =>
	import('pages/Checkout/InformationPage')
);
const ShippingPage = React.lazy(() => import('pages/Checkout/ShippingPage'));
const PaymentPage = React.lazy(() => import('pages/Checkout/PaymentPage'));
const OrderHistoryPage = React.lazy(() =>
	import('pages/OrderHistory/OrderHistoryPage')
);
const ErrorPage = React.lazy(() => import('pages/404/ErrorPage'));
const ResetPassword = React.lazy(() => import('pages/Auth/ResetPassword'));

function Routes() {
	const dispatch = useDispatch();
	const { isLogged, role } = useSelector((state) => state.user);

	useEffect(() => {
		(async () => {
			try {
				await dispatch(checkAuthThunk());
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			try {
				if (isLogged && role === 'user') {
					const cartResponse = await dispatch(fetchCartThunk());
					unwrapResult(cartResponse);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch, isLogged, role]);

	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<PrivateRoute exact path='/checkout/:path?'>
					<CheckoutLayout>
						<Suspense fallback={<ModalLoading loading={true} />}>
							<Switch>
								<PrivateRoute
									exact
									path='/checkout/information'
									component={InformationPage}
								/>
								<PrivateRoute
									exact
									path='/checkout/shipping'
									component={ShippingPage}
								/>
								<PrivateRoute
									exact
									path='/checkout/payment'
									component={PaymentPage}
								/>
							</Switch>
						</Suspense>
					</CheckoutLayout>
				</PrivateRoute>

				<Route path='/admin/:path?'>
					<Suspense fallback={<ModalLoading loading={true} />}>
						<Switch>
							<Route path='/admin' component={Admin} />
						</Switch>
					</Suspense>
				</Route>

				<Route>
					<CustomerLayout>
						<Suspense fallback={<ModalLoading loading={true} />}>
							<Switch>
								<Route exact path='/' component={HomePage} />
								<Route exact path='/404' component={ErrorPage} />
								<Route
									exact
									path='/:path/products/:productPath'
									component={ProductDetailPage}
								/>
								<Route
									exact
									path='/products/:productPath'
									component={ProductDetailPage}
								/>
								<Route
									exact
									path='/collections/:path'
									component={CollectionPage}
								/>
								<Route exact path='/contact' component={ContactPage} />
								<PrivateRoute exact path='/account' component={AccountPage} />
								<PrivateRoute
									exact
									path='/account/addresses'
									component={AddressesPage}
								/>
								<PrivateRoute
									exact
									path='/account/orders'
									component={OrderHistoryPage}
								/>

								<Route exact path='/account/login' component={LoginPage} />
								<Route
									exact
									path='/account/register'
									component={RegisterPage}
								/>
								<Route
									exact
									path='/account/recover'
									component={ForgotPassword}
								/>
								<Route
									exact
									path='/account/reset/:token'
									component={ResetPassword}
								/>
								<PrivateRoute exact path='/cart' component={CartPage} />
								<Redirect to='/404' />
							</Switch>
						</Suspense>
					</CustomerLayout>
				</Route>
			</Switch>
		</Router>
	);
}

export default Routes;
