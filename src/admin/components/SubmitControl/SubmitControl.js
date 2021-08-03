import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Space, Typography } from 'antd';

const { Text } = Typography;

function SubmitControl({ title, onSubmit, onCancel }) {
	return (
		<Card
			className='shadow-sm'
			bordered={false}
			size='small'
			style={{ position: 'sticky', marginBottom: 16, top: 64, zIndex: 100 }}
		>
			<div className='d-flex align-items-center justify-content-between'>
				<Text strong style={{ textTransform: 'uppercase' }}>
					{title}
				</Text>
				<Space>
					<Button danger htmlType='button' onClick={onCancel}>
						Cancel
					</Button>
					<Button type='primary' htmlType='button' onClick={onSubmit}>
						Submit
					</Button>
				</Space>
			</div>
		</Card>
	);
}

SubmitControl.propTypes = {
	title: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

export default SubmitControl;
