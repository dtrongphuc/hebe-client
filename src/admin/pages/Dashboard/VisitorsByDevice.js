import React from 'react';
import PropTypes from 'prop-types';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

function VisitorsByDevice({ data }) {
	return (
		<ResponsiveContainer width='99%' height={300}>
			<PieChart>
				<Pie
					dataKey='value'
					startAngle={360}
					endAngle={0}
					data={data}
					cx='50%'
					cy='50%'
					fill='#4099ff'
					label
				/>
				<Tooltip />
				<Legend iconType='circle' />
			</PieChart>
		</ResponsiveContainer>
	);
}

VisitorsByDevice.propTypes = {
	data: PropTypes.array,
};

export default VisitorsByDevice;
