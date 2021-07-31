import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Tag, Typography } from 'antd';
import { capitalize } from 'utils/util';

const { Text } = Typography;

function Delivery({ data, loading }) {
	const shipmentColumns = [
		{
			title: 'Status',
			dataIndex: 'shipmentStatus',
			render: (text) =>
				text === 'pending' ? (
					<Tag color='default'>Pending</Tag>
				) : text === 'delivering' ? (
					<Tag color='blue'>Delivering</Tag>
				) : (
					<Tag color='green'>Delivered</Tag>
				),
		},
		{
			title: 'Shipping method',
			dataIndex: ['shippingMethod', 'name'],
			key: 'shipping_method',
		},
		{
			title: 'Customer note',
		},
	];

	const pickupColumns = [
		{
			title: 'Status',
			dataIndex: 'shipmentStatus',
			render: (text) =>
				text === 'pending' ? (
					<Tag color='default'>Pending</Tag>
				) : text === 'delivering' ? (
					<Tag color='blue'>Delivering</Tag>
				) : (
					<Tag color='green'>Delivered</Tag>
				),
		},
		{
			title: 'Pickup location',
			dataIndex: ['pickupLocation', 'name'],
			key: 'pickup_location',
		},
		{
			title: 'Customer note',
		},
	];

	return (
		<Card title='Delivery' bordered={false} loading={loading}>
			<div>
				<Text strong>Delivery method: </Text>
				<span>{capitalize(data?.deliveryMethod || '')}</span>
			</div>
			{data?.deliveryMethod === 'shipment' && (
				<Table
					style={{ marginTop: 16 }}
					columns={shipmentColumns}
					dataSource={[data]}
					pagination={false}
					rowKey='deliveryMethod'
				/>
			)}
			{data?.deliveryMethod === 'pickup' && (
				<Table
					style={{ marginTop: 16 }}
					columns={pickupColumns}
					dataSource={[data]}
					pagination={false}
					rowKey='deliveryMethod'
				/>
			)}
		</Card>
	);
}

Delivery.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default Delivery;
