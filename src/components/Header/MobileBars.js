import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Expander from './DropDown/Expander';
import getNavbarLinks from './Links';

export default function MobileBars({ isOpen, categories, brands }) {
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		if (categories && brands) {
			setMenu([
				{
					name: 'SHOP BY',
					items: [...categories],
				},
				{
					name: 'BRANDS',
					items: [...brands],
				},
			]);
		}
	}, [categories, brands]);

	return (
		<div className={`mobile-nav ${isOpen && 'open'}`}>
			<ul className='mobile-nav__list'>
				{getNavbarLinks()
					.filter((link) => link.showOn.includes('mobile'))
					.map((link) => (
						<li key={link.name}>
							<Link to={link.path}>{link.name}</Link>
							{link.name === 'shop' && <Expander items={menu} />}
						</li>
					))}
			</ul>
		</div>
	);
}
