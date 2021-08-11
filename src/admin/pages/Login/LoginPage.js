import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import './styles.scss';
import { parseErrors } from 'utils/util';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, loginThunk } from 'features/user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function LoginPage() {
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	let history = useHistory();

	const onFinish = async (values) => {
		try {
			setLoading(true);
			let { email, password } = values;
			const response = await dispatch(loginThunk({ email, password }));
			unwrapResult(response);
			if (response?.success && response.role === 'admin') {
				dispatch(login());
				history.push('/admin');
			}
		} catch (error) {
			if (error.status === 422) {
				let { errors } = error;
				let inputError = parseErrors(errors);
				setErrors({
					...inputError,
				});
			} else {
				message.error('login failed');
			}
			console.clear();
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div
			className='admin-login-wrapper'
			style={{
				paddingTop: 100,
				background: '#2c3e50',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			<Card className='card'>
				<Form
					name='basic'
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 18,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label='Email'
						name='email'
						validateStatus={!errors?.email ? 'success' : 'error'}
						help={errors?.email}
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						validateStatus={!errors?.password ? 'success' : 'error'}
						help={errors?.password}
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 6,
							span: 18,
						}}
					>
						<Button type='primary' htmlType='submit' loading={loading}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

export default LoginPage;
