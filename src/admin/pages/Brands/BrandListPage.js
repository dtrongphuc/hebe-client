import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAllBrands } from 'services/BrandApi';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

function BrandListPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState({
		searchText: '',
		searchedColumn: '',
	});
	const searchInput = useRef();

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await getAllBrands();
				if (response?.success) {
					let mapData = response.brands.map((brand) => ({
						...brand,
						key: brand._id,
					}));
					setData(mapData);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, []);

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
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
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: '',
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
			title: 'Brand name',
			dataIndex: 'name',
			key: 'name',
			width: '70%',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			width: '30%',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/brand/edit/${record.path}`}>Edit</Link>
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
			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default BrandListPage;
