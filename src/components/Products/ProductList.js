import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import './styles.scss';
import { BeatLoader } from 'react-spinners';

export default function ProductList({ products, fromPage, loading }) {
	return (
		<Container fluid='lg'>
			<Row className='justify-content-sm-start justify-content-center'>
				{loading === true && (
					<Col>
						<div className='load-more text-center pb-3'>
							<BeatLoader />
						</div>
					</Col>
				)}
				{loading === false && (!products || products.length === 0) && (
					<Col>
						<p>Sorry, there are no products in this collection</p>
					</Col>
				)}
				{!loading &&
					!!products &&
					Array.isArray(products) &&
					products.map((product) => (
						<Col xs={6} sm={4} key={product._id}>
							<ProductItem product={product} fromPage={fromPage} />
						</Col>
					))}
			</Row>
		</Container>
	);
}

ProductList.propTypes = {
	products: PropTypes.array,
};
