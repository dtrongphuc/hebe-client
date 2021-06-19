import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/Home/HomePage';
// import Product from './pages/Product/Index';
// import Collections from './pages/Collections/Collections';
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
				{/* <Route exact path='/:path/products/:productPath' component={Product} />
				<Route path='/collections/:path' component={Collections} />
				<Route path='/contact' component={Contact} />
				<Route path='/account/login' component={Login} />
				<Route path='/account/register' component={Register} /> */}
			</Switch>
		</Router>
	);
}

export default App;
