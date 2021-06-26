import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/FormControl/Input';
import Button from 'components/FormControl/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import { login, loginThunk } from 'features/user/userSlice';
import { toast } from 'react-toastify';
import { parseErrors } from 'utils/util';
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
				toast.error('login failed');
			}
		}
	};

	const onInputChange = (e) => {
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
	};

	return (
		<CustomerLayout>
			<div className='container-lg'>
				<div className='row'>
					<div className='col-0 col-lg-3'></div>
					<div className='col-12 col-lg-6'>
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
									margin='14px 0'
									value={formState.email}
								/>
								<Input
									type='password'
									placeholder='Password'
									name='password'
									onChange={onInputChange}
									errorMessage={formState?.errors?.password}
									margin='14px 0'
									value={formState.password}
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
					<div className='col-0 col-lg-3'></div>
				</div>
			</div>
			<ModalLoading loading={isLoading} />
		</CustomerLayout>
	);
}
