import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CollectionPage from './pages/Collection/CollectionPage';
import ContactPage from './pages/Contact/ContactPage';
import LoginPage from 'pages/Account/LoginPage';
import RegisterPage from 'pages/Account/RegisterPage';

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route exact path='/' component={HomePage} />
				{/* <Route path='/admin' component={Admin} /> */}
				<Route
					exact
					path='/:path/products/:productPath'
					component={ProductDetailPage}
				/>
				<Route path='/collections/:path' component={CollectionPage} />
				<Route path='/contact' component={ContactPage} />
				<Route path='/account/login' component={LoginPage} />
				<Route path='/account/register' component={RegisterPage} />
			</Switch>
		</Router>
	);
}

export default App;
