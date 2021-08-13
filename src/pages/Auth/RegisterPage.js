import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/FormControl/Input';
import Button from 'components/FormControl/Button';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { login, registerThunk } from 'features/user/userSlice';
import { parseErrors } from 'utils/util';
import { message } from 'antd';

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
	const { isLoading } = useSelector((state) => state.user);
	const [formState, setFormState] = useState(initFormState);
	const dispatch = useDispatch();
	let history = useHistory();

	const handleSubmit = async (e) => {
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
				message.error('error');
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
		<div className='container-lg'>
			<div className='row'>
				<div className='col-0 col-lg-3'></div>
				<div className='col-12 col-lg-6'>
					<section className='auth-container'>
						<h3 className='auth-title'>Create Account</h3>
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
								value={formState.firstname}
							/>
							<Input
								type='text'
								name='lastname'
								placeholder='Last Name'
								onChange={onInputChange}
								errorMessage={formState?.errors?.lastname}
								margin='14px 0'
								value={formState.lastname}
							/>
							<Input
								type='email'
								name='email'
								placeholder='Email'
								onChange={onInputChange}
								errorMessage={formState?.errors?.email}
								margin='14px 0'
								value={formState.email}
							/>
							<Input
								type='password'
								name='password'
								placeholder='Password'
								onChange={onInputChange}
								errorMessage={formState?.errors?.password}
								margin='14px 0'
								value={formState.password}
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
			<ModalLoading loading={isLoading} />
		</div>
	);
}

export default RegisterPage;
