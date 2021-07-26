import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Sort from './Sort';
import ProductList from 'components/Products/ProductList';
import { getCollectionByPath } from 'services/CollectionAPI';
import { useParams } from 'react-router';
import './styles.scss';

const BEST_SELLING = 'best-selling';
const PRICE_LOW_TO_HIGH = 'price-low-to-high';
const PRICE_HIGH_TO_LOW = 'price-high-to-low';

export default function CollectionPage() {
	const [info, setInfo] = useState({});
	const [products, setProducts] = useState([]);
	const { path } = useParams();
	let fromPage = path.replaceAll('-', ' ').toUpperCase();

	useEffect(() => {
		(async function () {
			try {
				let response = await getCollectionByPath(path);
				if (response) {
					setInfo(response.info);
					setProducts(response.products);
				}
			} catch (error) {
				console.log(error.data);
			}
		})();
	}, [path]);

	const onSortChange = (e) => {
		const selected = e.target.value;
		switch (selected) {
			case BEST_SELLING:
				let sellingProducts = [].concat(products).sort((product1, product2) => {
					let salePrice1 = product1.price - product1.salePrice;
					let salePrice2 = product2.price - product2.salePrice;

					return salePrice1 < salePrice2 ? -1 : salePrice1 > salePrice2 ? 1 : 0;
				});
				setProducts(sellingProducts);
				break;
			case PRICE_LOW_TO_HIGH:
				let lthProducts = [].concat(products).sort((product1, product2) => {
					let price1 = product1.price;
					let price2 = product2.price;

					return price1 < price2 ? -1 : price1 > price2 ? 1 : 0;
				});
				setProducts(lthProducts);
				break;
			case PRICE_HIGH_TO_LOW:
				let htlProducts = [].concat(products).sort((product1, product2) => {
					let price1 = product1.price;
					let price2 = product2.price;

					return price1 > price2 ? -1 : price1 < price2 ? 1 : 0;
				});
				setProducts(htlProducts);
				break;
			default:
				break;
		}
	};

	return (
		<div className='collection-page'>
			<Hero
				title={info?.name}
				background={info?.image?.src}
				heroText={info?.description}
			/>
			<Sort onSortChange={onSortChange} />
			<ProductList products={products} fromPage={fromPage} />
		</div>
	);
}
