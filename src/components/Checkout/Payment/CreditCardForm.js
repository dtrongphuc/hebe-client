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
				onChange={onChange}
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
						onChange={onChange}
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
						onChange={onChange}
					/>
				</div>
			</div>
		</div>
	);
}

// CreditCardForm.propTypes = {};

export default CreditCardForm;
