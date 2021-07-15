import React from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';

import { Form, Input, Row, Col, InputNumber } from 'antd';

function ShippingMethodItem({ remove, field }) {
	const { key, name, fieldKey, ...restField } = field;

	return (
		<div key={key}>
			<div
				style={{ display: 'flex', marginBottom: 8, width: '100%' }}
				align='baseline'
			>
				<Form.Item style={{ marginRight: 16 }}>
					<MinusCircleOutlined onClick={() => remove(name)} />
				</Form.Item>
				<div style={{ width: '100%' }}>
					<Row gutter={16}>
						<Col sm={18} md={20}>
							<Form.Item
								{...restField}
								name={[name, 'shipping_name']}
								fieldKey={[fieldKey, 'shipping_name']}
								rules={[{ required: true, message: 'Name is required' }]}
							>
								<Input placeholder='Name' />
							</Form.Item>
						</Col>
						<Col sm={6} md={4}>
							<Form.Item
								{...restField}
								name={[name, 'shipping_price']}
								fieldKey={[fieldKey, 'shipping_price']}
								rules={[{ required: true, message: 'Price is required' }]}
							>
								<InputNumber
									formatter={(value) =>
										`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									style={{ width: '100%' }}
									defaultValue={0}
								/>
							</Form.Item>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}

ShippingMethodItem.propTypes = {
	remove: PropTypes.func,
	field: PropTypes.object,
};

export default ShippingMethodItem;
