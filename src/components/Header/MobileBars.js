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
					name: 'SHOP',
					items: [
						{
							name: 'SHOP BY',
							items: [...categories],
						},
						{
							name: 'BRANDS',
							items: [...brands],
						},
					],
				},
			]);
		}
	}, [categories, brands]);

	const withExpanderMenu = (link) => {
		let index = menu.findIndex(
			(item) => item.name.toLowerCase() === link.name.toLowerCase()
		);

		if (index !== -1) {
			let items = menu[index];
			return <Expander items={items} />;
		}

		return <Link to={link.path}>{link.name}</Link>;
	};

	return (
		<div className={`mobile-nav ${isOpen && 'open'}`}>
			<ul className='mobile-nav__list'>
				{getNavbarLinks()
					.filter((link) => link.showOn.includes('mobile'))
					.map((link) => (
						<li key={link.name}>{withExpanderMenu(link)}</li>
					))}
			</ul>
		</div>
	);
}
