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

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/admin' component={Admin} />
				<Route
					exact
					path='/:path/products/:productPath'
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
				<Route exact path='/cart' component={CartPage} />
			</Switch>
		</Router>
	);
}

export default App;
