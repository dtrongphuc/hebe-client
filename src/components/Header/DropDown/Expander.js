import React from 'react';
// import PropTypes from 'prop-types';
import Item from './Item';

function Expander({ items }) {
	return (
		<div className='mobile-menu-dropdown'>
			<ul>
				{items?.map((item) => (
					<React.Fragment key={item.name}>
						<li className='menu-separate'></li>
						<Item item={item} />
					</React.Fragment>
				))}
			</ul>
		</div>
	);
}

Expander.propTypes = {};

export default Expander;
