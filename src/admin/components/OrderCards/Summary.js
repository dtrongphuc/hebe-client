import React from 'react';
import PropTypes from 'prop-types';
import { Card, Descriptions } from 'antd';
import { priceString } from 'utils/util';
function Summary({ data, loading }) {
	return (
		<Card title='Summary' bordered={false} loading={loading}>
			<Descriptions bordered size='small' column={1}>
				<Descriptions.Item label='Subtotal'>
					{priceString(data?.subTotal)}
				</Descriptions.Item>
				<Descriptions.Item label='Shipping'>
					{priceString(data?.shipping)}
				</Descriptions.Item>
				<Descriptions.Item label='Tax'>
					{priceString(data?.tax)}
				</Descriptions.Item>
				<Descriptions.Item label='Discount'>
					{priceString(data?.discount)}
				</Descriptions.Item>
				<Descriptions.Item label='Grand total'>
					{priceString(data?.grandTotal)}
				</Descriptions.Item>
			</Descriptions>
		</Card>
	);
}

Summary.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default Summary;
