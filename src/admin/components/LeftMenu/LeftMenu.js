import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
	DashboardOutlined,
	SkinOutlined,
	SettingOutlined,
	ContainerOutlined,
	TagOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

const rootSubmenuKeys = ['/admin/product'];

function LeftMenu() {
	const [selectedKeys, setSelectedKeys] = useState(null);
	const [openKeys, setOpenKeys] = useState([]);
	const location = useLocation();
	let history = useHistory();

	useEffect(() => {
		const path = location?.pathname;
		setSelectedKeys([path || '']);
	}, [location]);

	const onSelectedKeysChange = ({ key }) => {
		history.push(key);
	};

	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	return (
		<Menu
			mode='inline'
			defaultSelectedKeys={selectedKeys}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			onClick={onSelectedKeysChange}
			onOpenChange={onOpenChange}
		>
			<Menu.Item key='/admin' icon={<DashboardOutlined />}>
				Dashboard
			</Menu.Item>
			<SubMenu
				key='/admin/category'
				icon={<ContainerOutlined />}
				title='Category'
			>
				<Menu.Item key='/admin/category/all'>Categories</Menu.Item>
				<Menu.Item key='/admin/category/add'>Add category</Menu.Item>
			</SubMenu>
			<SubMenu key='/admin/brand' icon={<TagOutlined />} title='Brand'>
				<Menu.Item key='/admin/brand/all'>Brands</Menu.Item>
				<Menu.Item key='/admin/brand/add'>Add brand</Menu.Item>
			</SubMenu>
			<SubMenu key='/admin/product' icon={<SkinOutlined />} title='Product'>
				<Menu.Item key='/admin/product/all'>Products</Menu.Item>
				<Menu.Item key='/admin/product/add'>Add product</Menu.Item>
			</SubMenu>
			<Menu.Item key='/admin/customer/all' icon={<UserOutlined />}>
				Customers
			</Menu.Item>
			<SubMenu
				key='/admin/settings'
				icon={<SettingOutlined />}
				title='Settings'
			>
				<Menu.Item key='/admin/settings/banner'>Banner</Menu.Item>
				<Menu.Item key='/admin/settings/pickup-locations'>Locations</Menu.Item>
				<Menu.Item key='/admin/settings/shipping-methods'>Shipping</Menu.Item>
			</SubMenu>
		</Menu>
	);
}

export default LeftMenu;
