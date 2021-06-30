import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { productPriceString } from 'utils/util';
import { useState } from 'react';

export default function ProductItem({ product, fromPage }) {
	let history = useHistory();
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		console.log(product);
		let avt = product?.images.find((image) => image.position === 1);
		setAvatar(avt?.src);
	}, [product]);

	const productClicked = () => {
		history.push(`/frontpage/products/${product.path}`, {
			from: fromPage,
		});
	};

	return (
		<div className='product-item' onClick={productClicked}>
			<Link
				to={`/frontpage/products/${product.path}`}
				onClick={(e) => e.preventDefault()}
			>
				<img src={`${avatar}`} alt='' className='product-item__image' />
			</Link>
			<div className='product-item__description'>
				<Link to='#' className='product-item__category'>
					{product.brand.name}
				</Link>
				<p className='product-item__name'>{product.name}</p>
				<p className='price product-item__price'>
					{productPriceString(product?.price)}
				</p>
				{product.quantity === 0 && <i className='sold-out'>Sold Out</i>}
			</div>
		</div>
	);
}

ProductItem.propTypes = {
	product: PropTypes.object,
	wrappedBy: PropTypes.string,
};
