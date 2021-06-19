import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CollectionPage from './pages/Collection/CollectionPage';
// import Contact from './pages/Contact/Index';
// // import Admin from './pages/Admin/Index';
// import Login from 'pages/Account/Login/Login';
// import Register from 'pages/Account/Register/Register';

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
				{/* <Route path='/contact' component={Contact} />
				<Route path='/account/login' component={Login} />
				<Route path='/account/register' component={Register} /> */}
			</Switch>
		</Router>
	);
}

export default App;
