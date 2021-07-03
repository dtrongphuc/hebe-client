import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import VariantItem from './VariantItem';
// import PropTypes from 'prop-types'

function VariantList({ form }) {
	return (
		<Form.List name='variants'>
			{(fields, { add, remove }) => (
				<>
					{fields.map((field) => (
						<div key={field.key}>
							<VariantItem form={form} remove={remove} field={field} />
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

export default VariantList;
