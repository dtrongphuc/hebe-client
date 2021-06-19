import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

export default function CustomerLayout({ children }) {
	return (
		<>
			<Header />
			<main className='main-page'>{children}</main>
			<Footer />
		</>
	);
}
