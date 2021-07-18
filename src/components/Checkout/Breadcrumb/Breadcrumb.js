import React, { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './styles.scss';

let links = [
	{
		name: 'cart',
		link: '/checkout/cart',
		active: false,
		disabled: false,
	},
	{
		name: 'information',
		link: '/checkout/information',
		active: false,
		disabled: false,
	},
	{
		name: 'shipping',
		link: '/checkout/shipping',
		active: false,
		disabled: false,
	},
	{
		name: 'payment',
		link: '/checkout/payment',
		active: false,
		disabled: false,
	},
];

function Breadcrumb() {
	const [breadcrumbList, setBreadcrumbList] = useState([]);
	const { delivery } = useSelector((state) => state.checkout);

	let location = useLocation();
	React.useEffect(() => {
		const { pathname } = location;
		const currentPathName = pathname.replace('/checkout/', '');
		if (delivery !== 'shipping') {
			links = links.filter((link) => link.name !== 'shipping');
		}

		let flag = false;
		let linksMap = links.map((link) => {
			if (flag === true) {
				link.disabled = true;
				link.active = false;
			} else if (link.name === currentPathName) {
				flag = true;
				link.active = true;
			} else {
				link.active = false;
				link.disabled = false;
			}

			return link;
		});

		setBreadcrumbList([...linksMap]);
	}, [location, delivery]);

	return (
		<ol className='checkout-breadcrumb'>
			{breadcrumbList?.map(({ name, link, active, disabled }, index) => (
				<li key={link} className='checkout-breadcrumb__item'>
					<Link
						to={link}
						className={`checkout-breadcrumb__link ${
							active ? 'active' : disabled ? 'disabled' : ''
						}`}
					>
						{name}
					</Link>
					{index < breadcrumbList.length - 1 && <IoChevronForwardOutline />}
				</li>
			))}
		</ol>
	);
}

export default Breadcrumb;
