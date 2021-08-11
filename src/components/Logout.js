import { message } from 'antd';
import { logoutThunk } from 'features/user/userSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Logout() {
	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				dispatch(await logoutThunk());
				history.push('/');
			} catch (error) {
				message.error('error');
			}
		})();
	}, [dispatch, history]);

	return <div></div>;
}

export default Logout;
