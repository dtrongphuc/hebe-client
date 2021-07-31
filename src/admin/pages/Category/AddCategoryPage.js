import React from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Card, Form, message } from 'antd';
import { addNewCategory } from 'services/CategoryApi';
import { useHistory } from 'react-router-dom';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';

function AddCategoryPage() {
	const [form] = Form.useForm();
	let history = useHistory();
	const uploadFolder = 'categories';

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const { url } = await getUploadSignature(uploadFolder);
			const images = await uploadFileRequest(url, values.image);
			const response = await addNewCategory({ ...values, image: images[0] });
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/category/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<Card title='Add new category' bordered={false}>
			<CategoryForm form={form} onFinish={onFinish} />
		</Card>
	);
}

export default AddCategoryPage;
