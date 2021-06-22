import Input from 'components/FormControl/Input';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './styles.scss';
import Select from 'components/FormControl/Select';
import CountrySelect from './CountrySelect';
// import PropTypes from 'prop-types'

const initialState = {};

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
						<Input type='text' name='firstname' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12 col-sm-6'>
					<div className='form-group'>
						<label htmlFor='lastname' className='address-form__label'>
							Last Name
						</label>
						<Input type='text' name='lastname' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='company' className='address-form__label'>
							Company
						</label>
						<Input type='text' name='company' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='address' className='address-form__label'>
							Address
						</label>
						<Input type='text' name='address' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='city' className='address-form__label'>
							City
						</label>
						<Input type='text' name='city' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='country' className='address-form__label'>
							Country
						</label>
						<Select name='country'>
							<CountrySelect />
						</Select>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='postal' className='address-form__label'>
							Postal
						</label>
						<Input type='text' name='postal' onChange={onInputChange} />
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='form-group'>
						<label htmlFor='phone' className='address-form__label'>
							Phone
						</label>
						<Input type='text' name='phone' onChange={onInputChange} />
					</div>
				</div>
			</div>
			<div className='form-group'>
				<input type='checkbox' name='default' id='default' className='mr-1' />
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
