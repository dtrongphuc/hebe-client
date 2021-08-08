import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

export default function Sort({ onSortChange, selected }) {
	return (
		<Container fluid='lg'>
			<div className='collection__sort'>
				<div className='collection__sort__wrapper'>
					<label htmlFor='collection-sort' className='collection__sort__label'>
						Sort:{' '}
					</label>
					<select
						name='sort'
						id='collection-sort'
						className='collection__sort__select'
						onChange={onSortChange}
						value={selected}
					>
						<option value='best-selling'>Best Selling</option>
						<option value='low-to-high'>Price, low to high</option>
						<option value='high-to-low'>Price, high to low</option>
						<option value='new-to-old'>Date, new to old</option>
						<option value='old-to-new'>Date, old to new</option>
					</select>
				</div>
			</div>
		</Container>
	);
}

Sort.propTypes = {
	onSortChange: PropTypes.func,
	selected: PropTypes.string,
};
