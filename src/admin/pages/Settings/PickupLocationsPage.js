import React, { useEffect } from 'react';
import { Card, Form } from 'antd';
import PickupLocationList from 'admin/components/PickupLocation/PickupLocationList';
import { getPickupLocations, putPickupLocations } from 'services/SettingApi';
import { useState } from 'react';
import SubmitControl from 'admin/components/SubmitControl/SubmitControl';
import { useHistory } from 'react-router-dom';

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

function PickupLocationsPage() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	let history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { locations } = await getPickupLocations();
				if (locations) {
					form.setFieldsValue({
						pickup_locations: mapLocationsToFields(locations),
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

	const onSubmitClick = () => {
		form.submit();
	};

	const onCancelClick = () => {
		history.push('/admin');
	};

	return (
		<>
			<SubmitControl
				title='Pickup locations'
				onSubmit={onSubmitClick}
				onCancel={onCancelClick}
			/>
			<Card title='Pickup locations' bordered={false} loading={loading}>
				<Form
					layout='vertical'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					form={form}
					initialValues={initialValues}
				>
					<Form.Item
						rules={[{ required: true, message: 'Missing pickup locations' }]}
						label='Pickup locations'
						name='pickup_locations'
					>
						<PickupLocationList form={form} />
					</Form.Item>
				</Form>
			</Card>
		</>
	);
}

export default PickupLocationsPage;
