import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ModalLoading from 'components/ModalLoading/ModalLoading';

function AdminRoute({ component: Component, children, ...rest }) {
	const { isLogged, isLoading, role } = useSelector((state) => state.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogged === true && isLoading === false && role === 'admin' ? (
					Component ? (
						<Component {...props} />
					) : (
						children
					)
				) : (isLogged === false && isLoading === false) ||
				  (isLoading === false && role !== 'admin') ? (
					<Redirect
						to={{
							pathname: '/admin/login',
							state: {
								from: props.location,
							},
						}}
					/>
				) : (
					<ModalLoading loading={isLoading} />
				)
			}
		/>
	);
}

export default AdminRoute;
