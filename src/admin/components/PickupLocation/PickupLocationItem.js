import React from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';

import { Form, Input, Row, Col, InputNumber } from 'antd';

function PickupLocationItem({ remove, field }) {
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
								name={[name, 'pickup_name']}
								fieldKey={[fieldKey, 'pickup_name']}
								rules={[{ required: true, message: 'Name is required' }]}
							>
								<Input placeholder='Name' />
							</Form.Item>
						</Col>
						<Col sm={6} md={4}>
							<Form.Item
								{...restField}
								name={[name, 'pickup_price']}
								fieldKey={[fieldKey, 'pickup_price']}
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

					<Form.Item
						{...restField}
						name={[name, 'pickup_address']}
						fieldKey={[fieldKey, 'pickup_address']}
						rules={[{ required: true, message: 'Address is required' }]}
					>
						<Input placeholder='Address' />
					</Form.Item>
					<Form.Item
						{...restField}
						name={[name, 'pickup_instruction']}
						fieldKey={[fieldKey, 'pickup_instruction']}
						rules={[{ required: true, message: 'Instruction is required' }]}
					>
						<Input placeholder='Instruction' />
					</Form.Item>
				</div>
			</div>
		</div>
	);
}

PickupLocationItem.propTypes = {
	remove: PropTypes.func,
	field: PropTypes.object,
};

export default PickupLocationItem;
