import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { getProductByPathName, postEditProduct } from 'services/ProductApi';
import ProductForm from 'admin/components/ProductForm/ProductForm';

function EditProductPage() {
	const [form] = Form.useForm();
	let { path } = useParams();
	let history = useHistory();
	const [defaultFileList, setDefaultFileList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getProductByPathName(path);
				if (response?.success) {
					console.log(response.product);
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
								public_id: image.publicId,
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
			const response = await postEditProduct(path, values);
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/product/all');
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
				<ProductForm
					form={form}
					defaultFileList={defaultFileList}
					onFinish={onFinish}
				/>
			)}
			<ModalLoading loading={loading} />
		</div>
	);
}

export default EditProductPage;
