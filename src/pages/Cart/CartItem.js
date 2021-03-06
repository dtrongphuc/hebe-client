import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoAddSharp, IoRemoveSharp, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { quantityChange, updateThunk } from 'features/cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { message } from 'antd';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { priceString } from 'utils/util';
import ModalLoading from 'components/ModalLoading/ModalLoading';
function CartItem({ item, invalidIndex }) {
	const cartId = useSelector((state) => state.cart.shoppingCart?._id);
	const { warning, loading } = useSelector((state) => state.cart);
	const { product, variant, sku, quantity, total } = item;

	// quantity before input lose focus
	const [oldQuantity, setOldQuantity] = useState(quantity);
	const cartItem = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (warning) {
			message.warning({ content: warning, duration: 3 });
		}
	}, [warning]);

	useEffect(() => {
		if (invalidIndex === 0 && !!cartItem.current) {
			cartItem.current.scrollIntoView();
		}
	}, [invalidIndex]);

	const handleIncrease = async () => {
		let state = {
			action_type: 1,
			info: {
				cart_id: cartId,
				item_id: item._id,
			},
			update: {
				old_quantity: quantity,
				quantity: quantity + 1,
			},
		};
		try {
			const response = await dispatch(updateThunk(state));
			unwrapResult(response);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const handleDecrease = async () => {
		if (quantity <= 1) return;

		let state = {
			action_type: 1,
			info: {
				cart_id: cartId,
				item_id: item._id,
			},
			update: {
				old_quantity: quantity,
				quantity: quantity - 1,
			},
		};
		try {
			const response = await dispatch(updateThunk(state));
			unwrapResult(response);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const onQuantityChange = (e) => {
		const { value } = e.target;
		const regex = /^[1-9][0-9]*$/;
		if (value.match(regex) !== null) {
			dispatch(
				quantityChange({
					itemId: item._id,
					quantity: value,
				})
			);
		}
	};

	const onQuantityBlur = async (e) => {
		const { value } = e.target;
		if (oldQuantity === value) return;

		let state = {
			action_type: 1,
			info: {
				cart_id: cartId,
				item_id: item._id,
			},
			update: {
				old_quantity: oldQuantity,
				quantity: value,
			},
		};
		try {
			const response = await dispatch(updateThunk(state));
			unwrapResult(response);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const handleRemove = async () => {
		let state = {
			action_type: 2,
			info: {
				cart_id: cartId,
				item_id: item._id,
			},
			update: {
				old_quantity: oldQuantity,
				quantity: quantity,
			},
		};
		try {
			const response = await dispatch(updateThunk(state));
			unwrapResult(response);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	return (
		<div ref={cartItem} className='cart-item'>
			<div className='row h-100'>
				<div className='col-12 col-lg-7 my-auto'>
					<div className='d-flex align-items-center'>
						<a href='/product' className='cart-link cart-image__wrapper'>
							<img
								src={product?.images[0].src}
								alt='product'
								className='cart-image__img'
							/>
						</a>
						<div className='mr-lg-4'>
							<div>
								<a
									href={`/products/${product.path}`}
									className='cart-text cart-text--bold'
								>
									{product.name}
								</a>
							</div>
							<div>
								<span className='cart-text cart-text--sm cart-text--blur text-uppercase'>
									{variant.color} {sku && '/ ' + sku.size}
								</span>
							</div>

							<div className='mt-3'>
								<a
									href={`/collections/${product?.brand?.path}`}
									className='cart-text cart-text--sm cart-text--blur'
								>
									{product?.brand.name}
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-lg-5 my-auto'>
					<div className='d-flex align-items-center justify-content-between mt-4 mt-lg-0'>
						<div className='d-flex flex-column'>
							<p className='cart-text cart-text--sm text-center mb-2'>Price</p>
							<div className='text-center'>
								<span className='cart-price'>
									{product.salePrice > 0
										? priceString(product.salePrice)
										: priceString(product.price)}
								</span>
							</div>
						</div>
						<div className='d-flex flex-column'>
							<p className='cart-text cart-text--sm text-center mb-2'>
								Quantity
							</p>
							<div className='d-flex align-items-center'>
								<div className='cart-quantity-control' onClick={handleDecrease}>
									<IoRemoveSharp size='1.2rem' color='#212529' />
								</div>
								<input
									type='text'
									className={`cart-quantity ${
										invalidIndex !== -1 ? 'invalid' : ''
									}`}
									value={quantity}
									onChange={onQuantityChange}
									onFocus={(e) => setOldQuantity(e.target.value)}
									onBlur={onQuantityBlur}
								/>
								<div className='cart-quantity-control' onClick={handleIncrease}>
									<IoAddSharp size='1.2rem' color='#000' />
								</div>
							</div>
						</div>
						<div className='d-flex flex-column'>
							<p className='cart-text cart-text--sm text-center mb-2'>Total</p>
							<p className='cart-price'>{priceString(total)}</p>
						</div>
					</div>
				</div>
			</div>
			<OverlayTrigger placement='top' overlay={<Tooltip>Remove</Tooltip>}>
				<button
					className='border-0 bg-transparent btn-cart-remove'
					onClick={handleRemove}
				>
					<IoClose size='1.6rem' color='#666666' />
				</button>
			</OverlayTrigger>
			<ModalLoading loading={loading} />
		</div>
	);
}

CartItem.propTypes = {
	item: PropTypes.object,
	invalid: PropTypes.number,
};

export default CartItem;
