import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import TextField from '../TextField/TextField';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';
import Button from 'components/FormControl/Button';
import './DiscountFieldStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	applyDiscountThunk,
	clearDiscount,
} from 'features/checkout/checkoutSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function DiscountField() {
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	const { discount } = useSelector((state) => state.checkout);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setValue(e.target.value);
		if (error) {
			setError('');
		}
	};

	const onClick = async () => {
		if (value.length <= 0) return;

		try {
			const resultAction = await dispatch(applyDiscountThunk(value));
			unwrapResult(resultAction);
		} catch (error) {
			setError(Array.isArray(error) ? error[0]?.msg : error?.message);
		}
	};

	const onClear = () => {
		dispatch(clearDiscount());
		setValue('');
	};

	return (
		<div className='order__discount'>
			<div className='position-relative field-wrapper'>
				<TextField
					placeholder='Gift card or discount code'
					value={value}
					onChange={onChange}
					error={error}
				/>
				{discount?.applied && (
					<span className='clear' onClick={onClear}>
						<IoIosCloseCircle size='1.1em' />
					</span>
				)}
			</div>
			<Button
				loading={discount.loading}
				classNames={`order__discount-submit ${
					value.length > 0 && !discount?.applied
						? ''
						: 'order__discount-submit--disabled'
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
