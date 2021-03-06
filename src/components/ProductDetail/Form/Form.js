import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import InputQuantity from './InputQuantity';
import ButtonAddToCart from './ButtonAddToCart';
import { addToCart } from 'services/CartApi';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartThunk } from 'features/cart/cartSlice';
import { useHistory } from 'react-router-dom';

function Form({ variants, price, active }) {
	const [selected, setSelected] = useState(null);
	const [currentInputQuantity, setCurrentInputQuantity] = useState(null);
	const [cartPrice, setCartPrice] = useState(null);
	const [loading, setLoading] = useState(false);
	const { isLogged } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(() => {
		// find first variant available (stock > 0)
		let variantAvailable = variants?.find((variant) => variant.stock > 0);

		if (typeof variantAvailable !== 'undefined') {
			// find first size available (quantity > 0)
			let detailSelected = variantAvailable.details?.find(
				(detail) => detail.quantity > 0
			);

			setSelected({
				variant: {
					_id: variantAvailable._id,
					color: variantAvailable.color,
				},
				details: variantAvailable?.details || null,
				detailSelected: detailSelected || null,
				stock: variantAvailable.freeSize
					? variantAvailable.stock
					: detailSelected?.quantity,
			});
		} else {
			let firstVariant = variants[0];
			let firstDetail = !firstVariant.freeSize ? firstVariant.details[0] : null;
			setSelected({
				variant: {
					_id: firstVariant._id,
					color: firstVariant.color,
				},
				details: firstVariant?.details || null,
				detailSelected: firstDetail,
				stock: 0,
			});
		}

		setCurrentInputQuantity(1);
	}, [variants]);

	// quantity changed => change cart price
	useEffect(() => {
		setCartPrice(currentInputQuantity * price);
	}, [currentInputQuantity, price]);

	const onColorChange = (e) => {
		let value = e.target.value;
		if (!value) return;

		let variant = variants.find((variant) => variant._id === value);
		let detailSelected = variant.details?.find((detail) => detail.quantity > 0);

		setSelected((prevState) => ({
			...prevState,
			variant: {
				_id: variant._id,
				color: variant.color,
			},
			details: variant?.details || null,
			detailSelected: detailSelected || null,
			stock: variant.freeSize ? variant.stock : detailSelected?.quantity,
		}));
	};

	const onSizeChange = (e) => {
		let value = e.target.value;
		if (!value) return;
		let detailSelected = selected.details.find(
			(detail) => detail._id === value
		);
		setSelected((prevState) => ({
			...prevState,
			detailSelected: detailSelected || null,
			stock: detailSelected?.quantity || 0,
		}));
	};

	const handleIncrease = () => {
		if (currentInputQuantity < selected.stock) {
			setCurrentInputQuantity((prevState) => prevState + 1);
		}
	};

	const handleDecrease = () => {
		if (currentInputQuantity > 1) {
			setCurrentInputQuantity((prevState) => prevState - 1);
		}
	};

	const onQuantityChange = (e) => {
		let value = e.target.value;
		if (!value) return;
		if (+value > selected.stock || +value <= 0) return;

		setCurrentInputQuantity(+value);
	};

	const handleAddToCart = async (e) => {
		e.preventDefault();
		if (!isLogged) {
			history.push('/account/login');
			return;
		}
		setLoading(true);
		try {
			let cart = {
				_id: selected.variant._id,
				sku: selected.detailSelected?._id,
				quantity: currentInputQuantity,
			};
			const response = await addToCart(cart);
			if (response?.success) {
				await dispatch(fetchCartThunk());
				message.success({
					content: 'Added to cart!',
					duration: 2,
				});
			}
		} catch (error) {
			console.log(error);
			message.error({
				content: 'Error, try again later!',
				duration: 2,
			});
		} finally {
			setLoading(false);
		}
	};

	// OPTIONS
	const colorOptions = variants?.map((variant) => ({
		label: variant.color,
		value: variant._id,
	}));

	const sizeOptions =
		selected?.details?.map((detail) => ({
			label: detail.size,
			value: detail._id,
		})) || [];

	return (
		<>
			<form
				action='#'
				className='product-page__form'
				onSubmit={handleAddToCart}
			>
				{selected?.details && (
					<Select
						name='size'
						options={sizeOptions}
						value={selected?.detailSelected._id}
						onChange={onSizeChange}
					/>
				)}

				<Select
					name='color'
					options={colorOptions}
					value={selected?.variant._id}
					onChange={onColorChange}
				/>
				<InputQuantity
					increase={handleIncrease}
					decrease={handleDecrease}
					onChange={onQuantityChange}
					value={currentInputQuantity || 0}
					max={selected?.stock}
				/>
				<ButtonAddToCart
					price={cartPrice}
					quantity={currentInputQuantity}
					isSoldOut={selected?.stock === 0}
					active={active}
				/>
			</form>
			<ModalLoading loading={loading} />
		</>
	);
}

Form.propTypes = {
	variants: PropTypes.array,
	price: PropTypes.number,
	active: PropTypes.bool,
};

export default Form;
