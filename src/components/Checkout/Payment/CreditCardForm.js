import { onCardChange } from 'features/checkout/creditCardSlice';
import React from 'react';
import { FaLock } from 'react-icons/fa';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
// import PropTypes from 'prop-types';

function CreditCardForm(props) {
	const { card_name, card_number, card_code, card_exp } = useSelector(
		(state) => state.creditCard
	);
	const dispatch = useDispatch();

	const onChange = (e) => {
		dispatch(
			onCardChange({
				[e.target.name]: e.target.value,
			})
		);
	};

	const onCardNumberChange = (e) => {
		let regex = /^[0-9]{0,17}$/;

		if (!regex.test(e.target.value)) {
			return;
		}

		dispatch(
			onCardChange({
				[e.target.name]: e.target.value,
			})
		);
	};

	const onCardExpirationChange = (e) => {
		let regex1 = /^[0-9]{0,2}$/;
		let regex2 = /^(0[1-9]|1[0-2])\/?([0-9]{0,4})$/;
		let value = e.target.value;

		if (value.length <= 2) {
			if (!regex1.test(value)) {
				return;
			}
		}

		if (value.length === 2) {
			value = `${value}/`;
		}

		if (value.length > 2) {
			if (!regex2.test(value)) {
				return;
			}
		}

		dispatch(
			onCardChange({
				[e.target.name]: value,
			})
		);
	};

	const cardSecurityCodeChange = (e) => {
		let regex = /^[0-9]*$/;

		if (!regex.test(e.target.value)) {
			return;
		}

		dispatch(
			onCardChange({
				[e.target.name]: e.target.value,
			})
		);
	};

	return (
		<div className='payment-item__content-wrapper'>
			<Input
				type='text'
				name='card_number'
				placeholder='Card number'
				tooltip={{
					content: 'All transaction are secure and encrypted.',
					icon: <FaLock color='#919191' />,
				}}
				value={card_number}
				onChange={onCardNumberChange}
			/>
			<Input
				type='text'
				name='card_name'
				placeholder='Name on card'
				value={card_name}
				onChange={onChange}
			/>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<Input
						type='text'
						name='card_exp'
						placeholder='Expiration date(MM/YY)'
						value={card_exp}
						onChange={onCardExpirationChange}
					/>
				</div>
				<div className='col-12 col-md-6'>
					<Input
						type='text'
						name='card_code'
						placeholder='Security code'
						tooltip={{
							content:
								'3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.',
							icon: <BsFillQuestionCircleFill color='#919191' />,
						}}
						value={card_code}
						onChange={cardSecurityCodeChange}
					/>
				</div>
			</div>
		</div>
	);
}

// CreditCardForm.propTypes = {};

export default CreditCardForm;
