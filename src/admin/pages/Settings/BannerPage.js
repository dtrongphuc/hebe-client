import React, { useState } from 'react';

import { Form, Input, Button, Card, message, Select } from 'antd';
import UploadSingle from 'admin/components/UploadSingle/UploadSingle';
import { useEffect } from 'react';
import { getBanner, submitEditBanner } from 'services/SettingApi';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import { getAllBrands } from 'services/BrandApi';

const BannerPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [collection, setCollection] = useState([]);

	useEffect(() => {
		const getBannerInfo = async () => {
			try {
				setLoading(true);
				const response = await getBanner();
				if (response?.success && response?.banner) {
					let { title, collection, image } = response.banner;
					setFileList([
						{
							uid: image.publicId,
							name: image.publicId,
							status: 'done',
							url: image.src,
						},
					]);

					form.setFieldsValue({
						title,
						collection,
						image,
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		getBannerInfo();
	}, [form]);

	// fetch brand list
	useEffect(() => {
		const fetchBrandList = async () => {
			try {
				const { brands } = await getAllBrands();
				let options = brands.map(({ _id, name }) => ({
					label: name,
					value: _id,
				}));
				setCollection(options);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBrandList();
	}, []);

	useEffect(() => {
		if (fileList.length > 0) {
			form.setFieldsValue({ image: fileList[0] });
		} else {
			form.setFieldsValue({ image: null });
		}
	}, [fileList, form]);

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const { url } = await getUploadSignature('settings');
			const images = await uploadFileRequest(url, values.image);
			const response = await submitEditBanner({
				...values,
				image: images[0],
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card title='Banner' bordered={false} loading={loading}>
			<Form
				form={form}
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Title'
					name='title'
					rules={[
						{
							required: true,
							message: 'Please enter a title',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Collection'
					name='collection'
					rules={[
						{
							required: true,
							message: 'Please enter a collection!',
						},
					]}
				>
					<Select
						showSearch
						placeholder='Select a collection'
						options={collection}
						optionFilterProp='label'
						filterOption={(input, option) =>
							option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					/>
				</Form.Item>

				<Form.Item
					label='Image'
					name='image'
					rules={[
						{
							required: true,
							message: 'Please upload a image!',
						},
					]}
				>
					<UploadSingle
						folder='settings'
						fileList={fileList}
						setFileList={setFileList}
					/>
				</Form.Item>

				<Form.Item>
					<Button danger htmlType='button' style={{ marginRight: 16 }}>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default BannerPage;
