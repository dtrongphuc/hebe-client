import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getNavbarLinks from './Links';
import logo from 'assets/img/logo.webp';
import { useSelector } from 'react-redux';
import { priceString } from 'utils/util';
import ShopChild from './ShopChild';

export default function Navbar({ categories, brands }) {
	const { total } = useSelector((state) => state.cart);

	const cartPrice = () => {
		if (total > 0) {
			return ` (${priceString(total)})`;
		}
		return '';
	};

	return (
		<div className='main__header desktop-header'>
			<Container fluid='lg'>
				<nav className='header__navbar'>
					<Link to='/'>
						<img
							src={logo}
							alt='Hebe Designer Boutique'
							className='header-logo'
						/>
					</Link>
					<ul>
						{getNavbarLinks()
							.filter((link) => link.showOn.includes('desktop'))
							.map((link) => {
								return (
									<li key={link.name}>
										<Link to={link.path}>
											{link.name}
											{link.name === 'cart' && cartPrice()}
										</Link>

										{link.name === 'shop' && (
											<ShopChild categories={categories} brands={brands} />
										)}
									</li>
								);
							})}
					</ul>
				</nav>
			</Container>
		</div>
	);
}
