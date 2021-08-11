import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button, message, Tag, Card } from 'antd';
import { Link } from 'react-router-dom';
import { toggleShowingProduct } from 'services/ProductApi';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getUserAccounts } from 'services/AccountApi';

function CustomerListPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState({
		searchText: '',
		searchedColumn: '',
	});
	const [loading, setLoading] = useState(false);
	const searchInput = useRef();

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const response = await getUserAccounts();
				if (response?.success) {
					setData(response?.accounts);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
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

	const toggleAccountStatus = (id) => async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await toggleShowingProduct(id);
			if (!response?.success) return;

			let selected = data.find((item) => item._id === id);
			let index = data.indexOf(selected);
			selected.showing = !selected.showing;

			setData((state) => [
				...state.slice(0, index),
				{ ...selected },
				...state.slice(index + 1),
			]);
		} catch (error) {
			console.log(error);
			message.warning('Error!');
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			title: 'Email',
			dataIndex: 'email',
			...getColumnSearchProps('email'),
		},
		{
			title: 'First name',
			dataIndex: 'firstname',
			...getColumnSearchProps('firstname', 'first name'),
		},
		{
			title: 'Last name',
			dataIndex: 'lastname',
			...getColumnSearchProps('lastname', 'last name'),
		},
		{
			title: 'Status',
			dataIndex: 'active',
			render: (text, record) =>
				!!text ? (
					<Tag color='success'>Enabled</Tag>
				) : (
					<Tag color='error'>Disabled</Tag>
				),
			filters: [
				{
					text: 'Enabled',
					value: true,
				},
				{
					text: 'Disabled',
					value: false,
				},
			],
			onFilter: (value, record) => record.active === value,
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/customer/edit/${record._id}`}>Edit</Link>
					{record.active && (
						<Link to='/' onClick={toggleAccountStatus(record._id)}>
							Disable
						</Link>
					)}
					{!record.active && (
						<Link to='/' onClick={toggleAccountStatus(record._id)}>
							Enable
						</Link>
					)}
				</Space>
			),
		},
	];

	return (
		<Card title='Customers' bordered={false}>
			<Table
				columns={columns}
				dataSource={data}
				rowKey='_id'
				loading={loading}
				scroll={{ x: true }}
			/>
		</Card>
	);
}

export default CustomerListPage;
