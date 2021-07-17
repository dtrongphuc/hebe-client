import React from 'react';
import VisaIcon from 'assets/img/visa.svg';
import MasterIcon from 'assets/img/mastercard.svg';
import AmericanExIcon from 'assets/img/americanexpress.svg';
import './styles.scss';
import CreditCardForm from './CreditCardForm';
import PaymentItem from './PaymentItem';
import LabelText from './LabelText';
import LabelImage from './LabelImage';
import Paypal from 'assets/img/paypal@2x.png';
import Afterpay from 'assets/img/afterpay.png';
import Zip from 'assets/img/zip.png';
import Laybuy from 'assets/img/laybuy.png';
import RedirectContent from './RedirectContent';
import { useDispatch, useSelector } from 'react-redux';
import { paymentMethodChange } from 'features/checkout/checkoutSlice';

const paymentMethods = [
	{
		name: 'credit-card',
		title: <LabelText text='Credit card' />,
		icons: [VisaIcon, MasterIcon, AmericanExIcon],
		content: <CreditCardForm />,
	},
	{
		name: 'paypal',
		title: <LabelImage src={Paypal} />,
		icons: [],
		content: <RedirectContent payment='Paypal' />,
	},
	{
		name: 'afterpay',
		title: <LabelImage src={Afterpay} />,
		icons: [],
		content: <RedirectContent payment='Afterpay' />,
	},
	{
		name: 'zip',
		title: <LabelImage src={Zip} />,
		icons: [VisaIcon, MasterIcon],
		content: <RedirectContent payment='Zip NZ' />,
	},
	{
		name: 'laybuy',
		title: <LabelImage src={Laybuy} />,
		icons: [VisaIcon, MasterIcon],
		content: <RedirectContent payment='Laybuy' />,
	},
];

function Payment(props) {
	const { paymentMethodSelected } = useSelector((state) => state.checkout);
	const dispatch = useDispatch();

	return (
		<div className='payment-wrapper'>
			{paymentMethods?.map((method) => (
				<PaymentItem
					key={method.name}
					name={method.name}
					title={method.title}
					icons={method.icons}
					content={method.content}
					checked={paymentMethodSelected === method.name}
					onChange={(e) => dispatch(paymentMethodChange(e.target.id))}
				/>
			))}
		</div>
	);
}

// Payment.propTypes = {};

export default Payment;
