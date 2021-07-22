import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getNavbarLinks from './Links';
import logo from 'assets/img/logo.webp';
import { useSelector } from 'react-redux';
import { priceString } from 'utils/util';
import ShopChild from './ShopChild';
import { useEffect } from 'react';
import { getCategoriesLink } from 'services/CategoryApi';
import { getBrandsLink } from 'services/BrandApi';

export default function Navbar() {
	const { total } = useSelector((state) => state.cart);

	const cartPrice = () => {
		if (total > 0) {
			return ` (${priceString(total)})`;
		}
		return '';
	};
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		const shopLinks = async () => {
			try {
				const [{ categories }, { brands }] = await Promise.all([
					getCategoriesLink(),
					getBrandsLink(),
				]);
				if (categories) {
					setCategories([...categories]);
				}
				if (brands) {
					setBrands([...brands]);
				}
			} catch (error) {
				console.log(error);
			}
		};

		shopLinks();
	}, []);

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
