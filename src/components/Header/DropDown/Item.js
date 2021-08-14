import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Carat from './Carat';
import Expander from './Expander';
import { useState } from 'react';

function Item({ item, onClick }) {
	const [open, setOpen] = useState(false);
	let history = useHistory();
	const path = item?.path;

	const onLinkClick = (e) => {
		if (!path) {
			e.preventDefault();
			return;
		}
		setOpen(false);
		onClick();
		history.push(`/collections/${path}`);
	};

	return (
		<li className='mobile-menu-dropdown__item'>
			<Link to='#' onClick={onLinkClick}>
				{item.name}
			</Link>
			{item?.items && item.items.length > 0 && (
				<>
					<Carat open={open} onClick={() => setOpen((prev) => !prev)} />
					{open && <Expander items={item.items} onClick={onClick} />}
				</>
			)}
		</li>
	);
}

Item.propTypes = {
	item: PropTypes.object,
};

export default Item;
