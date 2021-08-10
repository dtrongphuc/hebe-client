import React from 'react';
import PropTypes from 'prop-types';
import {
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Bar,
	BarChart,
} from 'recharts';

function RevenueChart({ data }) {
	return (
		<ResponsiveContainer width='99%' height={300}>
			<BarChart data={data} maxBarSize={20}>
				<CartesianGrid strokeDasharray='1' vertical={false} />
				<XAxis dataKey='name' />
				<YAxis />
				<Bar dataKey='value' fill='#8884d8' />
			</BarChart>
		</ResponsiveContainer>
	);
}

RevenueChart.propTypes = {
	data: PropTypes.array,
};

export default RevenueChart;
