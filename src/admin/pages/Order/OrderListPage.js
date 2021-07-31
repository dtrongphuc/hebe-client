import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button, Tag, Card } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getOrders } from 'services/OrderApi';
import { priceString } from 'utils/util';
import moment from 'moment';

function OrderListPage() {
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
				const response = await getOrders();
				if (response?.success) {
					setData(response?.orders);
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
					textToHighlight={text ? `#${text}` : ''}
				/>
			) : (
				`#${text}`
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

	const columns = [
		{
			title: 'Order number',
			dataIndex: 'orderNumber',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.orderNumber - b.orderNumber,
			...getColumnSearchProps('orderNumber', 'order number'),
		},
		{
			title: 'Total',
			dataIndex: 'lastPrice',
			sorter: (a, b) => a.lastPrice - b.lastPrice,
			render: (text) => priceString(text),
		},
		{
			title: 'Delivery method',
			dataIndex: 'deliveryMethod',
			filters: [
				{
					text: 'Ship',
					value: 'shipment',
				},
				{
					text: 'Pickup',
					value: 'pickup',
				},
			],
			onFilter: (value, record) => record.deliveryMethod.includes(value),
			render: (text, record) =>
				text === 'shipment' ? (
					<Tag color='green'>Shipment</Tag>
				) : (
					<Tag color='blue'>Pickup</Tag>
				),
		},
		{
			title: 'Payment status',
			dataIndex: 'paymentStatus',
			filters: [
				{
					text: 'Pending',
					value: 'pending',
				},
				{
					text: 'Paid',
					value: 'paid',
				},
				{
					text: 'Refunded',
					value: 'refunded',
				},
			],
			onFilter: (value, record) => record.paymentStatus.includes(value),
			render: (text, record) =>
				text === 'pending' ? (
					<Tag color='default'>Pending</Tag>
				) : text === 'paid' ? (
					<Tag color='green'>Paid</Tag>
				) : (
					<Tag color='red'>Refunded</Tag>
				),
		},

		{
			title: 'Order date',
			dataIndex: 'createdAt',
			render: (text) => moment(text).format('DD/MM/YYYY - HH:mm:ss'),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Link to={`/admin/order/detail/${record._id}`}>View</Link>
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

export default OrderListPage;
