import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { getMaxPagination, getOrdersPagination } from 'services/OrderApi';
import OrderHistoryItem from './OrderHistoryItem';
import './OrderHistoryPageStyles.scss';

function OrderHistoryPage() {
	const [orderList, setOrderList] = useState([]);
	//page state
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const loader = useRef(null);

	useEffect(() => {
		let options = {
			root: null,
			rootMargin: '30px',
			threshold: 1.0,
		};

		//initialize IntersectionObserver
		const observer = new IntersectionObserver(handleObserver, options);
		//attaching to load more div
		if (loader.current) {
			observer.observe(loader.current);
		}
	});

	useEffect(() => {
		const maxPagination = async () => {
			try {
				const response = await getMaxPagination();
				if (response.success) {
					setMaxPage(response.maxPage);
				}
			} catch (error) {
				console.log(error);
			}
		};

		maxPagination();
	}, []);

	useEffect(() => {
		// fetch orders by page
		const fetchOrdersByPage = async () => {
			try {
				setLoading(true);
				const response = await getOrdersPagination(currentPage);
				if (response.success) {
					setOrderList((prevState) => [...prevState, ...response.orders]);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrdersByPage();
	}, [currentPage]);

	// when user scroll to load more div
	// update page state
	const handleObserver = (entities) => {
		const target = entities[0];
		if (target.isIntersecting && !loading && currentPage < maxPage) {
			setCurrentPage((prevState) => prevState + 1);
		}
	};

	return (
		<div className='container-lg'>
			<div className='order-history__container'>
				<div className='row'>
					<div className='col-12'>
						<div className='account-header'>
							<h2 className='account-title'>My account</h2>
						</div>
						<hr className='hr--small' />
					</div>
					<div className='col-12 mt-2'>
						<Link
							className='account-text account-text--small account-link'
							to='/account'
						>
							&#8592; Return to Account Details
						</Link>
					</div>
					<div className='col-12 mt-4'>
						<p className='account__col-title'>Order history</p>
					</div>
					{orderList?.map((order, index) => (
						<div
							key={order._id}
							className={`col-12 ${index > 0 ? 'mt-3' : ''}`}
						>
							<OrderHistoryItem order={order} />
						</div>
					))}

					{(currentPage < maxPage || loading) && (
						<div className='col-12'>
							<div className='load-more text-center' ref={loader}>
								<BeatLoader />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// OrderHistoryPage.propTypes = {

// }

export default OrderHistoryPage;
