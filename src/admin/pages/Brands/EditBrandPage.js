import React, { useState, useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import BrandForm from 'admin/components/BrandForm/BrandForm';
import { getBrand, postEditBrand } from 'services/BrandApi';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

function EditBrandPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);
	const uploadFolder = 'brands';

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getBrand(path);
				if (response?.success) {
					let { name, image, description } = response.brand;

					setDefaultFileList([
						{
							uid: image.publicId,
							name: image.publicId,
							status: 'done',
							url: image.src,
							publicId: image.publicId,
						},
					]);

					form.setFieldsValue({
						name,
						image,
						description,
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
			const images = await uploadFileRequest(url, values.image);
			const response = await postEditBrand(path, {
				...values,
				image: images[0],
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/brand/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		console.log('cancel');
	};

	return (
		<>
			<SubmitControl
				title='Edit brand'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<Card title='Edit brand' bordered={false} loading={loading}>
				<BrandForm
					form={form}
					defaultFileList={defaultFileList}
					onFinish={onFinish}
				/>
			</Card>
		</>
	);
}

export default EditBrandPage;
