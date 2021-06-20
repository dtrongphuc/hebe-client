import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AuthHeader() {
	const { isLogged } = useSelector((state) => state.user);

	return (
		<div className='auth-header__wrapper'>
			<Container>
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
							<Link to='/account/logout'>LOG OUT</Link>
						</li>
					</ul>
				)}
			</Container>
		</div>
	);
}
