import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'components/AuthForm/Input';
import Button from 'components/AuthForm/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import './styles.scss';

function RegisterPage() {
	const [formState, setFormState] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	});

	const onSubmit = (e) => {
		e.preventDefault();
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
							<h3 className='auth-title'>Create Account</h3>
							<form onSubmit={onSubmit} className='auth-form'>
								<Input
									type='text'
									name='firstname'
									placeholder='First Name'
									value={formState.firstname}
									onChange={onInputChange}
								/>
								<Input
									type='text'
									name='lastname'
									placeholder='Last Name'
									value={formState.lastname}
									onChange={onInputChange}
								/>
								<Input
									type='email'
									name='email'
									placeholder='Email'
									value={formState.email}
									onChange={onInputChange}
								/>
								<Input
									type='password'
									name='password'
									placeholder='Password'
									value={formState.password}
									onChange={onInputChange}
								/>
								<Button>Create</Button>
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
		</CustomerLayout>
	);
}

export default RegisterPage;
