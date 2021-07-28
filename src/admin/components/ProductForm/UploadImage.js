import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
// 	getDestroySignature,
// 	getUploadSignature,
// } from 'services/CloudinaryApi';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

function UploadImages({ files, setFiles, defaultFileList }) {
	// const [cloud, setCloud] = useState({
	// 	folder: 'products',
	// 	uploadURL: '',
	// });

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const { url } = await getUploadSignature(cloud.folder);
	// 			if (url) {
	// 				setCloud((prevState) => ({
	// 					...prevState,
	// 					uploadURL: url,
	// 				}));
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, [cloud.folder]);

	const handleCancel = () =>
		setFiles((prevState) => ({ ...prevState, previewVisible: false }));

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setFiles((prevState) => ({
			...prevState,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		}));
	};

	const handleChange = ({ fileList }) => {
		setFiles((prevState) => ({ ...prevState, fileList }));
		// setImages(fileList);
	};

	// const uploadRequest = async (options) => {
	// 	const { onSuccess, onError, file, onProgress } = options;
	// 	const formData = new FormData();
	// 	formData.append('file', file);
	// 	const config = {
	// 		headers: {
	// 			'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
	// 		},
	// 		onUploadProgress: (event) => {
	// 			onProgress({ percent: (event.loaded / event.total) * 100 });
	// 		},
	// 	};
	// 	try {
	// 		const { data } = await axios.post(cloud.uploadURL, formData, config);
	// 		onSuccess({
	// 			url: data?.secure_url,
	// 			public_id: data?.public_id,
	// 		});
	// 	} catch (error) {
	// 		onError('Upload error');
	// 	}
	// };

	const handleRemove = async (file) => {
		// let publicId = file?.response?.public_id || file.public_id;
		// if (publicId) {
		// 	try {
		// 		const { url } = await getDestroySignature(publicId);

		// 		const response = await axios.post(url);
		// 		if (response.status === 200) {
		// 			return true;
		// 		}
		// 	} catch (error) {
		// 		console.log(error);
		// 		return false;
		// 	}
		// } else {
		setFiles((prevState) => {
			const index = prevState.fileList.indexOf(file);
			const newFileList = prevState.fileList.slice();
			newFileList.splice(index, 1);
			return {
				...prevState,
				fileList: newFileList,
			};
		});
	};

	const beforeUpload = (file) => {
		setFiles((prevState) => ({
			...prevState,
			fileList: [...prevState.fileList, file],
		}));

		return false;
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
				beforeUpload={beforeUpload}
				// action={cloud.uploadURL}
				// customRequest={uploadRequest}
				listType='picture-card'
				defaultFileList={defaultFileList}
				fileList={files.fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				onRemove={handleRemove}
			>
				{files.fileList.length >= files?.limit ? null : uploadButton}
			</Upload>
			<Modal
				visible={files.previewVisible}
				title={files.previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt='preview' style={{ width: '100%' }} src={files.previewImage} />
			</Modal>
		</>
	);
}

export default UploadImages;
