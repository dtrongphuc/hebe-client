import React, { useEffect, useState } from 'react';
import AuthHeader from './AuthHeader';
import MobileNav from './MobileNav';
import Navbar from './Navbar';
import './styles.scss';
import { getCategoriesLink } from 'services/CategoryApi';
import { getBrandsLink } from 'services/BrandApi';

export default function Header() {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		const shopLinks = async () => {
			try {
				const [{ categories }, { brands }] = await Promise.all([
					getCategoriesLink(),
					getBrandsLink(),
				]);
				if (categories) {
					setCategories([...categories]);
				}
				if (brands) {
					setBrands([...brands]);
				}
			} catch (error) {
				console.log(error);
			}
		};

		shopLinks();
	}, []);

	return (
		<header className='header-fixed'>
			<AuthHeader />
			<Navbar categories={categories} brands={brands} />
			<MobileNav categories={categories} brands={brands} />
		</header>
	);
}
