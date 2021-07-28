import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import BrandForm from 'admin/components/BrandForm/BrandForm';
import { getBrand, postEditBrand } from 'services/BrandApi';

function EditBrandPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);

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
			const response = await postEditBrand(path, values);
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/brand/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, margin: '16px 0' }}
		>
			{!loading && (
				<BrandForm
					form={form}
					defaultFileList={defaultFileList}
					onFinish={onFinish}
				/>
			)}
			<ModalLoading loading={loading} />
		</div>
	);
}

export default EditBrandPage;
