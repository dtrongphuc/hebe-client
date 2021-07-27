import React from 'react';
import ProductForm from 'admin/components/ProductForm/ProductForm';
import { Form, message } from 'antd';
import { postNewProduct } from 'services/ProductApi';
import { useHistory } from 'react-router-dom';

function AddProductPage() {
	const [form] = Form.useForm();
	let history = useHistory();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await postNewProduct({ ...values });
			if (response?.success) {
				message.success({ content: 'Thành công!', key, duration: 3 });
				history.push('/admin/product/all');
			}
		} catch (error) {
			message.error({ content: 'Có lỗi xảy ra!', key, duration: 3 });
		}
	};

	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
		>
			<ProductForm form={form} onFinish={onFinish} />
		</div>
	);
}

export default AddProductPage;
