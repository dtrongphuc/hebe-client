import React, { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './styles.scss';

let links = [
	{
		name: 'cart',
		link: '/cart',
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

const linksNotIncludesShipping = links.filter(
	(link) => link.name !== 'shipping'
);
const mapActiveLink = (links, currentPathName) => {
	let flag = false;
	return links.map((link) => {
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
};

function Breadcrumb() {
	const [breadcrumbList, setBreadcrumbList] = useState([]);
	const { delivery } = useSelector((state) => state.checkout);

	let location = useLocation();
	React.useEffect(() => {
		const { pathname } = location;
		const currentPathName = pathname.replace('/checkout/', '');

		let linksMap =
			delivery !== 'shipping'
				? mapActiveLink(linksNotIncludesShipping, currentPathName)
				: mapActiveLink(links, currentPathName);

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
