import React from 'react';
import { Button, Divider, Form } from 'antd';
import { Typography } from 'antd';
import ShippingMethodList from 'admin/components/ShippingMethod/ShippingMethodList';
import { getShippingMethods, putShippingMethods } from 'services/SettingApi';
import { useEffect } from 'react';

const { Title } = Typography;
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

	useEffect(() => {
		(async () => {
			try {
				const { shippingMethods } = await getShippingMethods();
				if (shippingMethods) {
					form.setFieldsValue({
						shipping_methods: mapShippingMethodsToFields(shippingMethods),
					});
				}
			} catch (error) {
				console.log(error);
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
		<Form
			layout='vertical'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
		>
			<Title level={3}>Shipping methods</Title>
			<Divider />

			<Form.Item
				rules={[{ required: true, message: 'Missing shipping methods' }]}
				label='Shipping methods'
				name='shipping_methods'
			>
				<ShippingMethodList form={form} />
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					danger
					htmlType='button'
					style={{ marginRight: 16 }}
				>
					Cancel
				</Button>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

// ShippingMethodsPage.propTypes = {

// }

export default ShippingMethodsPage;
