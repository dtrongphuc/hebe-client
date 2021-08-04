import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button, Tag, Card, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getDiscounts, toggleDiscountStatus } from 'services/DiscountApi';
import { Link } from 'react-router-dom';

function DiscountListPage() {
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
				const response = await getDiscounts();
				if (response?.success) {
					setData(response?.discounts);
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
					textToHighlight={text}
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

	const toggleStatus = (id) => async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await toggleDiscountStatus(id);
			if (!response?.success) return;

			let selected = data.find((item) => item._id === id);
			let index = data.indexOf(selected);
			selected.status = !selected.status;

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
			title: 'Code',
			dataIndex: 'code',
			...getColumnSearchProps('code'),
		},
		{
			title: 'Description',
			dataIndex: 'description',
		},
		{
			title: 'Usage count',
			dataIndex: 'usageCount',
			sorter: (a, b) => a.usageCount - b.usageCount,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			filters: [
				{
					text: 'Enable',
					value: true,
				},
				{
					text: 'Disabled',
					value: false,
				},
			],
			onFilter: (value, record) => record.status === value,
			render: (text, record) =>
				text === true ? (
					<Tag color='green'>Enable</Tag>
				) : (
					<Tag color='red'>Disabled</Tag>
				),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/discount/edit/${record._id}`}>Edit</Link>
					{record.status && (
						<Link to='/' onClick={toggleStatus(record._id)}>
							Disable
						</Link>
					)}
					{!record.status && (
						<Link to='/' onClick={toggleStatus(record._id)}>
							Enable
						</Link>
					)}
				</Space>
			),
		},
	];

	return (
		<Card title='Orders' bordered={false}>
			<Table
				columns={columns}
				dataSource={data}
				rowKey='_id'
				loading={loading}
			/>
		</Card>
	);
}

export default DiscountListPage;
