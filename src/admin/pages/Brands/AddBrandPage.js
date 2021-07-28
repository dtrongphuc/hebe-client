import React from 'react';
import { Form, message } from 'antd';
import { addNewBrand } from 'services/BrandApi';
import BrandForm from 'admin/components/BrandForm/BrandForm';
import { useHistory } from 'react-router-dom';

function AddBrandPage() {
	const [form] = Form.useForm();
	let history = useHistory();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await addNewBrand(values);
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/brand/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, margin: '16px 0' }}
		>
			<BrandForm form={form} onFinish={onFinish} />
		</div>
	);
}

export default AddBrandPage;
