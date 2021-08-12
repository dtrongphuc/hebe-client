import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/FormControl/Input';
import Button from 'components/FormControl/Button';

import './styles.scss';
import { message } from 'antd';
import { forgotPassword } from 'services/AccountApi';

const initFormState = {
	email: '',
	error: '',
};

export default function ForgotPassword() {
	const [formState, setFormState] = useState(initFormState);
	const [loading, setLoading] = useState(false);
	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await forgotPassword(formState.email);
			if (response?.success) {
				history.push({
					pathname: '/account/login',
					state: {
						message: response?.message,
					},
				});
			}
		} catch (error) {
			if (error.status === 422) {
				let firstError = error.data.errors[0].msg;
				setFormState((prevState) => ({
					...prevState,
					error: firstError,
				}));
			} else {
				message.error('error');
			}
			setLoading(false);
		}
	};

	const onInputChange = (e) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
				error: '',
			};
		});
	};

	return (
		<div className='container-lg'>
			<div className='row'>
				<div className='col-0 col-lg-4'></div>
				<div className='col-12 col-lg-4'>
					<section className='auth-container'>
						<h3 className='auth-title'>Reset your password</h3>
						<p className='sub-title'>
							We will send you an email to reset your password.
						</p>
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
								errorMessage={formState?.error}
								margin='14px 0'
								value={formState.email}
							/>
							<Button
								loading={loading}
								type='submit'
								classNames='min-height-40'
							>
								Submit
							</Button>
						</form>
						<div className='auth__links'>
							<Link to='/account/login'>Cancel</Link>
						</div>
					</section>
				</div>
				<div className='col-0 col-lg-4'></div>
			</div>
		</div>
	);
}
