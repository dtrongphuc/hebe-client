import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/img/HEBE_Logo.png';
import './styles.scss';

function Header() {
	return (
		<header className='checkout__header'>
			<div className='wrap'>
				<Link to='/' className='checkout__header-link'>
					<img src={Logo} alt='Hebe Designer Boutique' />
				</Link>
			</div>
		</header>
	);
}

export default Header;
