import { useState } from 'react';
import LeftMenu from 'admin/components/LeftMenu/LeftMenu';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = (collapsed) => {
		console.log(collapsed);
		setCollapsed(collapsed);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={onCollapse}
				className='admin-sider'
			>
				<div className='logo' />
				<LeftMenu />
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					{/* <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb> */}
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
}

AdminLayout.propTypes = {
	children: PropTypes.element,
};

export default AdminLayout;
