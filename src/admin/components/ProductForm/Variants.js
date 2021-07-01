import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Form, Space, InputNumber, Input, Button } from 'antd';
// import PropTypes from 'prop-types'

function Variants() {
	return (
		<Form.List name='variants'>
			{(fields, { add, remove }) => (
				<>
					{fields.map(({ key, name, fieldKey, ...restField }) => (
						<div key={key}>
							<Space
								style={{ display: 'flex', marginBottom: 8 }}
								align='baseline'
							>
								<Form.Item label=' ' style={{ marginRight: 16 }}>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Form.Item>

								<Form.Item
									{...restField}
									name={[name, 'color']}
									label='Color'
									fieldKey={[fieldKey, 'color']}
									rules={[{ required: true, message: 'Missing first name' }]}
								>
									<Input placeholder='Color' />
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'stock']}
									label='Stock'
									fieldKey={[fieldKey, 'stock']}
									rules={[{ required: true, message: 'Missing last name' }]}
								>
									<InputNumber placeholder='Stock' min={0} />
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'freeSize']}
									label='Free size'
									fieldKey={[fieldKey, 'freeSize']}
								>
									<Checkbox checked={false}>Free size</Checkbox>
								</Form.Item>
							</Space>
							<Form.List name={[name, 'details']}>
								{(details, { add, remove }) => (
									<>
										{details.map(({ key, name, fieldKey, ...restField }) => (
											<Space
												key={key}
												style={{ display: 'flex', marginBottom: 8 }}
												align='baseline'
											>
												<Form.Item style={{ marginLeft: 36, marginRight: 16 }}>
													<MinusCircleOutlined onClick={() => remove(name)} />
												</Form.Item>

												<Form.Item
													{...restField}
													name={[name, 'size']}
													fieldKey={[fieldKey, 'size']}
													rules={[
														{
															required: true,
															message: 'Missing first name',
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
															message: 'Missing last name',
														},
													]}
												>
													<InputNumber placeholder='Quantity' min={0} />
												</Form.Item>
											</Space>
										))}
										<Form.Item>
											<Button
												type='dashed'
												onClick={() => add()}
												block
												icon={<PlusOutlined />}
												style={{ maxWidth: 200, marginLeft: 36 }}
											>
												Add size
											</Button>
										</Form.Item>
									</>
								)}
							</Form.List>
						</div>
					))}

					<Form.Item>
						<Button
							type='dashed'
							onClick={() => add()}
							block
							icon={<PlusOutlined />}
						>
							Add variant
						</Button>
					</Form.Item>
				</>
			)}
		</Form.List>
	);
}

// Variants.propTypes = {

// }

export default Variants;
