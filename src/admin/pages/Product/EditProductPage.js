import React, { useState, useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { getProductByPathName, postEditProduct } from 'services/ProductApi';
import ProductForm from 'admin/components/ProductForm/ProductForm';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';

function EditProductPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);
	const uploadFolder = 'products';

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getProductByPathName(path);
				if (response?.success) {
					let {
						name,
						brand,
						category,
						price,
						salePrice,
						description,
						variants,
						images,
					} = response.product;

					images.map((image) =>
						setDefaultFileList((prevState) => [
							...prevState,
							{
								publicId: image.publicId,
								url: image.src,
								position: image.position,
								uid: image._id,
								name: image.publicId,
								status: 'done',
							},
						])
					);

					form.setFieldsValue({
						name,
						brand: brand._id,
						category: category._id,
						price,
						salePrice,
						description,
						variants,
						images,
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, [form, path]);

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const { url } = await getUploadSignature(uploadFolder);
			const images = await uploadFileRequest(url, values.images);
			const response = await postEditProduct(path, {
				...values,
				images: [...images],
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/product/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<Card title='Edit product' bordered={false} loading={loading}>
			<ProductForm
				form={form}
				defaultFileList={defaultFileList}
				onFinish={onFinish}
			/>
		</Card>
	);
}

export default EditProductPage;
