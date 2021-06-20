import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/AuthForm/Input';
import Button from 'components/AuthForm/Button';
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
			const data = unwrapResult(response);
			handleSubmitResponse(data);
		} catch (error) {
			toast.error('login failed');
		}
	};

	const handleSubmitResponse = (payload) => {
		if (payload?.success) {
			dispatch(login());
			history.push('/account');
		} else {
			let { fieldsError, errors } = payload;
			if (fieldsError === 'input') {
				let inputError = parseErrors(errors);
				setFormState((prevState) => ({
					...prevState,
					errors: inputError,
				}));
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
			<div className='container'>
				<div className='row'>
					<div className='col-0 col-md-4'></div>
					<div className='col-12 col-md-4'>
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
								/>
								<Input
									type='text'
									name='lastname'
									placeholder='Last Name'
									onChange={onInputChange}
									errorMessage={formState?.errors?.lastname}
								/>
								<Input
									type='email'
									name='email'
									placeholder='Email'
									onChange={onInputChange}
									errorMessage={formState?.errors?.email}
								/>
								<Input
									type='password'
									name='password'
									placeholder='Password'
									onChange={onInputChange}
									errorMessage={formState?.errors?.password}
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
					<div className='col-0 col-md-4'></div>
				</div>
			</div>
			<ModalLoading loading={isLoading} />
		</CustomerLayout>
	);
}

export default RegisterPage;
