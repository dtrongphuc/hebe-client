import React from 'react';
import PropTypes from 'prop-types';
import { Card, Space, Typography } from 'antd';
import moment from 'moment';
const { Text } = Typography;
function General({ data, loading }) {
	return (
		<Card title='General' bordered={false} loading={loading}>
			<Space direction='vertical'>
				<div>
					<Text strong>Customer full name: </Text>
					<span>
						{data?.account?.firstname} {data?.account?.lastname}
					</span>
				</div>
				<div>
					<Text strong>Customer email: </Text>
					<span>{data?.account?.email}</span>
				</div>
				<div>
					<Text strong>Order number: </Text>
					<span>#{data?.order?.number}</span>
				</div>
				<div>
					<Text strong>Order date: </Text>
					<span>
						{moment(data?.order?.date).format('DD/MM/YYYY - HH:mm:ss')}
					</span>
				</div>
			</Space>
		</Card>
	);
}

General.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default General;
