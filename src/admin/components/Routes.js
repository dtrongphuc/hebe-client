import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import routes from '../configs/routes';
import LoginPage from '../pages/Login/LoginPage';
import AdminRoute from './AdminRoute/AdminRoute';

function Routes() {
	return (
		<Switch>
			<Route exact path='/admin/login' component={LoginPage} />
			<AdminRoute>
				<AdminLayout>
					<Switch>
						{routes.map((route) => (
							<AdminRoute key={route.path} {...route} />
						))}
					</Switch>
				</AdminLayout>
			</AdminRoute>
		</Switch>
	);
}

export default Routes;
