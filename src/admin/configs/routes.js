import AddProductPage from 'admin/pages/Product/AddProductPage';
import DashBoardPage from 'admin/pages/Dashboard/DashBoardPage';
import BannerPage from 'admin/pages/Settings/BannerPage';
import PickupLocationsPage from 'admin/pages/Settings/PickupLocationsPage';
import ShippingMethodsPage from 'admin/pages/Settings/ShippingMethodsPage';
import AddCategoryPage from 'admin/pages/Category/AddCategoryPage';
import CategoryListPage from 'admin/pages/Category/CategoryListPage';
import EditCategoryPage from 'admin/pages/Category/EditCategoryPage';
import BrandListPage from 'admin/pages/Brands/BrandListPage';
import AddBrandPage from 'admin/pages/Brands/AddBrandPage';
import EditBrandPage from 'admin/pages/Brands/EditBrandPage';
import ProductListPage from 'admin/pages/Product/ProductListPage';
import EditProductPage from 'admin/pages/Product/EditProductPage';
import CustomerListPage from 'admin/pages/Customers/CustomersListPage';

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

	// CATEGORIES
	{
		path: '/admin/category/all',
		component: CategoryListPage,
		exact: true,
	},
	{
		path: '/admin/category/add',
		component: AddCategoryPage,
		exact: true,
	},
	{
		path: '/admin/category/edit/:path',
		component: EditCategoryPage,
	},

	//BRANDS
	{
		path: '/admin/brand/all',
		component: BrandListPage,
		exact: true,
	},
	{
		path: '/admin/brand/add',
		component: AddBrandPage,
		exact: true,
	},
	{
		path: '/admin/brand/edit/:path',
		component: EditBrandPage,
	},

	//PRODUCT
	{
		path: '/admin/product/all',
		component: ProductListPage,
		exact: false,
	},
	{
		path: '/admin/product/add',
		component: AddProductPage,
		exact: true,
	},
	{
		path: '/admin/product/edit/:path',
		component: EditProductPage,
	},

	//CUSTOMER
	{
		path: '/admin/customer/all',
		component: CustomerListPage,
	},
];

export default routes;
