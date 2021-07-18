import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import {
	Form,
	Input,
	Button,
	Row,
	Col,
	InputNumber,
	Select,
	message,
} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadImages from './UploadImage';
import { useEffect } from 'react';
import { getAllBrands } from 'services/BrandApi';
import { getAllCategories } from 'services/CategoryApi';
import VariantList from './Variants/VariantList';
import { postNewProduct } from 'services/ProductApi';

const initialValues = {
	layout: 'vertical',
	name: '',
	price: 0,
	salePrice: 0,
	images: [],
	variants: [],
	description: '',
};

function ProductForm() {
	const [form] = Form.useForm();
	const [files, setFiles] = useState({
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [],
		limit: 8,
	});
	const [brandList, setBrandList] = useState([]);
	const [categories, setCategories] = useState([]);

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

	// fetch collection list
	useEffect(() => {
		const fetchCollectionList = async () => {
			try {
				const { categories } = await getAllCategories();
				let options = categories.map(({ _id, name }) => ({
					label: name,
					value: _id,
				}));
				setCategories(options);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCollectionList();
	}, []);

	const setImages = (fileList) => {
		let images = fileList?.map((file) => file.response);
		form.setFieldsValue({ images });
	};

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await postNewProduct({ ...values });
			if (response?.success) {
				form.resetFields();
				setFiles((prevState) => ({
					...prevState,
					previewVisible: false,
					previewImage: '',
					previewTitle: '',
					fileList: [],
				}));
				message.success({ content: 'Thành công!', key, duration: 3 });
			}
		} catch (error) {
			message.error({ content: 'Có lỗi xảy ra!', key, duration: 3 });
		}
	};

	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={initialValues}
			onFinish={onFinish}
			onFinishFailed={({ values, errorFields, outOfDate }) =>
				console.log(values)
			}
		>
			<Form.Item
				name='name'
				label='Product name'
				rules={[{ required: true, message: 'Product name is required' }]}
			>
				<Input placeholder='Product name' />
			</Form.Item>
			<Row gutter={16}>
				<Col sm={24} md={12}>
					<Form.Item
						label='Brand'
						name='brand'
						rules={[{ required: true, message: 'Missing brand' }]}
					>
						<Select
							showSearch
							placeholder='Select a brand'
							options={brandList}
							optionFilterProp='label'
							filterOption={(input, option) =>
								option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
							}
						/>
					</Form.Item>
				</Col>
				<Col sm={24} md={12}>
					<Form.Item
						label='Category'
						name='category'
						rules={[{ required: true, message: 'Missing category' }]}
					>
						<Select
							showSearch
							placeholder='Select a category'
							options={categories}
							optionFilterProp='label'
							filterOption={(input, option) =>
								option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col sm={24} md={12}>
					<Form.Item
						name='price'
						label='Price'
						rules={[{ required: true, message: 'Price is required' }]}
					>
						<InputNumber
							formatter={(value) =>
								`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>
				</Col>
				<Col sm={24} md={12}>
					<Form.Item name='salePrice' label='Sale price'>
						<InputNumber
							formatter={(value) =>
								`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item noStyle>
				<Input hidden />
			</Form.Item>
			<Form.Item
				label='Description'
				name='description'
				rules={[{ required: true, message: 'Description is required' }]}
			>
				<div>
					<CKEditor
						style={{ height: 100 }}
						editor={ClassicEditor}
						data=''
						onChange={(event, editor) => {
							const data = editor.getData();
							form.setFieldsValue({
								description: data,
							});
						}}
					/>
				</div>
			</Form.Item>
			<Form.Item
				rules={[{ required: true, message: 'Missing variants' }]}
				label='Variants'
				name='variants'
			>
				<VariantList form={form} />
			</Form.Item>
			<Form.Item
				name='images'
				label='Images'
				rules={[{ required: true, message: 'Images is required' }]}
			>
				<UploadImages files={files} setFiles={setFiles} setImages={setImages} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

// ProductForm.propTypes = {

// }

export default ProductForm;
