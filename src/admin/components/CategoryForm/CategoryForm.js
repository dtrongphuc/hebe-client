import React from 'react';
// import PropTypes from 'prop-types';
import { Form, Button, Input, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadSingle from '../UploadSingle/UploadSingle';
import { useState } from 'react';
import { useEffect } from 'react';
import { addNewCategory } from 'services/CategoryApi';

const initialValues = {
	layout: 'vertical',
};

function CategoryForm(props) {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (fileList.length > 0) {
			if (fileList[0]?.response) {
				form.setFieldsValue({ image: fileList[0]?.response });
			}
		} else {
			form.setFieldsValue({ image: null });
		}

		console.log('effect');
	}, [fileList, form]);

	const onFinish = async (values) => {
		console.log(values);
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await addNewCategory(values);
			if (response?.success) {
				form.resetFields();
				setFileList([]);
				message.success({ content: 'Successful!', key, duration: 3 });
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
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
				label='Category name'
				rules={[{ required: true, message: 'Category name is required' }]}
			>
				<Input placeholder='Category name' />
			</Form.Item>

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
				name='image'
				label='Image'
				rules={[{ required: true, message: 'Image is required' }]}
			>
				<UploadSingle
					folder='categories'
					fileList={fileList}
					setFileList={setFileList}
				/>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

CategoryForm.propTypes = {};

export default CategoryForm;
