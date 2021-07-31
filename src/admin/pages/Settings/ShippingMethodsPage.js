import React, { useState } from 'react';
import { Button, Card, Form } from 'antd';
import ShippingMethodList from 'admin/components/ShippingMethod/ShippingMethodList';
import { getShippingMethods, putShippingMethods } from 'services/SettingApi';
import { useEffect } from 'react';

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

	return (
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

				<Form.Item>
					<Button danger htmlType='button' style={{ marginRight: 16 }}>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

// ShippingMethodsPage.propTypes = {

// }

export default ShippingMethodsPage;
