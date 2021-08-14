import React from 'react';
import { Card, Form, message } from 'antd';
import { addNewBrand } from 'services/BrandApi';
import BrandForm from 'admin/components/BrandForm/BrandForm';
import { useHistory } from 'react-router-dom';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';
import { useState } from 'react';

function AddBrandPage() {
	const [form] = Form.useForm();
	let history = useHistory();
	const [loading, setLoading] = useState(false);
	const uploadFolder = 'brands';

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			setLoading(true);
			const { url } = await getUploadSignature(uploadFolder);
			const images = await uploadFileRequest(url, values.image);
			const response = await addNewBrand({ ...values, image: images[0] });
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/brand/all');
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
		history.push('/admin/brand/all');
	};

	return (
		<>
			<SubmitControl
				title='Add new brand'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
				loading={loading}
			/>
			<Card title='Add new brand' bordered={false}>
				<BrandForm form={form} onFinish={onFinish} />
			</Card>
		</>
	);
}

export default AddBrandPage;
