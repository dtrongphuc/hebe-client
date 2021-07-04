import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Path from './Path';
import Form from './Form/Form';
import SlideShow from './SlideShow';
import { getProductByPathName } from 'services/ProductApi';
import Wallet from './Wallet';
import './styles.scss';

export default function ProductDetail() {
	const [product, setProduct] = useState({});
	const { productPath } = useParams();

	useEffect(() => {
		(async function () {
			try {
				const response = await getProductByPathName(productPath);
				if (response) {
					setProduct(response);
				}
			} catch (error) {
				console.log(error.data);
			}
		})();
	}, [productPath]);

	return (
		<div className='product-page'>
			<Container fluid='lg'>
				<Path productName={product?.name} />
				<Row>
					<Col md={7}>
						<SlideShow images={product?.images} />
						<div className='pt-5'>
							<div
								className='product-page__content__description'
								dangerouslySetInnerHTML={{
									__html: product?.description,
								}}
							/>
						</div>
					</Col>
					<Col md={5}>
						<div className='product-page__content__wrapper'>
							<Wallet price={product?.price} />
							<div className='product-page__content'>
								<p className='product-page__content__brand'>
									{product?.brand?.name}
								</p>
								<h2 className='product-page__content__name'>{product?.name}</h2>

								<Form variants={product?.variants} price={product?.price} />
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
