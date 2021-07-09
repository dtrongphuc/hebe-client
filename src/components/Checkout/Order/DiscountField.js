import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField/TextField';
import { IoArrowForwardOutline } from 'react-icons/io5';
import './DiscountFieldStyles.scss';

function DiscountField(props) {
	return (
		<div className='order__discount'>
			<TextField placeholder='Gift card or discount code' />
			<button className='order__discount-submit order__discount-submit--disabled'>
				<IoArrowForwardOutline size='1.6em' />
			</button>
		</div>
	);
}

DiscountField.propTypes = {};

export default DiscountField;
