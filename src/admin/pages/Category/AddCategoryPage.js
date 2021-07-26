import React from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Form, message } from 'antd';
import { addNewCategory } from 'services/CategoryApi';

function AddCategoryPage() {
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await addNewCategory(values);
			if (response?.success) {
				form.resetFields();
				// setFileList([]);
				message.success({ content: 'Successful!', key, duration: 3 });
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
		>
			<CategoryForm form={form} onFinish={onFinish} />
		</div>
	);
}

export default AddCategoryPage;
