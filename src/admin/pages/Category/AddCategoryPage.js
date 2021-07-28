import React from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Form, message } from 'antd';
import { addNewCategory } from 'services/CategoryApi';
import { useHistory } from 'react-router-dom';

function AddCategoryPage() {
	const [form] = Form.useForm();
	let history = useHistory();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await addNewCategory(values);
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/category/all');
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
			<CategoryForm form={form} onFinish={onFinish} />
		</div>
	);
}

export default AddCategoryPage;
