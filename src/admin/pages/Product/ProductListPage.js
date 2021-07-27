import React, { useState, useEffect } from 'react';
import { Table, Input, Space, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { getAllProducts } from 'services/ProductApi';

function ProductListPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await getAllProducts();
				if (response?.success) {
					setData(response?.products);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, []);

	const onSearch = (value) => console.log(value);

	const toggleShowing = (id) => (e) => {
		e.preventDefault();
		console.log(id);
	};

	const columns = [
		{
			title: 'Product name',
			dataIndex: 'name',
			key: 'product_name',
		},
		{
			title: 'Category',
			dataIndex: ['category', 'name'],
			key: 'category_name',
		},
		{
			title: 'Brand',
			dataIndex: ['brand', 'name'],
			key: 'brand_name',
		},
		{
			title: 'Sale price',
			dataIndex: 'salePrice',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.salePrice - b.salePrice,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/product/edit/${record.path}`}>Edit</Link>
					{record.showing && (
						<Link to='/' onClick={toggleShowing(record._id)}>
							Hide
						</Link>
					)}
					{!record.showing && (
						<Link to='/' onClick={toggleShowing(record._id)}>
							Show
						</Link>
					)}
				</Space>
			),
		},
	];

	return (
		<>
			<div
				className='site-layout-background text-center'
				style={{ padding: 16, margin: '16px 0' }}
			>
				<Row gutter={16} wrap={false}>
					<Col flex='auto'>
						<Input name='product_name' placeholder='Product name' />
					</Col>
					<Col flex='auto'>
						<Input name='category_name' placeholder='Category name' />
					</Col>
					<Col flex='auto'>
						<Input name='brand_name' placeholder='Brand name' />
					</Col>
					<Col flex='100px'>
						<Button type='primary' icon={<SearchOutlined />} onClick={onSearch}>
							Search
						</Button>
					</Col>
				</Row>
			</div>
			<div
				className='site-layout-background'
				style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
			>
				<Table columns={columns} dataSource={data} rowKey='_id' />
			</div>
		</>
	);
}

export default ProductListPage;
