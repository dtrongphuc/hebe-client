import {
	getShippingMethodsThunk,
	shippingMethodSelectedChange,
} from 'features/checkout/checkoutSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import './ShippingMethodStyles.scss';

const LoadingWrapper = ({ loading }) => {
	return (
		<div className={`shipping__loading-wrapper ${!loading && 'd-none'}`}>
			<PuffLoader color='#000' size={44} loading={loading} />
			<p>Get available shipping method</p>
		</div>
	);
};

function ShippingMethod() {
	const dispatch = useDispatch();
	const { shippingMethods, shippingMethodSelected } = useSelector(
		(state) => state.checkout
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getShippingMethods = async () => {
			setLoading(true);
			try {
				await dispatch(getShippingMethodsThunk());
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		getShippingMethods();
	}, [dispatch]);

	const onChange = (e) => {
		if (!e.target.value) return;

		dispatch(shippingMethodSelectedChange(e.target.value));
	};

	return (
		<div className='section-info'>
			<h2 className='section-info__heading'>Shipping method</h2>
			<LoadingWrapper loading={loading} />
			<div className='radio-content'>
				{!loading &&
					shippingMethods?.map((method, index) => (
						<div key={method._id} className='radio-wrapper'>
							<input
								type='radio'
								name='delivery'
								id={`shipping-method-${index + 1}`}
								value={method._id}
								className='checkout-radio'
								checked={shippingMethodSelected === method._id}
								onChange={onChange}
							/>
							<label
								htmlFor={`shipping-method-${index + 1}`}
								className='between'
							>
								<span className='light'>{method.name}</span>
								<span className='ship-price'>{method.displayPrice}</span>
							</label>
						</div>
					))}
			</div>
		</div>
	);
}

export default ShippingMethod;
