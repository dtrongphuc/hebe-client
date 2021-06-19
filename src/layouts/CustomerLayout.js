import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function CustomerLayout({ children }) {
	return (
		<>
			<Header />
			<main className='main-page'>{children}</main>
			<Footer />
		</>
	);
}
