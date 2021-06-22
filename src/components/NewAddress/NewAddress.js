import Input from 'components/FormControl/Input';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './styles.scss';
import Select from 'components/FormControl/Select';
import CountryOptions from './CountryOptions';
// import PropTypes from 'prop-types'

const initialState = {
	firstname: '',
	lastname: '',
	company: '',
	address: '',
	city: '',
	country: '',
	postal: '',
	phone: '',
	default: false,
	errors: {
		firstname: '',
		lastname: '',
		company: '',
		address: '',
		city: '',
		country: '',
		postal: '',
		phone: '',
		default: '',
	},
};

function NewAddress(props) {
	const [formState, setFormState] = useState(initialState);

	const onInputChange = _.debounce((e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
				errors: {
					...prevState.errors,
					[e.target.name]: '',
				},
			};
		});
	}, 300);

	const onSelectChange = (e) => {
		console.log('select change');
		console.log(e.target.value);
	};

	const onCheckedChange = (e) => {
		console.log(e.target.checked);
		setFormState((prevState) => {
			return {
				...prevState,
				default: e.target.checked,
			};
		});
	};

	return (
		<form action='' className='address-form'>
			<div className='row'>
				<div className='col-12'>
					<p className='account__col-title'>Add a New Address</p>
				</div>
				<div className='col-12 col-sm-6'>
					<div className='form-group'>
						<label htmlFor='firstname' className='address-form__label'>
							First Name
						</label>
						<Input
							type='text'
							name='firstname'
							onChange={onInputChange}
							errorMessage={formState?.errors?.firstname}
						/>
					</div>
				</div>
				<div className='col-12 col-sm-6'>
					<div className='form-group'>
						<label htmlFor='lastname' className='address-form__label'>
							Last Name
						</label>
						<Input
							type='text'
							name='lastname'
							onChange={onInputChange}
							errorMessage={formState?.errors?.lastname}
						/>
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='company' className='address-form__label'>
							Company
						</label>
						<Input
							type='text'
							name='company'
							onChange={onInputChange}
							errorMessage={formState?.errors?.company}
						/>
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='address' className='address-form__label'>
							Address
						</label>
						<Input
							type='text'
							name='address'
							onChange={onInputChange}
							errorMessage={formState?.errors?.address}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='city' className='address-form__label'>
							City
						</label>
						<Input
							type='text'
							name='city'
							onChange={onInputChange}
							errorMessage={formState?.errors?.city}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='country' className='address-form__label'>
							Country
						</label>
						<Select
							name='country'
							onChange={onSelectChange}
							defaultValue='Afghanistan'
						>
							<CountryOptions />
						</Select>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='postal' className='address-form__label'>
							Postal
						</label>
						<Input
							type='text'
							name='postal'
							onChange={onInputChange}
							errorMessage={formState?.errors?.postal}
						/>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='phone' className='address-form__label'>
							Phone
						</label>
						<Input
							type='text'
							name='phone'
							onChange={onInputChange}
							errorMessage={formState?.errors?.phone}
						/>
					</div>
				</div>
			</div>
			<div className='form-group'>
				<input
					type='checkbox'
					name='default'
					id='default'
					className='mr-1'
					checked={formState.default}
					onChange={onCheckedChange}
				/>
				<label htmlFor='default' className='address-checkbox-label'>
					Set as default address
				</label>
			</div>
			<button type='submit' className='btn-black'>
				Add Address
			</button>
			<Link className='account-text account-text--small account-link' to='#'>
				Cancel
			</Link>
			<hr />
		</form>
	);
}

// NewAddress.propTypes = {

// }

export default NewAddress;
