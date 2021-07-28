import React, { useState, useEffect } from 'react';
import { Table, Input, Space, Row, Col, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { getAllProducts } from 'services/ProductApi';

function ProductListPage() {
	const [form] = Form.useForm();
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
			sorter: (a, b) => a.salePrice - b.salePrice,
		},
		{
			title: 'Price',
			dataIndex: 'price',
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
				<Form form={form} onFinish={onSearch}>
					<Row gutter={24} wrap={false}>
						<Col flex='auto'>
							<Form.Item label='Product' style={{ marginBottom: 12 }}>
								<Input name='product_name' placeholder='Product name' />
							</Form.Item>
						</Col>
						<Col flex='auto'>
							<Form.Item label='Category' style={{ marginBottom: 12 }}>
								<Input name='category_name' placeholder='Category name' />
							</Form.Item>
						</Col>
						<Col flex='auto'>
							<Form.Item label='Brand' style={{ marginBottom: 12 }}>
								<Input name='brand_name' placeholder='Brand name' />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col
							span={24}
							style={{
								textAlign: 'right',
							}}
						>
							<Button type='primary' htmlType='submit'>
								Search
							</Button>
							<Button
								style={{
									margin: '0 8px',
								}}
								onClick={() => {
									form.resetFields();
								}}
							>
								Clear
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
			<div
				className='site-layout-background'
				style={{ padding: 24, margin: '16px 0' }}
			>
				<Table columns={columns} dataSource={data} rowKey='_id' />
			</div>
		</>
	);
}

export default ProductListPage;
