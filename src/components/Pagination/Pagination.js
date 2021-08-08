import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CgArrowLongRight, CgArrowLongLeft } from 'react-icons/cg';
import './styles.scss';
import { useState } from 'react';
import { useEffect } from 'react';

function Pagination({ current, max, onChange }) {
	const [page] = useState({
		current: current,
		max: max,
		show: 5,
	});

	const [range, setRange] = useState([]);

	useEffect(() => {
		let show = page.show;
		if (show > page.max) {
			show = page.max;
		}

		let start = page.current - Math.floor(show / 2);
		start = Math.max(start, 1);
		start = Math.min(start, 1 + page.max - show);

		let pagesRange = Array.from({ length: show }, (el, i) => start + i);
		setRange(pagesRange);
	}, [page]);

	return (
		<div className='product-pagination'>
			<hr className='hr--small' />
			<ul className='page-list'>
				<li className='page-item'>
					<Link
						to='#'
						className={`${page.current === 1 ? 'disabled' : ''}`}
						onClick={onChange(1)}
					>
						<CgArrowLongLeft />
					</Link>
				</li>
				{range.map((value) => (
					<li
						key={`page-${value}`}
						className={`page-item ${page.current === value ? 'active' : ''}`}
					>
						<Link to='#' onClick={onChange(value)}>
							{value}
						</Link>
					</li>
				))}
				<li className='page-item'>
					<Link
						to='#'
						className={`${page.current === page.max ? 'disabled' : ''}`}
						onClick={onChange(page.max)}
					>
						<CgArrowLongRight />
					</Link>
				</li>
			</ul>
		</div>
	);
}

Pagination.propTypes = {
	current: PropTypes.number,
	max: PropTypes.number,
};

export default Pagination;
