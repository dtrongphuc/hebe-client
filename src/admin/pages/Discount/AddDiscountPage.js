import React from 'react';
import { Form, message } from 'antd';
// import { useHistory } from 'react-router-dom';
import DiscountForm from 'admin/components/DiscountForm/DiscountForm';

function AddDiscountPage() {
	const [form] = Form.useForm();
	// let history = useHistory();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		console.log(values);
		try {
			// const response = await addNewBrand({ ...values, image: images[0] });
			// if (response?.success) {
			// 	message.success({ content: 'Successful!', key, duration: 3 });
			// 	history.push('/admin/brand/all');
			// }
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	return <DiscountForm form={form} onFinish={onFinish} />;
}

export default AddDiscountPage;
