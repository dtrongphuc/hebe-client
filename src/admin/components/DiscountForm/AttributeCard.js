import React from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Switch, Radio, Space } from 'antd';

function AttributeCard({ applyToChange, loading }) {
	return (
		<Card title='Attribute' bordered={false} loading={loading}>
			<Form.Item label='Status' name='status' valuePropName='checked'>
				<Switch defaultChecked />
			</Form.Item>
			<Form.Item
				label='One per customer'
				name='one_per_customer'
				valuePropName='checked'
			>
				<Switch defaultChecked />
			</Form.Item>
			<Form.Item label='Discount amount type' name='discount_type'>
				<Radio.Group>
					<Space direction='vertical'>
						<Radio value='fixed_amount'>Fixed amount</Radio>
						<Radio value='percentage'>Percentage amount</Radio>
					</Space>
				</Radio.Group>
			</Form.Item>
			<Form.Item label='Apply to' name='apply_to'>
				<Radio.Group onChange={applyToChange}>
					<Space direction='vertical'>
						<Radio value='entire_order'>Entire order</Radio>
						<Radio value='specific_products'>Specific products</Radio>
						<Radio value='shipping'>Shipping</Radio>
					</Space>
				</Radio.Group>
			</Form.Item>
		</Card>
	);
}

AttributeCard.propTypes = {
	applyToChange: PropTypes.func,
	loading: PropTypes.bool,
};

export default AttributeCard;
