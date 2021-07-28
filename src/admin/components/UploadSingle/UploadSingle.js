import PropTypes from 'prop-types';
import { Upload, Space, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadSingle({ defaultFileList, fileList, setFileList }) {
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
	// 		return;
	// 	} catch (error) {
	// 		onError('Upload error');
	// 	}
	// };

	const handleRemove = async (file) => {
		// let publicId = file?.response?.public_id || file.uid;
		// try {
		// 	const { url } = await getDestroySignature(publicId);

		// 	const response = await axios.post(url);
		// 	if (response.status === 200) {
		// 		return true;
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// 	return false;
		// }

		setFileList([]);
	};

	const handleChange = ({ fileList }) => {
		setFileList([...fileList]);
	};

	const beforeUpload = (file) => {
		setFileList([file]);

		return false;
	};

	return (
		<Space direction='vertical' style={{ width: '100%' }} size='large'>
			<Upload
				// action={cloud.uploadURL}
				defaultFileList={defaultFileList}
				beforeUpload={beforeUpload}
				// customRequest={uploadRequest}
				listType='picture'
				fileList={fileList}
				maxCount={1}
				onRemove={handleRemove}
				onChange={handleChange}
			>
				<Button icon={<UploadOutlined />}>Upload</Button>
			</Upload>
		</Space>
	);
}

UploadSingle.propTypes = {
	folder: PropTypes.string.isRequired,
};

export default UploadSingle;
