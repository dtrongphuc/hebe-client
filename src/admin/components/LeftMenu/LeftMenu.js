import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
	DashboardOutlined,
	SkinOutlined,
	SettingOutlined,
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
			theme='dark'
			defaultSelectedKeys={selectedKeys}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			onClick={onSelectedKeysChange}
			onOpenChange={onOpenChange}
			mode='inline'
		>
			<Menu.Item key='/admin' icon={<DashboardOutlined />}>
				Dashboard
			</Menu.Item>
			<SubMenu key='/admin/product' icon={<SkinOutlined />} title='Product'>
				<Menu.Item key='/admin/product/all'>All products</Menu.Item>
				<Menu.Item key='/admin/product/add'>Add product</Menu.Item>
			</SubMenu>
			<Menu.Item key='/admin/settings' icon={<SettingOutlined />}>
				Settings
			</Menu.Item>
		</Menu>
	);
}

export default LeftMenu;
