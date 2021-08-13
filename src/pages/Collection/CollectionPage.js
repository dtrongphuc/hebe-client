import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Sort from './Sort';
import ProductList from 'components/Products/ProductList';
import { getCollectionByPath } from 'services/CollectionAPI';
import { useParams } from 'react-router';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';

export default function CollectionPage() {
	const [info, setInfo] = useState({});
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState('best-selling');
	const [maxPage, setMaxPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const { path } = useParams();
	let fromPage = path.replaceAll('-', ' ').toUpperCase();
	let history = useHistory();

	useEffect(() => {
		const fetch = async () => {
			try {
				let response = await getCollectionByPath(path, {
					page: currentPage,
					limit: 21,
					sort: sort,
				});
				if (response?.success) {
					setInfo(response.info);
					setProducts(response.products);
					setMaxPage(response.pagination.max);
					setLoading(false);
				} else if (response.status === 404) {
					history.push('/404');
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, [path, history, sort, currentPage]);

	const onSortChange = (e) => {
		const selected = e.target.value;
		setSort(selected);
	};

	const onPageChange = (page) => () => {
		if (page !== currentPage) {
			setCurrentPage(page);
		}
	};

	return (
		<div className='collection-page'>
			<Hero
				title={info?.name}
				background={info?.image?.src}
				heroText={info?.description}
			/>
			<Sort onSortChange={onSortChange} selected={sort} />
			<ProductList products={products} fromPage={fromPage} loading={loading} />
			{maxPage > 1 && (
				<div className='container-lg'>
					<Pagination
						current={currentPage}
						max={maxPage}
						onChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}
