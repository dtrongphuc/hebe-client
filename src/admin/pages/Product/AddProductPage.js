import React from 'react';
import ProductForm from 'admin/components/ProductForm/ProductForm';
import { Form, message } from 'antd';
import { postNewProduct } from 'services/ProductApi';
import { useHistory } from 'react-router-dom';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';

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

	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, margin: '16px 0' }}
		>
			<ProductForm form={form} onFinish={onFinish} />
		</div>
	);
}

export default AddProductPage;
