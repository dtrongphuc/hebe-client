import React, { useState } from 'react';

import { Form, Input, Button, Card } from 'antd';
import UploadSingle from 'admin/components/UploadSingle/UploadSingle';

const BannerPage = () => {
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card title='Banner' bordered={false} loading={loading}>
			<Form
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
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

				<Form.Item
					label='Tittle path'
					name='banner-path'
					rules={[
						{
							required: true,
							message: 'Please input path!',
						},
					]}
				>
					<Input />
				</Form.Item>

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
					<UploadSingle fileList={fileList} />
				</Form.Item>

				<Form.Item>
					<Button danger htmlType='button' style={{ marginRight: 16 }}>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default BannerPage;
