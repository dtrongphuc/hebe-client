import AddProductPage from 'admin/pages/Product/AddProductPage';
import DashBoardPage from 'admin/pages/Dashboard/DashBoardPage';
import SettingsPage from 'admin/pages/Settings/SettingsPage';

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
	{
		path: '/admin/settings',
		component: SettingsPage,
		exact: true,
	},
];

export default routes;
