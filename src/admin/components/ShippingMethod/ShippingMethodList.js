import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import ShippingMethodItem from './ShippingMethodItem';
// import PropTypes from 'prop-types'

function ShippingMethodList({ form }) {
	return (
		<Form.List name='shipping_methods'>
			{(fields, { add, remove }) => (
				<>
					{fields.map((field) => (
						<div key={field.key}>
							<ShippingMethodItem form={form} remove={remove} field={field} />
						</div>
					))}

					<Form.Item>
						<Button
							type='dashed'
							onClick={() => add()}
							block
							icon={<PlusOutlined />}
						>
							Add method
						</Button>
					</Form.Item>
				</>
			)}
		</Form.List>
	);
}

export default ShippingMethodList;
