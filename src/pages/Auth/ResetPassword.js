import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Input from 'components/FormControl/Input';
import Button from 'components/FormControl/Button';
import { getEmailByToken, resetPassword } from 'services/AccountApi';
import { message } from 'antd';

import './styles.scss';
import { parseErrors } from 'utils/util';

const initFormState = {
	password: '',
	confirmPw: '',
	errors: {
		password: '',
		confirmPw: '',
	},
};

export default function ResetPassword() {
	const [formState, setFormState] = useState(initFormState);
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	let history = useHistory();
	let { token } = useParams();

	useEffect(() => {
		if (!token) {
			history.push('/account/login');
			return;
		}

		const fetch = async () => {
			try {
				const response = await getEmailByToken(token);
				if (response?.success) {
					setEmail(response.email);
				}
			} catch (error) {
				message.error('error');
				history.push('/account/login');
			}
		};

		fetch();
	}, [token, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await resetPassword({
				token,
				password: formState.password,
				confirmPw: formState.confirmPw,
			});

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
				let { errors } = error.data;
				let inputError = parseErrors(errors);
				setFormState((prevState) => ({
					...prevState,
					errors: inputError,
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
				<div className='col-0 col-lg-4'></div>
				<div className='col-12 col-lg-4'>
					<section className='auth-container'>
						<h3 className='auth-title'>Reset your password</h3>
						<p className='sub-title'>Enter a new password for {email}</p>
						<form
							action='#'
							className='auth-form'
							onSubmit={handleSubmit}
							autoComplete='off'
						>
							<Input
								type='password'
								placeholder='Password'
								name='password'
								onChange={onInputChange}
								errorMessage={formState?.errors?.password}
								margin='14px 0'
								value={formState.password}
							/>
							<Input
								type='password'
								placeholder='Confirm password'
								name='confirmPw'
								onChange={onInputChange}
								errorMessage={formState?.errors?.confirmPw}
								margin='14px 0'
								value={formState.confirmPw}
							/>
							<Button
								loading={loading}
								type='submit'
								classNames='min-height-40'
							>
								Reset Password
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
