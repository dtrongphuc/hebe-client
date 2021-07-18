import AddProductPage from 'admin/pages/Product/AddProductPage';
import DashBoardPage from 'admin/pages/Dashboard/DashBoardPage';
import BannerPage from 'admin/pages/Settings/BannerPage';
import PickupLocationsPage from 'admin/pages/Settings/PickupLocationsPage';
import ShippingMethodsPage from 'admin/pages/Settings/ShippingMethodsPage';

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
		component: BannerPage,
		exact: true,
	},
	{
		path: '/admin/settings/pickup-locations',
		component: PickupLocationsPage,
		exact: true,
	},
	{
		path: '/admin/settings/shipping-methods',
		component: ShippingMethodsPage,
		exact: true,
	},
];

export default routes;
