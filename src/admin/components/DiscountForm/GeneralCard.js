import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card, Row, Col, InputNumber, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function GeneralCard(props) {
	return (
		<Card title='General' bordered={false}>
			<Row gutter={12}>
				<Col span={12}>
					<Form.Item
						label='Code'
						name='code'
						rules={[{ required: true, message: 'Code is required!' }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label='Discount amount'
						name='value'
						rules={[
							{
								required: true,
								message: 'Discount amount is required!',
							},
						]}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label='Date'
						name='date_range'
						help='Empty to apply permanently'
					>
						<RangePicker style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col span={24} style={{ marginTop: 12 }}>
					<Form.Item label='Description' name='description'>
						<TextArea rows={4} />
					</Form.Item>
				</Col>
			</Row>
		</Card>
	);
}

GeneralCard.propTypes = {};

export default GeneralCard;
