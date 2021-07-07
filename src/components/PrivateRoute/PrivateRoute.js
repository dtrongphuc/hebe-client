import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ModalLoading from 'components/ModalLoading/ModalLoading';

function PrivateRoute({ component: Component, ...rest }) {
	const { isLogged, isLoading } = useSelector((state) => state.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogged === true && isLoading === false ? (
					<Component {...props} />
				) : isLogged === false && isLoading === false ? (
					<Redirect
						to={{
							pathname: '/account/login',
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

export default PrivateRoute;
