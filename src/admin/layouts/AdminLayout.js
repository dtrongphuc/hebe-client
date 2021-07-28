import LeftMenu from 'admin/components/LeftMenu/LeftMenu';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';

const { Header, Content, Sider } = Layout;

function AdminLayout({ children }) {
	return (
		<Layout>
			<Header
				style={{ position: 'fixed', zIndex: 1, width: '100%' }}
				className='admin-header'
			>
				<div className='logo' />
				<Menu theme='dark' mode='horizontal'></Menu>
			</Header>
			<Layout style={{ minHeight: 'calc(100vh - 64px)', marginTop: 64 }}>
				<Sider
					width={200}
					className='site-layout-background'
					style={{ position: 'fixed', minHeight: 'calc(100vh - 64px)' }}
				>
					<LeftMenu />
				</Sider>
				<Layout
					style={{ padding: '0 24px 24px', marginLeft: 200 }}
					className='site-layout'
				>
					<Content
						style={{
							padding: 24,
							margin: 0,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

AdminLayout.propTypes = {
	children: PropTypes.element,
};

export default AdminLayout;
