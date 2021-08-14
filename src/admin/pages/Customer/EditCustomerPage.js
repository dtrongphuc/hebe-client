import React, { useState, useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import CustomerForm from 'admin/components/CustomerForm/CustomerForm';
import { getAccountById, submitEditAccount } from 'services/AccountApi';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

function EditCustomerPage() {
	const [form] = Form.useForm();
	let { id } = useParams();
	const [loading, setLoading] = useState(true);
	let history = useHistory();

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const response = await getAccountById(id);
				if (response?.success) {
					const { email, firstname, lastname, active } = response.account;

					form.setFieldsValue({
						email: email,
						first_name: firstname,
						last_name: lastname,
						active,
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, [form, id]);

	const onFinish = async (values) => {
		const key = 'submit';
		message.loading({ content: 'Loading...', key });
		try {
			const response = await submitEditAccount({ id, ...values });
			if (response?.success) {
				message.success({ content: 'Successful!', key, duration: 3 });
				history.push('/admin/customer/all');
			}
		} catch (error) {
			message.error({ content: 'Error!', key, duration: 3 });
		}
	};

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin/customer/all');
	};

	return (
		<>
			<SubmitControl
				title='Edit customer'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
				loading={loading}
			/>
			<Card title='Edit customer' bordered={false} loading={loading}>
				<CustomerForm form={form} onFinish={onFinish} />
			</Card>
		</>
	);
}

export default EditCustomerPage;
