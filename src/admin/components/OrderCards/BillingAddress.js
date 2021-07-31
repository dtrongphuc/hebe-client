import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import { capitalize } from 'utils/util';

const { Text } = Typography;

function BillingAddress({ data, loading }) {
	return (
		<Card title='Billing address' bordered={false} loading={loading}>
			<div>
				<Text strong>Full name: </Text>
				<span>
					{data?.firstname} {data?.lastname}
				</span>
			</div>
			{data &&
				Object.keys(data)
					.filter(
						(key) =>
							key !== 'firstname' && key !== 'lastname' && data[key] !== ''
					)
					.map((key) => (
						<div key={key}>
							<Text strong>{capitalize(key)}: </Text>
							<span>{data[key]}</span>
						</div>
					))}
		</Card>
	);
}

BillingAddress.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default BillingAddress;
