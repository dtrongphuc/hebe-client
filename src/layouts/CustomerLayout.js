import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomerLayout({ children }) {
	return (
		<>
			<Header />
			<main className='main-page'>{children}</main>
			<Footer />
			<ToastContainer />
		</>
	);
}
