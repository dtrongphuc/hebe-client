import React, { useState } from 'react';
import { Form, message } from 'antd';
// import { useHistory } from 'react-router-dom';
import DiscountForm from 'admin/components/DiscountForm/DiscountForm';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';
import { createDiscount } from 'services/DiscountApi';
import { useDispatch, useSelector } from 'react-redux';
import { resetDiscount } from 'admin/reducers/discountSlice';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
	code: '',
	discount_amount: 0,
	usage_limit: null,
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
	const { selectedProducts } = useSelector((state) => state.discount);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	let history = useHistory();

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			setLoading(true);

			const response = await createDiscount({
				...values,
				target_products: [...selectedProducts],
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				dispatch(resetDiscount());

				form.resetFields();
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		} finally {
			setLoading(false);
		}
	};

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin/discount/all');
	};

	return (
		<>
			<SubmitControl
				title='Add discount'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
				loading={loading}
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
