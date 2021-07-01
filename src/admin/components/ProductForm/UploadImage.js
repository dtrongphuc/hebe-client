import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { getSignature } from 'services/api';
import { generatePresignedUrl } from 'utils/util';
import axios from 'axios';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

function UploadImages() {
	const [state, setState] = useState({
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [
			{
				uid: '-1',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
			{
				uid: '-2',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
			{
				uid: '-3',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
			{
				uid: '-4',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
			{
				uid: '-xxx',
				percent: 50,
				name: 'image.png',
				status: 'uploading',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
			{
				uid: '-5',
				name: 'image.png',
				status: 'error',
			},
		],
	});
	const [signedUrl, setSignedUrl] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const { timestamp, signature, folder } = await getSignature('products');
				if (timestamp && signature) {
					let url = generatePresignedUrl(folder, timestamp, signature);
					setSignedUrl(url);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleCancel = () =>
		setState((prevState) => ({ ...prevState, previewVisible: false }));

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setState((prevState) => ({
			...prevState,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		}));
	};

	const handleChange = ({ fileList }) => {
		setState((prevState) => ({ ...prevState, fileList }));
	};

	const uploadRequest = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;

		const formData = new FormData();
		formData.append('file', file);
		const config = {
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
			},
			onUploadProgress: (event) => {
				onProgress({ percent: (event.loaded / event.total) * 100 });
			},
		};
		try {
			const { data } = await axios.post(signedUrl, formData, config);
			onSuccess({
				url: data?.secure_url,
				public_id: data?.public_id,
			});
			return;
		} catch (error) {
			onError('Upload error');
		}
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	return (
		<>
			<Upload
				action={signedUrl}
				customRequest={uploadRequest}
				listType='picture-card'
				fileList={state.fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{state.fileList.length >= 8 ? null : uploadButton}
			</Upload>
			<Modal
				visible={state.previewVisible}
				title={state.previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt='example' style={{ width: '100%' }} src={state.previewImage} />
			</Modal>
		</>
	);
}

export default UploadImages;
