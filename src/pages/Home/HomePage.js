import React, { useEffect, useState } from 'react';
import Hero from 'components/Header/Hero';
import HeroSection from 'components/HeroSection';
import ReviewList from 'components/Reviews/ReviewList';
import ProductList from 'components/Products/ProductList';
import CustomerLayout from 'layouts/CustomerLayout';

import { getFrontPageProducts } from 'services/ProductApi';
import './styles.scss';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async function () {
			try {
				let productsData = await getFrontPageProducts();
				setProducts(productsData);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<CustomerLayout>
			<Hero />
			<section className='home__products'>
				<h2 className='home__products-title'>Featured Products</h2>
				<ProductList products={products} />
			</section>
			<HeroSection />
			<ReviewList />
		</CustomerLayout>
	);
}
