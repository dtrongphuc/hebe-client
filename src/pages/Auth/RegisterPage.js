import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/FormControl/Input';
import Button from 'components/FormControl/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import './styles.scss';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import { Alert } from 'react-bootstrap';
import { login, registerThunk } from 'features/user/userSlice';
import { parseErrors } from 'utils/util';

const initFormState = {
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	errors: {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	},
};

function RegisterPage() {
	const { isLoading, error } = useSelector((state) => state.user);
	const [formState, setFormState] = useState(initFormState);
	const dispatch = useDispatch();
	let history = useHistory();

	const handleSubmit = async (e) => {
		console.log('submit');
		e.preventDefault();
		try {
			const response = await dispatch(registerThunk(formState));
			unwrapResult(response);
			dispatch(login());
			history.push('/account');
		} catch (error) {
			if (error.status === 422) {
				let { errors } = error;
				let inputError = parseErrors(errors);
				setFormState((prevState) => ({
					...prevState,
					errors: inputError,
				}));
			} else {
				toast.error('register failed');
			}
		}
	};

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
		<CustomerLayout>
			<div className='container-lg'>
				<div className='row'>
					<div className='col-0 col-lg-3'></div>
					<div className='col-12 col-lg-6'>
						<section className='auth-container'>
							<h3 className='auth-title'>Create Account</h3>
							{error && (
								<Alert variant='danger' className='w-100 text-center'>
									{error}
								</Alert>
							)}
							<form
								onSubmit={handleSubmit}
								className='auth-form'
								autoComplete='off'
							>
								<Input
									type='text'
									name='firstname'
									placeholder='First Name'
									onChange={onInputChange}
									errorMessage={formState?.errors?.firstname}
									margin='14px 0'
								/>
								<Input
									type='text'
									name='lastname'
									placeholder='Last Name'
									onChange={onInputChange}
									errorMessage={formState?.errors?.lastname}
									margin='14px 0'
								/>
								<Input
									type='email'
									name='email'
									placeholder='Email'
									onChange={onInputChange}
									errorMessage={formState?.errors?.email}
									margin='14px 0'
								/>
								<Input
									type='password'
									name='password'
									placeholder='Password'
									onChange={onInputChange}
									errorMessage={formState?.errors?.password}
									margin='14px 0'
								/>
								<Button type='submit'>Create</Button>
							</form>
							<div className='auth__links'>
								<Link to='/'>Return to Store</Link>
								<span>.</span>
								<Link to='/account/login'>Log in</Link>
							</div>
						</section>
					</div>
					<div className='col-0 col-lg-3'></div>
				</div>
			</div>
			<ModalLoading loading={isLoading} />
		</CustomerLayout>
	);
}

export default RegisterPage;
