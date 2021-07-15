import React from 'react';
import { Button, Divider, Form } from 'antd';
import { Typography } from 'antd';
import PickupLocationList from 'admin/components/PickupLocation/PickupLocationList';
import ShippingMethodList from 'admin/components/ShippingMethod/ShippingMethodList';
import { getShippingSettings, putShippingSettings } from 'services/SettingApi';
import { useEffect } from 'react';

const { Title } = Typography;
// import PropTypes from 'prop-types'

const mapLocationsToFields = (locations) => {
	let result = locations?.map((location) => {
		const { name, price, address, instruction } = location;

		return {
			pickup_name: name,
			pickup_price: price,
			pickup_address: address,
			pickup_instruction: instruction,
		};
	});

	return result;
};

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

function SettingShippingPage() {
	const [form] = Form.useForm();

	useEffect(() => {
		(async () => {
			try {
				const response = await getShippingSettings();
				if (response.info) {
					const { locations, shippingMethods } = response.info;
					form.setFieldsValue({
						pickup_locations: mapLocationsToFields(locations),
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
			const response = await putShippingSettings(values);
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
			<Title level={3}>Shipping</Title>
			<Divider />
			<Form.Item
				rules={[{ required: true, message: 'Missing pickup locations' }]}
				label='Pickup locations'
				name='pickup_locations'
			>
				<PickupLocationList form={form} />
			</Form.Item>

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

// SettingShippingPage.propTypes = {

// }

export default SettingShippingPage;
