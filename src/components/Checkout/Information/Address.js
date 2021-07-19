import React from 'react';
// import PropTypes from 'prop-types';
import './AddressStyles.scss';
import TextField from '../TextField/TextField';
import SelectField from '../SelectField/SelectField';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllAddressThunk,
	selectDefaultAddress,
} from 'features/address/addressSlice';
import { capitalize } from 'utils/util';
import {
	addressFieldChange,
	resetAddress,
	selectedAddressChange,
} from 'features/checkout/checkoutSlice';
import countries from 'utils/countries';

function Address() {
	const dispatch = useDispatch();
	const { addresses } = useSelector((state) => state.address);
	const { addressInfo, focused } = useSelector((state) => state.checkout);
	const defaultAddress = useSelector(selectDefaultAddress);

	useEffect(() => {
		(async () => {
			try {
				dispatch(await getAllAddressThunk());
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		if (defaultAddress) {
			const { _id, isDefault, ...payload } = defaultAddress;
			dispatch(selectedAddressChange({ ...payload }));
		}
	}, [dispatch, defaultAddress]);

	const onSavedAddressChange = (e) => {
		const { value } = e.target;
		if (value !== 'new-address') {
			let { _id, isDefault, ...selected } = addresses.find(
				(address) => address._id === value
			);

			dispatch(selectedAddressChange({ ...selected }));
		} else {
			dispatch(resetAddress());
		}
	};

	const handleInputChange = (rules) => (e) => {
		const field = {
			[e.target.name]: e.target.value,
		};
		let error = {
			[e.target.name]: rules?.required && !e.target.value ? rules?.msg : '',
		};

		dispatch(addressFieldChange({ field, error }));
	};

	const addressOptions = addresses
		?.map(({ _id, isDefault, firstname, lastname, ...rest }) => {
			const label = `${Object.values({ ...rest })
				.filter((value) => value !== '')
				.join(', ')} (${capitalize(firstname)} ${capitalize(lastname)})`;
			return {
				label,
				value: _id,
			};
		})
		?.concat([
			{
				label: 'Use a new address',
				value: 'new-address',
			},
		]);

	const countryOptions = countries.map((country) => ({
		label: country,
		value: country,
	}));

	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Shipping address</h2>
			<div className='mt-3'>
				<SelectField
					name='saved-address'
					placeholder='Saved addresses'
					options={addressOptions}
					defaultValue={defaultAddress?._id}
					onChange={onSavedAddressChange}
				/>
			</div>
			<div className='row mt-3'>
				<div className='col-12 col-md-6'>
					<div>
						<TextField
							placeholder='First name'
							name='firstname'
							focusedName={focused}
							value={addressInfo?.firstname}
							onChange={handleInputChange}
							rules={{ required: true, msg: 'Enter a first name' }}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='mt-3 mt-md-0'>
						<TextField
							placeholder='Last name'
							name='lastname'
							focusedName={focused}
							value={addressInfo?.lastname}
							onChange={handleInputChange}
							rules={{ required: true, msg: 'Enter a last name' }}
						/>
					</div>
				</div>
			</div>
			<div className='mt-3'>
				<TextField
					placeholder='Company (optional)'
					name='company'
					focusedName={focused}
					value={addressInfo?.company}
					onChange={handleInputChange}
				/>
			</div>
			<div className='mt-3'>
				<TextField
					placeholder='Address'
					name='address'
					focusedName={focused}
					value={addressInfo?.address}
					onChange={handleInputChange}
					rules={{ required: true, msg: 'Enter an address' }}
				/>
			</div>
			<div className='mt-3'>
				<TextField
					placeholder='Apartment, suite, etc. (optional)'
					name='apartment'
					focusedName={focused}
					value={addressInfo?.apartment}
					onChange={handleInputChange}
				/>
			</div>
			<div className='mt-3'>
				<TextField
					placeholder='City'
					name='city'
					focusedName={focused}
					value={addressInfo?.city}
					onChange={handleInputChange}
					rules={{ required: true, msg: 'Enter a city' }}
				/>
			</div>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className='mt-3'>
						<SelectField
							name='country'
							placeholder='Country/region'
							options={countryOptions}
							defaultValue={addressInfo?.country}
							onChange={handleInputChange}
							rules={{ required: true, msg: 'Enter a country' }}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='mt-3'>
						<TextField
							placeholder='Postal code'
							name='postal'
							focusedName={focused}
							value={addressInfo?.postal}
							onChange={handleInputChange}
							rules={{ required: true, msg: 'Enter a ZIP / postal code' }}
						/>
					</div>
				</div>
			</div>
			<div className='mt-3'>
				<TextField
					placeholder='Phone (optional)'
					name='phone'
					focusedName={focused}
					value={addressInfo?.phone}
					onChange={handleInputChange}
					rules={{ required: true, msg: 'Enter a phone' }}
				/>
			</div>
		</section>
	);
}

// Address.propTypes = {};

export default Address;
