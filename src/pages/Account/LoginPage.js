import React from 'react';
import { Link } from 'react-router-dom';
import Input from 'components/AuthForm/Input';
import Button from 'components/AuthForm/Button';
import CustomerLayout from 'layouts/CustomerLayout';
import './styles.scss';
// import PropTypes from 'prop-types'

export default function LoginPage() {
	return (
		<CustomerLayout>
			<div className='container'>
				<div className='row'>
					<div className='col-0 col-md-4'></div>
					<div className='col-12 col-md-4'>
						<section className='auth-container'>
							<h3 className='auth-title'>Login</h3>
							<form action='#' className='auth-form'>
								<Input type='email' placeholder='Email' />
								<Input type='password' placeholder='Password' />
								<Button>Sign In</Button>
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
