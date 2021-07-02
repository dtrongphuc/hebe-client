import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Variants from './Variants';
import UploadImages from './UploadImage';

const { Option } = Select;

function ProductForm(props) {
	const [form] = Form.useForm();
	const [files, setFiles] = useState({
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [],
	});

	// select
	function onChange(value) {
		console.log(`selected ${value}`);
	}

	function onBlur() {
		console.log('blur');
	}

	function onFocus() {
		console.log('focus');
	}

	function onSearch(val) {
		console.log('search:', val);
	}

	return (
		<Form layout='vertical' form={form} initialValues={{ layout: 'vertical' }}>
			<Form.Item label='Product name'>
				<Input placeholder='Product name' />
			</Form.Item>
			<Row gutter={16}>
				<Col sm={24} md={12}>
					<Form.Item label='Brand'>
						<Select
							showSearch
							placeholder='Select a person'
							optionFilterProp='children'
							onChange={onChange}
							onFocus={onFocus}
							onBlur={onBlur}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value='jack'>Jack</Option>
							<Option value='lucy'>Lucy</Option>
							<Option value='tom'>Tom</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col sm={24} md={12}>
					<Form.Item label='Collection'>
						<Select
							showSearch
							placeholder='Select a person'
							optionFilterProp='children'
							onChange={onChange}
							onFocus={onFocus}
							onBlur={onBlur}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value='jack'>Jack</Option>
							<Option value='lucy'>Lucy</Option>
							<Option value='tom'>Tom</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col sm={24} md={12}>
					<Form.Item label='Price'>
						<InputNumber
							defaultValue={1000}
							formatter={(value) =>
								`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>
				</Col>
				<Col sm={24} md={12}>
					<Form.Item label='Sale price'>
						<InputNumber
							defaultValue={1000}
							formatter={(value) =>
								`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item label='Description'>
				<div>
					<CKEditor
						editor={ClassicEditor}
						data='<p>Hello from CKEditor 5!</p>'
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							console.log({ event, editor, data });
						}}
					/>
				</div>
			</Form.Item>
			<Form.Item label='Variants'>
				<Variants />
			</Form.Item>
			<Form.Item label='Images'>
				<UploadImages files={files} setFiles={setFiles} />
			</Form.Item>
			<Form.Item>
				<Button type='primary'>Submit</Button>
			</Form.Item>
		</Form>
	);
}

// ProductForm.propTypes = {

// }

export default ProductForm;
