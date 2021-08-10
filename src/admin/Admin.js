import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import AdminLayout from './layouts/AdminLayout';
import routes from './configs/routes';
import LoginPage from './pages/Login/LoginPage';

function Admin() {
	return (
		<Switch>
			<Route exact path='/admin/login' component={LoginPage} />
			<AdminLayout>
				{routes.map((route) => (
					<Route key={route.path} {...route} />
				))}
			</AdminLayout>
		</Switch>
	);
}

export default Admin;
