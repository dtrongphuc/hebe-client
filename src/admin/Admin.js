import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import AdminLayout from './layouts/AdminLayout';
import DashBoardPage from './pages/Dashboard/DashBoardPage';
import AddProductPage from './pages/AddProduct/AddProductPage';

const routes = [
	{
		path: '/admin',
		component: DashBoardPage,
		exact: true,
	},
	{
		path: '/admin/dashboard',
		component: DashBoardPage,
		exact: true,
	},
	{
		path: '/admin/product/add',
		component: AddProductPage,
		exact: false,
	},
];

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
