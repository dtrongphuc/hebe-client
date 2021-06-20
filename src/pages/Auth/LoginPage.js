import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/AuthForm/Input';
import Button from 'components/AuthForm/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import { login, loginThunk } from 'features/user/userSlice';
import { toast } from 'react-toastify';
import { parseErrors } from 'utils/util';
import _ from 'lodash';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { unwrapResult } from '@reduxjs/toolkit';

import './styles.scss';

const initFormState = {
	email: '',
	password: '',
	errors: {
		email: '',
		password: '',
	},
};

export default function LoginPage() {
	const { isLoading, error } = useSelector((state) => state.user);
	const [formState, setFormState] = useState(initFormState);
	const dispatch = useDispatch();
	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await dispatch(
				loginThunk({ email: formState.email, password: formState.password })
			);
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
							<h3 className='auth-title'>Login</h3>
							{error && (
								<Alert variant='danger' className='w-100 text-center'>
									{error}
								</Alert>
							)}
							<form
								action='#'
								className='auth-form'
								onSubmit={handleSubmit}
								autoComplete='off'
							>
								<Input
									type='email'
									placeholder='Email'
									name='email'
									onChange={onInputChange}
									errorMessage={formState?.errors?.email}
								/>
								<Input
									type='password'
									placeholder='Password'
									name='password'
									onChange={onInputChange}
									errorMessage={formState?.errors?.password}
								/>
								<Button type='submit'>Sign In</Button>
							</form>
							<div className='auth__links'>
								<Link to='/'>Return to Store</Link>
								<span>.</span>
								<Link to='/account/recover'>Forgot your password?</Link>
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