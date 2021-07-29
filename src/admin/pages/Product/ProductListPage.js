import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAllProducts } from 'services/ProductApi';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

function ProductListPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState({
		searchText: '',
		searchedColumn: '',
	});
	const searchInput = useRef();

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

	const getColumnSearchProps = (dataIndex, placeholder = dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Search ${placeholder}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size='small'
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearch({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) => {
			if (!Array.isArray(dataIndex)) {
				return record[dataIndex]
					? record[dataIndex]
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase())
					: '';
			}

			let recordIndex = []
				.concat(dataIndex)
				.reduce((accumulator, current, index, array) => {
					if (array.length === 1) return record[`${accumulator}`];

					return index === 1
						? record[`${accumulator}`][`${current}`]
						: accumulator[`${current}`];
				});

			return recordIndex && Array.isArray(dataIndex)
				? recordIndex.toString().toLowerCase().includes(value.toLowerCase())
				: '';
		},
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current.select(), 100);
			}
		},
		render: (text) =>
			search.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[search.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearch({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearch({ searchText: '' });
	};

	const toggleShowing = (id) => (e) => {
		e.preventDefault();
		console.log(id);
	};

	const columns = [
		{
			title: 'Product name',
			dataIndex: 'name',
			key: 'product_name',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Category',
			dataIndex: ['category', 'name'],
			key: 'category_name',
			...getColumnSearchProps(['category', 'name'], 'category'),
		},
		{
			title: 'Brand',
			dataIndex: ['brand', 'name'],
			key: 'brand_name',
			...getColumnSearchProps(['category', 'name'], 'brand'),
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
		<div
			className='site-layout-background'
			style={{ padding: 24, margin: '16px 0' }}
		>
			<Table columns={columns} dataSource={data} rowKey='_id' />
		</div>
	);
}

export default ProductListPage;
