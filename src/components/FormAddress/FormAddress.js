import Input from 'components/FormControl/Input';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Select from 'components/FormControl/Select';
import CountryOptions from './CountryOptions';
import PropTypes from 'prop-types';
import {
	addNewAddress,
	editAddress,
	getAddressById,
} from 'services/AddressApi';
import { parseErrors } from 'utils/util';
import { toast } from 'react-toastify';
import ModalLoading from 'components/ModalLoading/ModalLoading';

const initialState = {
	firstname: '',
	lastname: '',
	company: '',
	address: '',
	city: '',
	country: 'Afghanistan',
	postal: '',
	phone: '',
	isDefault: false,
};

function FormAddress({ action, cancel, id, title }) {
	const [pageState, setPageState] = useState({
		loading: false,
	});
	const [formState, setFormState] = useState(initialState);
	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		company: '',
		address: '',
		city: '',
		country: '',
		postal: '',
		phone: '',
		isDefault: '',
	});

	useEffect(() => {
		if (action === 'edit' && !!id) {
			(async function () {
				try {
					const response = await getAddressById(id);
					setFormState((prevState) => ({ ...prevState, ...response?.address }));
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [action, id]);

	const onInputChange = (e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});

		setErrors((prevState) => {
			return {
				...prevState,
				[e.target.name]: '',
			};
		});
	};

	const onSelectChange = (e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onCheckedChange = (e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				isDefault: e.target.checked,
			};
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setPageState((prevState) => ({ ...prevState, loading: true }));
		try {
			if (action === 'add') {
				await addNewAddress(formState);
			} else if (action === 'edit') {
				let sendData = Object.assign({ _id: id }, formState);
				await editAddress(sendData);
			}
			window.location.reload();
		} catch (error) {
			console.log(error);
			if (error.status === 422) {
				let { errors } = error.data;
				let inputError = parseErrors(errors);
				setErrors((prevState) => ({
					...prevState,
					...inputError,
				}));
			} else {
				toast.error('failed');
			}
		} finally {
			setPageState((prevState) => ({ ...prevState, loading: false }));
		}
	};

	return (
		<form action='' className='address-form' onSubmit={onSubmit} method='POST'>
			<div className='row'>
				<div className='col-12'>
					<p className='account__col-title'>{title}</p>
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
							errorMessage={errors?.firstname}
							value={formState.firstname}
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
							errorMessage={errors?.lastname}
							value={formState.lastname}
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
							errorMessage={errors?.company}
							value={formState.company}
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
							errorMessage={errors?.address}
							value={formState.address}
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
							errorMessage={errors?.city}
							value={formState.city}
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
							value={formState.country}
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
							errorMessage={errors?.postal}
							value={formState.postal}
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
							errorMessage={errors?.phone}
							value={formState.phone}
						/>
					</div>
				</div>
			</div>
			<div className='form-group'>
				<input
					type='checkbox'
					name='isDefault'
					id='isDefault'
					className='mr-1'
					onChange={onCheckedChange}
				/>
				<label htmlFor='isDefault' className='address-checkbox-label'>
					Set as default address
				</label>
			</div>
			<button type='submit' className='btn-black'>
				{action === 'add' ? 'Add Address' : 'Edit Address'}
			</button>
			<Link
				className='account-text account-text--small account-link'
				to='#'
				onClick={cancel}
			>
				Cancel
			</Link>
			<hr />
			<ModalLoading loading={pageState.loading} />
		</form>
	);
}

FormAddress.propTypes = {
	action: PropTypes.oneOf(['add', 'edit']),
	cancel: PropTypes.func,
	id: PropTypes.string,
};

export default FormAddress;
