import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import AdminLayout from './layouts/AdminLayout';
import routes from './configs/routes';

function Admin() {
	return (
		<AdminLayout>
			<Switch>
				{routes.map((route) => (
					<Route key={route.path} {...route} />
				))}
			</Switch>
		</AdminLayout>
	);
}

export default Admin;
