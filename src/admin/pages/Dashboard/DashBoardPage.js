import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import VisitorsChart from './VisitorsChart';
import RevenueChart from './RevenueChart';
import CardColor from './CardColor';
import { FaDatabase, FaDollarSign, FaTags } from 'react-icons/fa';
import VisitorsByDevice from './VisitorsByDevice';
import { getRevenue, getSummary } from 'services/StatisticsApi';
import './styles.scss';

const data_2 = [
	{ name: 'Windows', value: 492, fill: '#FF5370' },
	{ name: 'Mobiles', value: 618, fill: '#4099ff' },
	{ name: 'Others', value: 331, fill: '#2ed8b6' },
];

function DashBoardPage() {
	const [revenue, setRevenue] = useState([]);
	const [summary, setSummary] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const [resRevenue, resSummary] = await Promise.all([
					getRevenue(),
					getSummary(),
				]);
				if (resRevenue?.success) {
					setRevenue(resRevenue.revenue);
				}

				if (resSummary?.success) {
					setSummary(resSummary.summary);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, []);

	return (
		<Row gutter={[16, 16]} wrap={true}>
			<Col lg={8} span={24}>
				<CardColor
					color='#FF5370'
					data={{
						title: 'Total Orders',
						amount: summary?.totalOrders?.value,
						percentage:
							summary?.totalOrders?.comparison > 0
								? `+${summary?.totalOrders?.comparison}%`
								: `${summary?.totalOrders?.comparison}%`,
					}}
					icon={<FaDatabase />}
					loading={loading}
				/>
			</Col>
			<Col lg={8} span={24}>
				<CardColor
					color='#4099ff'
					data={{
						title: 'Average Price',
						amount: new Intl.NumberFormat().format(
							summary?.averagePrice?.value ?? 0
						),
						percentage:
							summary?.averagePrice?.comparison > 0
								? `+${summary?.averagePrice?.comparison}%`
								: `${summary?.averagePrice?.comparison}%`,
					}}
					icon={<FaDollarSign />}
					loading={loading}
				/>
			</Col>
			<Col lg={8} span={24}>
				<CardColor
					color='#2ed8b6'
					data={{
						title: 'Product Sold',
						amount: summary?.productSold?.value,
						percentage:
							summary?.productSold?.comparison > 0
								? `+${summary?.productSold?.comparison}%`
								: `${summary?.productSold?.comparison}%`,
					}}
					icon={<FaTags />}
					loading={loading}
				/>
			</Col>
			<Col lg={16} span={24}>
				<Card title='Revenue' bordered={true} loading={loading}>
					<RevenueChart data={revenue} />
				</Card>
			</Col>
			<Col lg={8} span={24}>
				<Card title='Visitors By Device' bordered={true}>
					<VisitorsByDevice data={data_2} />
				</Card>
			</Col>
			<Col span={24}>
				<Card title='Online Store Visitors' bordered={true}>
					<VisitorsChart />
				</Card>
			</Col>
		</Row>
	);
}

export default DashBoardPage;
