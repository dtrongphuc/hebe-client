import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import TextField from '../TextField/TextField';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Button from 'components/FormControl/Button';
import './DiscountFieldStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	applyDiscountThunk,
	setDiscountError,
} from 'features/checkout/checkoutSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function DiscountField(props) {
	const [value, setValue] = useState('');
	const { discount, discountError } = useSelector((state) => state.checkout);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setValue(e.target.value);
		if (discountError) {
			dispatch(setDiscountError(''));
		}
	};

	const onClick = async () => {
		if (value.length <= 0) return;

		try {
			const resultAction = await dispatch(applyDiscountThunk(value));
			unwrapResult(resultAction);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='order__discount'>
			<TextField
				placeholder='Gift card or discount code'
				value={value}
				onChange={onChange}
				error={discountError}
			/>
			<Button
				loading={discount.loading}
				classNames={`order__discount-submit ${
					value.length > 0 ? '' : 'order__discount-submit--disabled'
				}`}
				onClick={onClick}
			>
				<IoArrowForwardOutline size='1.4em' />
			</Button>
		</div>
	);
}

// DiscountField.propTypes = {};

export default DiscountField;
