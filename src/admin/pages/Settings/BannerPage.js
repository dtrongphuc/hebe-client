import React, { useState } from 'react';

import { Form, Input, Card, message, Select } from 'antd';
import UploadSingle from 'admin/components/UploadSingle/UploadSingle';
import { useEffect } from 'react';
import { getBanner, submitEditBanner } from 'services/SettingApi';
import { getUploadSignature } from 'services/CloudinaryApi';
import { uploadFileRequest } from 'utils/util';
import { getAllBrands } from 'services/BrandApi';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';
import { useHistory } from 'react-router-dom';

const BannerPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [brandList, setBrandList] = useState([]);
	let history = useHistory();

	useEffect(() => {
		const getBannerInfo = async () => {
			try {
				setLoading(true);
				const response = await getBanner();
				if (response?.success && response?.banner) {
					let { title, brand, image } = response.banner;
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
						brand: brand?._id,
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
				setBrandList(options);
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

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin');
	};

	return (
		<>
			<SubmitControl
				title='Banner'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
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
						label='Brands'
						name='brand'
						rules={[
							{
								required: true,
								message: 'Please enter a brand!',
							},
						]}
					>
						<Select
							showSearch
							placeholder='Select a brand'
							options={brandList}
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
				</Form>
			</Card>
		</>
	);
};

export default BannerPage;
