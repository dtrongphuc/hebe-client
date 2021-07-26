import React from 'react';
import { Table, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllCategories } from 'services/CategoryApi';

const { Search } = Input;

function CategoryListPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await getAllCategories();
				if (response?.success) {
					let mapData = response.categories.map((category) => ({
						...category,
						key: category._id,
					}));
					setData(mapData);
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
			title: 'Category name',
			dataIndex: 'name',
			key: 'name',
			width: '70%',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			width: '30%',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/category/edit/${record.path}`}>Edit</Link>
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
				<Search
					placeholder='Search by category name'
					onSearch={onSearch}
					allowClear
					style={{ maxWidth: 400 }}
					enterButton
				/>
			</div>
			<div
				className='site-layout-background'
				style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
			>
				<Table columns={columns} dataSource={data} />
			</div>
		</>
	);
}

export default CategoryListPage;
