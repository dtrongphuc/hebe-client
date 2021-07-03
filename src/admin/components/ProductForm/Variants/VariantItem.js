import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Form, Space, InputNumber, Input, Button } from 'antd';

function VariantItem({ form, remove, field }) {
	const [freeSize, setFreeSize] = useState(false);
	const { key, name, fieldKey, ...restField } = field;

	const onCheckboxChange = (key) => (e) => {
		let checked = e.target.checked;
		let { variants } = form.getFieldsValue();

		if (checked && variants[key]) {
			Object.assign(variants[key], { details: [], stock: 0 });
			form.setFieldsValue({ variants });
		}
		setFreeSize(checked);
	};

	const onQuantityChange = (colorKey, detailKey) => (number) => {
		let { variants } = form.getFieldsValue();
		let stock = variants[colorKey]?.details
			?.map((detail) => detail.quantity)
			.reduce((total, curr) => total + curr, 0);
		variants[colorKey].stock = stock;
		form.setFieldsValue({ variants });
	};

	return (
		<div key={key}>
			<Space style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
				<Form.Item label=' ' style={{ marginRight: 16 }}>
					<MinusCircleOutlined onClick={() => remove(name)} />
				</Form.Item>

				<Form.Item
					{...restField}
					name={[name, 'color']}
					label='Color'
					fieldKey={[fieldKey, 'color']}
					rules={[{ required: true, message: 'Color is required' }]}
				>
					<Input placeholder='Color' />
				</Form.Item>
				<Form.Item
					{...restField}
					name={[name, 'stock']}
					label='Stock'
					initialValue={0}
					fieldKey={[fieldKey, 'stock']}
					rules={[{ required: freeSize, message: 'Stock is required' }]}
				>
					<InputNumber placeholder='Stock' min={0} disabled={!freeSize} />
				</Form.Item>
				<Form.Item
					{...restField}
					name={[name, 'freeSize']}
					label='Free size'
					fieldKey={[fieldKey, 'freeSize']}
					valuePropName='checked'
				>
					<Checkbox onChange={onCheckboxChange(key)}>Free size</Checkbox>
				</Form.Item>
			</Space>
			<Form.List name={[name, 'details']}>
				{(details, { add, remove }) => (
					<>
						{!freeSize &&
							details.map((detail) => {
								const { name, fieldKey, ...restField } = detail;

								return (
									<Space
										key={detail.key}
										style={{ display: 'flex', marginBottom: 8 }}
										align='baseline'
									>
										<Form.Item style={{ marginLeft: 38, marginRight: 16 }}>
											<MinusCircleOutlined onClick={() => remove(name)} />
										</Form.Item>

										<Form.Item
											{...restField}
											name={[name, 'size']}
											fieldKey={[fieldKey, 'size']}
											rules={[
												{
													required: true,
													message: 'Size is required',
												},
											]}
										>
											<Input placeholder='Size' />
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'quantity']}
											fieldKey={[fieldKey, 'quantity']}
											rules={[
												{
													required: true,
													message: 'Quantity is required',
												},
											]}
										>
											<InputNumber
												placeholder='Quantity'
												min={0}
												onChange={onQuantityChange(key, detail.key)}
											/>
										</Form.Item>
									</Space>
								);
							})}
						<Form.Item>
							<Button
								type='dashed'
								onClick={() => add()}
								block
								disabled={freeSize}
								icon={<PlusOutlined />}
								style={{ maxWidth: 310, marginLeft: 38 }}
							>
								Add size
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</div>
	);
}

VariantItem.propTypes = {
	remove: PropTypes.func,
	field: PropTypes.object,
};

export default VariantItem;
