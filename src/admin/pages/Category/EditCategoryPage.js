import React from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Card, Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategory, postEditCategory } from 'services/CategoryApi';
import { useState } from 'react';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';

function EditCategoryPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);
	const uploadFolder = 'categories';

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getCategory(path);
				if (response?.success) {
					let { name, image, description } = response.category;

					setDefaultFileList([
						{
							uid: image.publicId,
							name: image.publicId,
							status: 'done',
							url: image.src,
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
			const response = await postEditCategory(path, {
				...values,
				image: images[0],
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/category/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<Card title='Edit category' bordered={false} loading={loading}>
			<CategoryForm
				form={form}
				defaultFileList={defaultFileList}
				onFinish={onFinish}
			/>
		</Card>
	);
}

export default EditCategoryPage;
