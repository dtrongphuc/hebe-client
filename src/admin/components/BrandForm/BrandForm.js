import React from 'react';
import { Form, Button, Input, Space } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadSingle from '../UploadSingle/UploadSingle';
import { useState } from 'react';
import { useEffect } from 'react';

const initialValues = {
	layout: 'vertical',
};

function BrandForm({ form, defaultFileList = [], onFinish }) {
	const [fileList, setFileList] = useState([...defaultFileList]);

	useEffect(() => {
		if (fileList.length > 0) {
			form.setFieldsValue({ image: { ...fileList[0] } });
		} else {
			form.setFieldsValue({ image: null });
		}
	}, [fileList, form]);

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
				label='Brand name'
				rules={[{ required: true, message: 'Brand name is required' }]}
			>
				<Input placeholder='Brand name' />
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
						data={form?.getFieldValue('description')}
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
					folder='brands'
					fileList={fileList}
					setFileList={setFileList}
				/>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button danger htmlType='button'>
						Cancel
					</Button>

					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
}

export default BrandForm;
