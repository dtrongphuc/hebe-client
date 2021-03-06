import React, { useEffect, useState } from 'react';
import HeroTop from './HeroTop';
import HeroBottom from './HeroBottom';
import ReviewList from 'components/Reviews/ReviewList';
import ProductList from 'components/Products/ProductList';

import { getFrontPageProducts } from 'services/ProductApi';
import './styles.scss';

export default function HomePage() {
	const [pageState, setPageState] = useState({
		isLoading: false,
		error: {
			content: '',
			code: '',
		},
	});

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				let productsData = await getFrontPageProducts();
				setProducts(productsData);
			} catch (error) {
				setPageState((prev) => {
					return {
						...prev,
						error: {
							content: error,
							code: '400',
						},
					};
				});
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<>
			<HeroTop />
			<section className='home__products'>
				<h2 className='home__products-title'>Featured Products</h2>
				{!pageState.isLoading && (
					<ProductList
						products={products}
						fromPage={{
							link: '/',
							title: 'HOME PAGE',
						}}
						loading={loading}
					/>
				)}
			</section>
			<HeroBottom />
			<ReviewList />
		</>
	);
}
