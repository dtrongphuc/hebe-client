import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Tag, Typography } from 'antd';
import { capitalize } from 'utils/util';

const { Text } = Typography;

function Payment({ data, loading }) {
	const columns = [
		{
			title: 'Payment status',
			dataIndex: 'paymentStatus',
			render: (text) =>
				text === 'pending' ? (
					<Tag color='default'>Pending</Tag>
				) : text === 'paid' ? (
					<Tag color='green'>Paid</Tag>
				) : (
					<Tag color='red'>Refunded</Tag>
				),
			key: 'payment_status',
		},
		{
			title: 'Payment method',
			dataIndex: 'paymentMethod',
			key: 'payment_method',
			render: (text) => capitalize(text || ''),
		},
	];

	return (
		<Card title='Payment' bordered={false} loading={loading}>
			<div>
				<Text strong>Payment method: </Text>
				<span>{capitalize(data?.paymentMethod || '')}</span>
			</div>
			{data && (
				<Table
					style={{ marginTop: 16 }}
					columns={columns}
					dataSource={[data]}
					pagination={false}
					rowKey={(record) => `${record.paymentMethod}-${record.paymentStatus}`}
				/>
			)}
		</Card>
	);
}

Payment.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default Payment;
