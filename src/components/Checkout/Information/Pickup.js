import {
	getPickupLocationsThunk,
	pickupLocationSelectedChange,
} from 'features/checkout/checkoutSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import './PickupStyles.scss';

const LoadingWrapper = ({ loading }) => {
	return (
		<div className={`pickup__loading-wrapper ${!loading && 'd-none'}`}>
			<PuffLoader color='#000' size={44} loading={loading} />
			<p>Get available pickup location</p>
		</div>
	);
};

function Pickup() {
	const dispatch = useDispatch();
	const { delivery, pickupLocations, pickupLocationSelected } = useSelector(
		(state) => state.checkout
	);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getLocations = async () => {
			setLoading(true);
			try {
				await dispatch(getPickupLocationsThunk());
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		if (delivery === 'pickup') {
			getLocations();
		}
	}, [delivery, dispatch]);

	const onChange = (e) => {
		if (!e.target.value) return;
		dispatch(pickupLocationSelectedChange(e.target.value));
	};

	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Pickup locations</h2>
			<LoadingWrapper loading={loading} />
			<div className='radio-content'>
				{!loading &&
					pickupLocations?.map((location, index) => (
						<div className='radio-wrapper' key={location._id}>
							<input
								type='radio'
								name='pickup_location'
								id={location._id}
								value={location._id}
								className='checkout-radio'
								checked={location._id === pickupLocationSelected}
								onChange={onChange}
							/>
							<label htmlFor={location._id} className='pickup-label'>
								<div className='d-flex align-items-center justify-content-between'>
									<span className='pickup-label__text'>{location.name}</span>
									<span className='pickup-label__text pickup-label__text--bold'>
										{location.displayPrice}
									</span>
								</div>
								<div className='row'>
									<div className='col-12 col-sm-8'>
										<span className='pickup-label__text pickup-label__text--sm'>
											{location.address}
										</span>
									</div>
									<div className='col-12 col-sm-4'>
										<span className='pickup-label__text pickup-label__text--sm text-sm-right d-block'>
											{location.instruction}
										</span>
									</div>
								</div>
							</label>
						</div>
					))}
			</div>
		</section>
	);
}

export default Pickup;
