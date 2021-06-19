import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from 'components/AuthForm/Input';
import Button from 'components/AuthForm/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import './styles.scss';
import { postLogin } from 'services/AccountApi';
import { login } from 'features/user/userSlice';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types'

export default function LoginPage() {
	const dispatch = useDispatch();
	const [pageState, setPageState] = useState({
		isLoading: false,
		error: '',
	});
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		console.log('submit');
		e.preventDefault();
		try {
			setPageState((prevState) => ({ ...prevState, isLoading: true }));
			const response = await postLogin(formState);
			if (response?.success) {
				dispatch(login());
			} else {
			}
		} catch (error) {
			setPageState((prevState) => ({ ...prevState, error: 'login failed' }));
			toast.error('login failed');
		} finally {
			setPageState((prevState) => ({ ...prevState, isLoading: false }));
		}
	};

	const onInputChange = (e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	};

	return (
		<CustomerLayout>
			<div className='container'>
				<div className='row'>
					<div className='col-0 col-md-4'></div>
					<div className='col-12 col-md-4'>
						<section className='auth-container'>
							<h3 className='auth-title'>Login</h3>
							<form action='#' className='auth-form' onSubmit={handleSubmit}>
								<Input
									type='email'
									placeholder='Email'
									name='email'
									value={formState.email}
									onChange={onInputChange}
								/>
								<Input
									type='password'
									placeholder='Password'
									name='password'
									value={formState.password}
									onChange={onInputChange}
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
		</CustomerLayout>
	);
}
