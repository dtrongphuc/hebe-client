import React from 'react';
import ProductForm from 'admin/components/ProductForm/ProductForm';
import { Card, Form, message } from 'antd';
import { postNewProduct } from 'services/ProductApi';
import { useHistory } from 'react-router-dom';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

function AddProductPage() {
	const [form] = Form.useForm();
	let history = useHistory();
	const uploadFolder = 'products';

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });

		try {
			const { url } = await getUploadSignature(uploadFolder);
			const images = await uploadFileRequest(url, values.images);
			const response = await postNewProduct({ ...values, images: [...images] });
			if (response?.success) {
				message.success({ content: 'Thành công!', key, duration: 3 });
				history.push('/admin/product/all');
			}
		} catch (error) {
			message.error({ content: 'Có lỗi xảy ra!', key, duration: 3 });
		}
	};

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin/product/all');
	};

	return (
		<>
			<SubmitControl
				title='Add new product'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<Card title='Add new product' bordered={false}>
				<ProductForm form={form} onFinish={onFinish} />
			</Card>
		</>
	);
}

export default AddProductPage;
