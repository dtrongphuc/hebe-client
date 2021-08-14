import React, { useState } from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Card, Form, message } from 'antd';
import { addNewCategory } from 'services/CategoryApi';
import { useHistory } from 'react-router-dom';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

function AddCategoryPage() {
	const [form] = Form.useForm();
	let history = useHistory();
  const [loading, setLoading] = useState(false);
	const uploadFolder = 'categories';

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
      setLoading(true);
			const { url } = await getUploadSignature(uploadFolder);
			const images = await uploadFileRequest(url, values.image);
			const response = await addNewCategory({ ...values, image: images[0] });
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/category/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
      setLoading(false);
		}
	};

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin/category/all');
	};

	return (
		<>
			<SubmitControl
				title='Add new category'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
        loading={loading}
			/>
			<Card title='Add new category' bordered={false}>
				<CategoryForm form={form} onFinish={onFinish} />
			</Card>
		</>
	);
}

export default AddCategoryPage;
