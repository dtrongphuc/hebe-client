import React from 'react';
import { Form, Button, Input, Space, Switch } from 'antd';

const initialValues = {
	layout: 'vertical',
};

function CustomerForm({ form, onFinish }) {
	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={initialValues}
			onFinish={onFinish}
			onFinishFailed={({ values, errorFields, outOfDate }) =>
				console.log(values)
			}
		>
			<Form.Item
				name='email'
				label='Email'
				rules={[{ required: true, message: 'Email is required' }]}
			>
				<Input placeholder='Email' />
			</Form.Item>
			<Form.Item
				name='first_name'
				label='First name'
				rules={[{ required: true, message: 'First name is required' }]}
			>
				<Input placeholder='First name' />
			</Form.Item>
			<Form.Item
				name='last_name'
				label='Last name'
				rules={[{ required: true, message: 'Last name is required' }]}
			>
				<Input placeholder='Last name' />
			</Form.Item>
			<Form.Item name='password' label='New password' hasFeedback>
				<Input.Password />
			</Form.Item>
			<Form.Item name='active' label='Is enabled ?' valuePropName='checked'>
				<Switch />
			</Form.Item>
			<Form.Item>
				<Space>
					<Button danger htmlType='button'>
						Cancel
					</Button>

					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
}

export default CustomerForm;
