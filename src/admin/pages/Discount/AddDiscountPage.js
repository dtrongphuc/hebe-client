import React from 'react';
import { Form, message } from 'antd';
// import { useHistory } from 'react-router-dom';
import DiscountForm from 'admin/components/DiscountForm/DiscountForm';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

const initialFormValues = {
	code: '',
	discount_amount: 0,
	usage_limit: 100,
	description: '',
	status: true,
	one_per_customer: true,
	discount_type: 'fixed_amount',
	apply_to: 'entire_order',
	condition_customer_email: '',
	condition_customer_purchase: 0,
};

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

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		console.log('cancel');
	};

	return (
		<>
			<SubmitControl
				title='Add discount'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<DiscountForm
				form={form}
				initialFormValues={initialFormValues}
				onFinish={onFinish}
			/>
		</>
	);
}

export default AddDiscountPage;
