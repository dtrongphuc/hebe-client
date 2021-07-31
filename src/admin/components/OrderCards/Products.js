import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import { priceString } from 'utils/util';

function Products({ data, loading }) {
	const columns = [
		{
			title: 'Name',
			dataIndex: ['product', 'name'],
			key: 'product_name',
		},
		{
			title: 'SKU',
			dataIndex: ['variant', 'color'],
			key: 'product_sku',
			render: (text, record) =>
				`${text}${record.variant.freeSize ? '' : ' / ' + record.sku.size}`,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
		},
		{
			title: 'Total',
			dataIndex: 'total',
			render: (text) => priceString(text),
		},
	];

	return (
		<Card title='Products' bordered={false}>
			<Table
				columns={columns}
				dataSource={data}
				loading={loading}
				rowKey='_id'
				pagination={false}
			/>
		</Card>
	);
}

Products.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool,
};

export default Products;
