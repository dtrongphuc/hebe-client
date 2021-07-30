import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import CustomerForm from 'admin/components/CustomerForm/CustomerForm';
import { getAccountById, submitEditAccount } from 'services/AccountApi';

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

	return (
		<div className='site-layout-background' style={{ margin: '16px 0' }}>
			{!loading && <CustomerForm form={form} onFinish={onFinish} />}
			<ModalLoading loading={loading} />
		</div>
	);
}

export default EditCustomerPage;
