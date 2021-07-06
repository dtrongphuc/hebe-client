import React from 'react';
import PropTypes from 'prop-types';
import { IoAddSharp, IoRemoveSharp, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { quantityChange, updateThunk } from 'features/cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
function CartItem({ item }) {
	const cartId = useSelector((state) => state.cart.shoppingCart?._id);
	const { product, variant, sku, quantity, total } = item;

	const dispatch = useDispatch();

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
		}
	};

	const handleDecrease = async () => {
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
		}
	};

	const handleQuantityChange = (e) => {
		const { value } = e.target;
		dispatch(
			quantityChange({
				itemId: item._id,
				quantity: value,
			})
		);
	};

	return (
		<div className='cart-item'>
			<div className='row h-100'>
				<div className='col-12 col-lg-8 my-auto'>
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
								<a href='/product' className='cart-text cart-text--bold'>
									{product.name}
								</a>
							</div>
							<div>
								<span className='cart-text cart-text--sm cart-text--blur text-uppercase'>
									{variant.color} / {sku.size}
								</span>
							</div>

							<div className='mt-3'>
								<a
									href='/brand'
									className='cart-text cart-text--sm cart-text--blur'
								>
									{product?.brand.name}
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-lg-4 my-auto'>
					<div className='d-flex align-items-center justify-content-between mt-4 mt-lg-0'>
						<div className='d-flex flex-column'>
							<p className='cart-text cart-text--sm text-center mb-2'>Price</p>
							<p className='cart-price'>{product.price}$</p>
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
									className='cart-quantity'
									value={quantity}
									onChange={handleQuantityChange}
								/>
								<div className='cart-quantity-control' onClick={handleIncrease}>
									<IoAddSharp size='1.2rem' color='#000' />
								</div>
							</div>
						</div>
						<div className='d-flex flex-column'>
							<p className='cart-text cart-text--sm text-center mb-2'>Total</p>
							<p className='cart-price'>{total}$</p>
						</div>
					</div>
				</div>
			</div>
			<button className='border-0 bg-transparent btn-cart-remove'>
				<IoClose size='1.6rem' color='#666666' />
			</button>
		</div>
	);
}

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;
