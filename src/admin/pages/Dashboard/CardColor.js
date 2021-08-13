import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';

function CardColor({ color, data, icon, loading }) {
	return (
		<Card
			className='card-color'
			style={{ background: color }}
			bordered={false}
			loading={loading}
		>
			<Row justify='space-between'>
				<Col>
					<div>
						<h6 className='title'>{data.title}</h6>
						<p className='number'>{data.amount}</p>
					</div>
				</Col>
				<Col>
					<div className='icon' style={{ color: color }}>
						{icon}
					</div>
				</Col>
			</Row>
			<Row gutter={[16, 0]} style={{ marginTop: 16 }}>
				<Col>
					<span className='des'>{data.percentage || 0}</span>
				</Col>
				<Col flex='auto'>
					<span className='des'>From Previous Month</span>
				</Col>
			</Row>
		</Card>
	);
}

CardColor.propTypes = {
	color: PropTypes.string,
	icon: PropTypes.element,
	data: PropTypes.object,
	loading: PropTypes.bool,
};

export default CardColor;
