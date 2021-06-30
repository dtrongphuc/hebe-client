import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { FileOutlined, SkinOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

// submenu keys of first level
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
function LeftMenu({ selectedKeys, onSelectedKeysChange }) {
	return (
		<Menu
			theme='dark'
			defaultOpenKeys={['product']}
			defaultSelectedKeys={['product/all']}
			selectedKeys={selectedKeys}
			onClick={onSelectedKeysChange}
			mode='inline'
		>
			<SubMenu key='product' icon={<SkinOutlined />} title='Product'>
				<Menu.Item key='product/all'>All products</Menu.Item>
				<Menu.Item key='product/add'>Add product</Menu.Item>
			</SubMenu>
			<Menu.Item key='9' icon={<FileOutlined />}>
				Files
			</Menu.Item>
		</Menu>
	);
}

LeftMenu.propTypes = {
	selectedKeys: PropTypes.array,
	onOpenChange: PropTypes.func,
};

export default LeftMenu;
