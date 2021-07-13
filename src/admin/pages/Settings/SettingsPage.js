import React from 'react';

import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

const SettingsPage = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const props = {
		action: '//jsonplaceholder.typicode.com/posts/',
		listType: 'picture',
		previewFile(file) {
			console.log('Your upload file:', file);
			// Your process logic. Here we just mock to the same file
			return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
				method: 'POST',
				body: file,
			})
				.then((res) => res.json())
				.then(({ thumbnail }) => thumbnail);
		},
	};

	return (
		<Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<Title level={2}>Banner</Title>
			<Form.Item
				label='Banner image'
				name='banner-image'
				rules={[
					{
						required: true,
						message: 'Please upload a banner!',
					},
				]}
			>
				<Upload {...props}>
					<Button icon={<UploadOutlined />}>Upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item
				label='Title'
				name='banner-title'
				rules={[
					{
						required: true,
						message: 'Please input banner title!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default SettingsPage;
