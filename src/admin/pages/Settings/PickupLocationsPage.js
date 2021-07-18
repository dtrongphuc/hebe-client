import React, { useEffect } from 'react';
import { Button, Divider, Form } from 'antd';
import { Typography } from 'antd';
import PickupLocationList from 'admin/components/PickupLocation/PickupLocationList';
import { getPickupLocations, putPickupLocations } from 'services/SettingApi';

const { Title } = Typography;

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

function PickupLocationsPage(props) {
	const [form] = Form.useForm();

	useEffect(() => {
		(async () => {
			try {
				const { locations } = await getPickupLocations();
				if (locations) {
					form.setFieldsValue({
						pickup_locations: mapLocationsToFields(locations),
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
			const response = await putPickupLocations(values);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const initialValues = {
		pickup_locations: [],
	};

	return (
		<Form
			layout='vertical'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
			initialValues={initialValues}
		>
			<Title level={3}>Pickup locations</Title>
			<Divider />
			<Form.Item
				rules={[{ required: true, message: 'Missing pickup locations' }]}
				label='Pickup locations'
				name='pickup_locations'
			>
				<PickupLocationList form={form} />
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

PickupLocationsPage.propTypes = {};

export default PickupLocationsPage;
