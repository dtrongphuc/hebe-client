import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import './styles.scss';

export default function ProductList({ products, fromPage }) {
	return (
		<Container fluid='lg'>
			<Row className='justify-content-lg-center justify-content-xs-center'>
				{!!products &&
					Array.isArray(products) &&
					products.map((product) => (
						<Col xs={12} sm={4} key={product._id}>
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
