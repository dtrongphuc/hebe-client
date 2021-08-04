import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import DiscountForm from 'admin/components/DiscountForm/DiscountForm';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';
import { getDiscountById, submitEditDiscount } from 'services/DiscountApi';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetDiscount,
	selectedProductsChange,
} from 'admin/reducers/discountSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function EditDiscountPage() {
	const [form] = Form.useForm();
	const [initialFormValues, setInitialFormValues] = useState({});
	const [loading, setLoading] = useState(false);
	const { selectedProducts } = useSelector((state) => state.discount);
	const dispatch = useDispatch();
	let { id } = useParams();
	let history = useHistory();

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getDiscountById(id);
				if (response?.success) {
					const { code, discountRule, description, status } = response.discount;

					const {
						value,
						usageLimit,
						onePerCustomer,
						valueType,
						customerSelection,
						productSelection,
						entitledProducts,
						prerequisiteCustomers,
						customerPurchase,
						startsAt,
						endsAt,
						targetType,
					} = discountRule;

					setInitialFormValues({
						code: code,
						discount_amount: value,
						usage_limit: usageLimit,
						description: description,
						status: status,
						one_per_customer: onePerCustomer,
						discount_type: valueType,
						apply_to:
							targetType === 'shipping_line'
								? 'shipping'
								: productSelection === 'entitled'
								? 'specific_products'
								: 'entire_order',
						condition_customer_email:
							customerSelection === 'prerequisite'
								? prerequisiteCustomers
										.map((customer) => customer.email)
										.join(', ')
								: '',
						date_range:
							startsAt && endsAt ? [moment(startsAt), moment(endsAt)] : null,
						condition_customer_purchase: customerPurchase,
					});

					dispatch(selectedProductsChange(entitledProducts || []));
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, [id, form, dispatch]);

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await submitEditDiscount({
				...values,
				target_products: [...selectedProducts],
				id,
			});
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				dispatch(resetDiscount());
				form.resetFields();

				setTimeout(() => history.push('/admin/discount/all'), 2000);
			}
		} catch (error) {
			console.log(error);
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
				title='Edit discount'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<DiscountForm
				form={form}
				initialFormValues={initialFormValues}
				onFinish={onFinish}
				loading={loading}
			/>
		</>
	);
}

export default EditDiscountPage;
