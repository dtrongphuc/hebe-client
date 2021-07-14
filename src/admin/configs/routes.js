import AddProductPage from 'admin/pages/Product/AddProductPage';
import DashBoardPage from 'admin/pages/Dashboard/DashBoardPage';
import SettingBannerPage from 'admin/pages/Settings/SettingBannerPage';
import SettingShippingPage from 'admin/pages/Settings/SettingShippingPage';

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
		path: '/admin/settings/banner',
		component: SettingBannerPage,
		exact: true,
	},
	{
		path: '/admin/settings/shipping',
		component: SettingShippingPage,
		exact: true,
	},
];

export default routes;
