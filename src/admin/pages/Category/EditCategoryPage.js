import React from 'react';
import CategoryForm from 'admin/components/CategoryForm/CategoryForm';
import { Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategory, postEditCategory } from 'services/CategoryApi';
import { useState } from 'react';
import ModalLoading from 'components/ModalLoading/ModalLoading';

function EditCategoryPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);

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
			const response = await postEditCategory(path, values);
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
			style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
		>
			{!loading && (
				<CategoryForm
					form={form}
					defaultFileList={defaultFileList}
					onFinish={onFinish}
				/>
			)}
			<ModalLoading loading={loading} />
		</div>
	);
}

export default EditCategoryPage;