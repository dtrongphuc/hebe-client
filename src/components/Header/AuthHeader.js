import { message } from 'antd';
import { logoutThunk } from 'features/user/userSlice';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export default function AuthHeader() {
	const { isLogged } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let history = useHistory();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			dispatch(await logoutThunk());
			history.push('/');
		} catch (error) {
			message.error('error');
		}
	};

	return (
		<div className='auth-header__wrapper'>
			<Container fluid='lg'>
				{!isLogged && (
					<ul className='auth-header'>
						<li>
							<Link to='/account/login'>LOG IN</Link>
						</li>
						<li>
							<Link to='/account/register'>CREATE ACCOUNT</Link>
						</li>
					</ul>
				)}
				{isLogged && (
					<ul className='auth-header'>
						<li>
							<Link to='/account'>MY ACCOUNT</Link>
						</li>
						<li>
							<Link to='/account/logout' onClick={handleLogout}>
								LOG OUT
							</Link>
						</li>
					</ul>
				)}
			</Container>
		</div>
	);
}
