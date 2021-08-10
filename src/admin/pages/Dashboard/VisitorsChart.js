import React from 'react';
import PropTypes from 'prop-types';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

const chartData = [
	{
		name: '06:00',
		last_week: 4000,
		this_week: 2400,
		amt: 2400,
	},
	{
		name: '09:00',
		last_week: 3000,
		this_week: 1398,
		amt: 2210,
	},
	{
		name: '12:00',
		last_week: 2000,
		this_week: 9800,
		amt: 2290,
	},
	{
		name: '15:00',
		last_week: 2780,
		this_week: 3908,
		amt: 2000,
	},
	{
		name: '18:00',
		last_week: 1890,
		this_week: 4800,
		amt: 2181,
	},
	{
		name: '21:00',
		last_week: 2390,
		this_week: 3800,
		amt: 2500,
	},
];

function VisitorsChart({ data }) {
	return (
		<ResponsiveContainer width='99%' height={300}>
			<LineChart
				data={chartData}
				margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
			>
				<CartesianGrid strokeDasharray='1' vertical={false} />
				<XAxis dataKey='name' />
				<YAxis />
				<Line
					type='monotone'
					dataKey='this_week'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
				<Line type='monotone' dataKey='last_week' stroke='#82ca9d' />
			</LineChart>
		</ResponsiveContainer>
	);
}

VisitorsChart.propTypes = {
	data: PropTypes.array,
};

export default VisitorsChart;
