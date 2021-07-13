import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthThunk } from 'features/user/userSlice';
import { fetchCartThunk } from 'features/cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from 'admin/Admin';
import ScrollToTop from 'components/ScrollToTop';
import HomePage from 'pages/Home/HomePage';
import ProductDetailPage from 'pages/ProductDetail/ProductDetailPage';
import CollectionPage from 'pages/Collection/CollectionPage';
import ContactPage from 'pages/Contact/ContactPage';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import AccountPage from 'pages/Account/AccountPage';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import AddressesPage from 'pages/Addresses/AddressesPage';
import CartPage from 'pages/Cart/CartPage';
import InformationPage from 'pages/Checkout/InformationPage';
import CustomerLayout from 'layouts/CustomerLayout';
import CheckoutLayout from 'layouts/CheckoutLayout';
import ShippingPage from 'pages/Checkout/ShippingPage';

function Routes() {
	const dispatch = useDispatch();
	const { isLogged } = useSelector((state) => state.user);

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
				if (isLogged) {
					const cartResponse = await dispatch(fetchCartThunk());
					unwrapResult(cartResponse);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch, isLogged]);

	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<PrivateRoute exact path='/checkout/:path?'>
					<CheckoutLayout>
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
						</Switch>
					</CheckoutLayout>
				</PrivateRoute>

				<Route path='/admin/:path?' exact>
					<Switch>
						<Route path='/admin' component={Admin} />
					</Switch>
				</Route>

				<Route>
					<CustomerLayout>
						<Route exact path='/' component={HomePage} />
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
						<Route path='/collections/:path' component={CollectionPage} />
						<Route path='/contact' component={ContactPage} />
						<PrivateRoute exact path='/account' component={AccountPage} />
						<PrivateRoute
							exact
							path='/account/addresses'
							component={AddressesPage}
						/>
						<Route exact path='/account/login' component={LoginPage} />
						<Route exact path='/account/register' component={RegisterPage} />
						<PrivateRoute exact path='/cart' component={CartPage} />
					</CustomerLayout>
				</Route>
			</Switch>
		</Router>
	);
}

export default Routes;