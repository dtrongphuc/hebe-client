import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import PickupLocationItem from './PickupLocationItem';
// import PropTypes from 'prop-types'

function PickupLocationList({ form }) {
	return (
		<Form.List name='pickup_locations'>
			{(fields, { add, remove }) => (
				<>
					{fields.map((field) => (
						<div key={field.key}>
							<PickupLocationItem form={form} remove={remove} field={field} />
						</div>
					))}

					<Form.Item>
						<Button
							type='dashed'
							onClick={() => add()}
							block
							icon={<PlusOutlined />}
						>
							Add location
						</Button>
					</Form.Item>
				</>
			)}
		</Form.List>
	);
}

// Variants.propTypes = {

// }

export default PickupLocationList;
