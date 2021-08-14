import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Path from './Path';
import Form from './Form/Form';
import SlideShow from './SlideShow';
import Wallet from './Wallet';
import './styles.scss';
import { Link } from 'react-router-dom';

export default function ProductDetail({ product }) {
	return (
		<div className='product-page'>
			<div className='background-gray'>
				<Container fluid='lg'>
					<Path productName={product?.name} />
					<Row>
						<Col md={7}>
							<SlideShow images={product?.images} />
						</Col>
						<Col md={5}>
							<div className='product-page__content__wrapper'>
								<Wallet
									price={product?.price}
									salePrice={
										product?.salePrice === 0 ? null : product?.salePrice
									}
								/>
								<div className='product-page__content'>
									<Link
										to={`/collections/${product.brand.path}`}
										className='product-page__content__brand'
									>
										{product.brand.name}
									</Link>
									<h2 className='product-page__content__name'>
										{product?.name}
									</h2>
									{product?.description.length <= 500 && (
										<div className='pt-3'>
											<div
												className='product-page__content__description text-center'
												dangerouslySetInnerHTML={{
													__html: product?.description,
												}}
											/>
										</div>
									)}
									<Form
										variants={product?.variants}
										price={
											product?.salePrice > 0
												? product.salePrice
												: product?.price
										}
										active={product.showing}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			{product?.description.length > 500 && (
				<div className='background-white'>
					<Container fluid='lg'>
						<Row>
							<Col>
								<div className='pt-5'>
									<div
										className='product-page__content__description'
										dangerouslySetInnerHTML={{
											__html: product?.description,
										}}
									/>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</div>
	);
}
