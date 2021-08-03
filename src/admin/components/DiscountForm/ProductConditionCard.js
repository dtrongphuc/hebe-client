import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import {
	Card,
	Table,
	Button,
	Space,
	Input,
	Typography,
	Slider,
	InputNumber,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { getAllProducts } from 'services/ProductApi';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProductsChange } from 'admin/reducers/discountSlice';
const { Text } = Typography;

function ProductConditionCard() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState({
		searchText: '',
		searchedColumn: '',
	});

	const [searchRange, setSearchRange] = useState({
		value: [0, 1000],
		searchedColumn: '',
	});
	const [loading, setLoading] = useState(false);
	const { selectedProducts } = useSelector((state) => state.discount);
	const searchInput = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const response = await getAllProducts();
				if (response?.success) {
					setData(response?.products);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, []);

	const rowSelection = {
		onChange: (selectedRowKeys) => {
			dispatch(selectedProductsChange(selectedRowKeys));
		},
	};

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

	const getColumnRangeProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<InputNumber
						value={searchRange.value[0]}
						size='small'
						style={{ width: 80 }}
						onChange={(value) =>
							setSearchRange((state) => ({
								...state,
								value: [value, state.value[1]],
							}))
						}
					/>
					<span style={{ margin: '0 12px' }}> - </span>
					<InputNumber
						value={searchRange.value[1]}
						size='small'
						style={{ width: 80 }}
						onChange={(value) =>
							setSearchRange((state) => ({
								...state,
								value: [state.value[0], value],
							}))
						}
					/>
				</div>
				<Slider
					range
					defaultValue={[0, 1000]}
					min={0}
					max={1000}
					value={searchRange.value}
					onChange={(value) => setSearchRange((state) => ({ ...state, value }))}
				/>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Button
						type='primary'
						onClick={() => {
							setSelectedKeys(
								data
									.filter(
										(d) =>
											searchRange.value[0] <= d[dataIndex] &&
											d[dataIndex] <= searchRange.value[1]
									)
									.map((d) => d[dataIndex])
							);
							confirm();
						}}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90, marginRight: 4 }}
					>
						Filter
					</Button>
					<Button
						onClick={() => handleResetRange(clearFilters)}
						size='small'
						style={{ width: 90, marginLeft: 4 }}
					>
						Reset
					</Button>
				</div>
			</div>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex] >= searchRange.value[0] &&
				  record[dataIndex] <= searchRange.value[1]
				: '',
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

	const handleResetRange = (clearFilters) => {
		clearFilters();
		setSearchRange({
			value: [0, 1000],
			searchedColumn: '',
		});
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
			...getColumnSearchProps(['brand', 'name'], 'brand'),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			...getColumnRangeProps('price'),
		},
	];

	return (
		<Card title='Target products' bordered={false}>
			<Text default>Selected ({selectedProducts.length}) products</Text>
			<Table
				style={{ marginTop: 12 }}
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data}
				rowKey='_id'
				loading={loading}
			/>
		</Card>
	);
}

ProductConditionCard.propTypes = {};

export default ProductConditionCard;
