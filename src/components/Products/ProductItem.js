import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { priceString } from 'utils/util';
import { useState } from 'react';

export default function ProductItem({ product, fromPage }) {
	let history = useHistory();
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		let avt = product?.images.find((image) => image.position === 1);
		setAvatar(avt?.src);
	}, [product]);

	const productClicked = () => {
		history.push(`/products/${product.path}`, {
			from: fromPage,
		});
	};

	return (
		<div className='product-item' onClick={productClicked}>
			<Link
				to={`/products/${product.path}`}
				onClick={(e) => e.preventDefault()}
			>
				<img src={`${avatar}`} alt='' className='product-item__image' />
			</Link>
			<div className='product-item__description'>
				<Link
					to={`/collections/${product.brand.path}`}
					className='product-item__category'
				>
					{product.brand.name}
				</Link>
				<p className='product-item__name'>{product.name}</p>

				{product?.salePrice > 0 ? (
					<div>
						<span className='price product-item__price'>
							{priceString(product.salePrice)}
						</span>
						<span className='mx-1'></span>
						<span
							className='price product-item__price font-stroke'
							style={{ color: 'rgba(0,0,0,.5)' }}
						>
							{priceString(product.price)}
						</span>
					</div>
				) : (
					<p className='price product-item__price'>
						{priceString(product?.price)}
					</p>
				)}
				{product.quantity === 0 && <i className='sold-out'>Sold Out</i>}
			</div>
		</div>
	);
}

ProductItem.propTypes = {
	product: PropTypes.object,
	fromPage: PropTypes.string,
};
