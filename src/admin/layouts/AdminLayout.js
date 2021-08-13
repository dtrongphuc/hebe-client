import LeftMenu from 'admin/components/LeftMenu/LeftMenu';
import { Button, Layout, message, Space, Tooltip, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './styles.scss';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logoutThunk } from 'features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function AdminLayout({ children }) {
	const dispatch = useDispatch();
	let history = useHistory();

	const handleLogout = async (e) => {
		try {
			await dispatch(logoutThunk());
			history.push('/admin/login');
		} catch (error) {
			message.error('error');
		}
	};

	return (
		<Layout>
			<Helmet>
				<title>Admin - Hebe Boutique</title>
			</Helmet>
			<Header
				style={{ position: 'fixed', zIndex: 1, width: '100%' }}
				className='admin-header'
			>
				<div className='logo' />
				<Space align='center'>
					<Text className='text'>dtrongphuc</Text>
					<Avatar size={32} icon={<UserOutlined />} />
					<Tooltip title='Logout' color='geekblue'>
						<Button
							icon={<LogoutOutlined />}
							type='link'
							onClick={handleLogout}
						/>
					</Tooltip>
				</Space>
			</Header>
			<Layout style={{ minHeight: 'calc(100vh - 64px)', marginTop: 64 }}>
				<Sider
					width={200}
					className='site-layout-background'
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
					}}
				>
					<LeftMenu />
				</Sider>
				<Layout
					style={{ padding: '0 24px 24px', marginLeft: 200 }}
					className='site-layout'
				>
					<Content
						style={{
							padding: '24px 0 0 0',
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
	children: PropTypes.any,
};

export default AdminLayout;
