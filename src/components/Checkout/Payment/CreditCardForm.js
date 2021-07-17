import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
// import PropTypes from 'prop-types';

function CreditCardForm(props) {
	const onFocus = (e) => {
		const element = e.target.closest('.payment__input-wrapper');

		element.classList.add('active');
	};

	const onBlur = (e) => {
		const element = e.target.closest('.payment__input-wrapper');

		element.classList.remove('active');
	};

	return (
		<div className='payment-item__content-wrapper'>
			<div className='payment__input-wrapper'>
				<input
					type='text'
					name='card_number'
					placeholder='Card number'
					className='payment__credit-card__input'
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				<div className='payment__input-tooltip'>
					<OverlayTrigger
						placement='top'
						overlay={
							<Tooltip>All transaction are secure and encrypted.</Tooltip>
						}
					>
						<button type='button' className='payment__input-tooltip-btn'>
							<FaLock color='#919191' />
						</button>
					</OverlayTrigger>
				</div>
			</div>
			<div className='payment__input-wrapper'>
				<input
					type='text'
					name='card_name'
					placeholder='Name on card'
					className='payment__credit-card__input'
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</div>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className='payment__input-wrapper'>
						<input
							type='text'
							name='card_exp'
							placeholder='Expiration date(MM/YY)'
							className='payment__credit-card__input'
							onFocus={onFocus}
							onBlur={onBlur}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='payment__input-wrapper'>
						<input
							type='text'
							name='card_code'
							placeholder='Security code'
							className='payment__credit-card__input'
							onFocus={onFocus}
							onBlur={onBlur}
						/>
						<div className='payment__input-tooltip'>
							<OverlayTrigger
								placement='top'
								overlay={
									<Tooltip>All transaction are secure and encrypted.</Tooltip>
								}
							>
								<button type='button' className='payment__input-tooltip-btn'>
									<BsFillQuestionCircleFill color='#919191' />
								</button>
							</OverlayTrigger>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// CreditCardForm.propTypes = {};

export default CreditCardForm;
