import React from 'react';
// import PropTypes from 'prop-types';
import { Form, Card, Switch, Radio, Space } from 'antd';

function AttributeCard(props) {
	return (
		<Card title='Attribute' bordered={false}>
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
						<Radio value={1}>Fixed amount</Radio>
						<Radio value={2}>Percentage amount</Radio>
					</Space>
				</Radio.Group>
			</Form.Item>
			<Form.Item label='Apply to' name='apply_to'>
				<Radio.Group>
					<Space direction='vertical'>
						<Radio value={3}>Entire order</Radio>
						<Radio value={4}>Specific products</Radio>

						<Radio value={5}>Shipping</Radio>
					</Space>
				</Radio.Group>
			</Form.Item>
		</Card>
	);
}

AttributeCard.propTypes = {};

export default AttributeCard;
