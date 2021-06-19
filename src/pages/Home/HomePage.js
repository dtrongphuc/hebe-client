import React, { useEffect, useState } from 'react';
import HeroTop from './HeroTop';
import HeroBottom from './HeroBottom';
import ReviewList from 'components/Reviews/ReviewList';
import ProductList from 'components/Products/ProductList';
import CustomerLayout from 'layouts/CustomerLayout';

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
			}
		})();
	}, []);

	return (
		<CustomerLayout>
			<HeroTop />
			<section className='home__products'>
				<h2 className='home__products-title'>Featured Products</h2>
				{!pageState.isLoading && <ProductList products={products} />}
			</section>
			<HeroBottom />
			<ReviewList />
		</CustomerLayout>
	);
}
