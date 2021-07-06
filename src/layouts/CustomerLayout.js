import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import { useEffect } from 'react';
import { isAuth } from 'services/AccountApi';
import { useDispatch } from 'react-redux';
import { login, logout } from 'features/user/userSlice';
import { fetchCartThunk } from 'features/cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function CustomerLayout({ children }) {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const isLoggedIn = await isAuth();
				if (isLoggedIn) {
					dispatch(login());
					const cartResponse = await dispatch(fetchCartThunk());
					unwrapResult(cartResponse);
				} else {
					dispatch(logout());
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch]);

	return (
		<>
			<Header />
			<main className='main-page'>{children}</main>
			<Footer />
			<ToastContainer />
		</>
	);
}
