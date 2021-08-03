import React, { useState } from 'react';
import { Card, Form } from 'antd';
import ShippingMethodList from 'admin/components/ShippingMethod/ShippingMethodList';
import { getShippingMethods, putShippingMethods } from 'services/SettingApi';
import { useEffect } from 'react';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';

// import PropTypes from 'prop-types'

const mapShippingMethodsToFields = (methods) => {
	let result = methods?.map((method) => {
		const { name, price } = method;

		return {
			shipping_name: name,
			shipping_price: price,
		};
	});

	return result;
};

function ShippingMethodsPage() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { shippingMethods } = await getShippingMethods();
				if (shippingMethods) {
					form.setFieldsValue({
						shipping_methods: mapShippingMethodsToFields(shippingMethods),
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		})();
	}, [form]);

	const onFinish = async (values) => {
		console.log(values);
		try {
			const response = await putShippingMethods(values);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
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
				title='Shipping methods'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<Card title='Shipping methods' bordered={false} loading={loading}>
				<Form
					layout='vertical'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					form={form}
					initialValues={{
						shipping_methods: [],
					}}
				>
					<Form.Item
						rules={[{ required: true, message: 'Missing shipping methods' }]}
						label='Shipping methods'
						name='shipping_methods'
					>
						<ShippingMethodList form={form} />
					</Form.Item>
				</Form>
			</Card>
		</>
	);
}

// ShippingMethodsPage.propTypes = {

// }

export default ShippingMethodsPage;
