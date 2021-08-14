import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function Expander({ items, onClick }) {
	return (
		<div className='mobile-menu-dropdown'>
			{!Array.isArray(items) && (
				//for first item
				<ul style={{ marginLeft: 0 }}>
					<Item item={items} onClick={onClick} />
					<li className='menu-separate'></li>
				</ul>
			)}
			{Array.isArray(items) && (
				<ul>
					{items?.map((item) => (
						<React.Fragment key={item.name}>
							<li className='menu-separate'></li>
							<Item item={item} onClick={onClick} />
						</React.Fragment>
					))}
				</ul>
			)}
		</div>
	);
}

Expander.propTypes = {
	items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	onClick: PropTypes.func,
};

export default Expander;
