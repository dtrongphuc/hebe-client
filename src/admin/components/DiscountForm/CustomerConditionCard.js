import React from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Input, InputNumber } from 'antd';

function CustomerConditionCard({ loading }) {
	return (
		<Card title='Customer condition' bordered={false} loading={loading}>
			<Form.Item
				label='Customer email'
				name='condition_customer_email'
				help='Use comma when you have multi email'
			>
				<Input />
			</Form.Item>
			<Form.Item
				style={{ marginTop: 12 }}
				label={`Customer's purchase`}
				name='condition_customer_purchase'
				help='Minimum purchased amount'
			>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
		</Card>
	);
}

CustomerConditionCard.propTypes = {
	loading: PropTypes.bool,
};

export default CustomerConditionCard;
